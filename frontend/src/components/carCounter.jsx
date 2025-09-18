// HumanCounter.jsx
import { useRef, useEffect, useState } from "react";

/*
Behavior:
- Load coco-ssd model
- Start camera
- Continuously run detection frames and update currentDetectedCount
- A cycle function sequentially scans each side for 5s:
    - For the 5s window, we keep the maximum detected 'car' count observed
    - After 5s we lock that max into sideCounts[sideIndex]
- After all 4 sides scanned, pick the side with max count -> set green (release)
- Repeat cycles automatically
*/

export default function HumanCounter() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const rafRef = useRef(null);

  const [modelLoaded, setModelLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [fps, setFps] = useState(0);

  const sides = useRef(["North", "East", "West", "South"]).current;
  const [activeSide, setActiveSide] = useState(0); // 0..3 - which side currently scanning
  const [sideCounts, setSideCounts] = useState([0, 0, 0, 0]); // locked counts after each side window
  const [greenSide, setGreenSide] = useState(null); // index of side currently released
  const [statusText, setStatusText] = useState("Idle");

  // live detection state (ref + state)
  const currentCountRef = useRef(0); // current frame count
  const windowMaxRef = useRef(0); // max observed during current 5s window

  // --- load model and tf backend ---
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const tf = await import("@tensorflow/tfjs");
        await import("@tensorflow/tfjs-backend-webgl"); // ensure webgl backend available
        // prefer webgl
        try {
          await tf.setBackend("webgl");
        } catch (e) {
          // ignore if fails, tf will pick whatever available
          console.warn("WebGL backend failed, using default", e);
        }
        await tf.ready();

        const coco = await import("@tensorflow-models/coco-ssd");
        const detector = await coco.load();
        modelRef.current = detector;
        if (mounted) {
          setModelLoaded(true);
          console.log("Model loaded");
        }
      } catch (err) {
        console.error("Model load failed", err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // --- camera start/stop ---
  const startCamera = async () => {
    if (!modelRef.current) {
      alert("Model not loaded yet. Wait a moment.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsRunning(true);
      setStatusText("Camera started");
    } catch (err) {
      console.error("Camera error:", err);
      alert("Could not access camera. Check permissions and secure context (HTTPS).");
    }
  };

  const stopCamera = () => {
    setIsRunning(false);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    cancelAnimationFrame(rafRef.current);
    setStatusText("Camera stopped");
  };

  // --- detection loop (runs every animation frame) ---
  useEffect(() => {
    let running = true;
    let frames = 0;
    let lastFpsTime = performance.now();

    async function detectLoop() {
      if (!running) return;
      if (!isRunning || !modelRef.current || !videoRef.current || videoRef.current.readyState < 2) {
        rafRef.current = requestAnimationFrame(detectLoop);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (vw && vh) {
        if (canvas.width !== vw || canvas.height !== vh) {
          canvas.width = vw;
          canvas.height = vh;
        }

        try {
          const preds = await modelRef.current.detect(video);
          // draw only cars
          ctx.clearRect(0, 0, vw, vh);
          let count = 0;
          preds.forEach((p) => {
            if (p.class === "car" && p.score > 0.5) {
              count++;
              const [x, y, w, h] = p.bbox;
              ctx.lineWidth = 2;
              ctx.strokeStyle = "lime";
              ctx.strokeRect(x, y, w, h);
            }
          });

          // update current frame count and window max if scanning
          currentCountRef.current = count;
          // if active scanning (we use activeCycle flag when cycle runs), update windowMaxRef externally.
          if (windowMaxRef.current < count) windowMaxRef.current = count;
        } catch (err) {
          console.error("detect error:", err);
        }
      }

      // fps
      frames++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(frames);
        frames = 0;
        lastFpsTime = now;
      }

      rafRef.current = requestAnimationFrame(detectLoop);
    }

    if (isRunning) rafRef.current = requestAnimationFrame(detectLoop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning]);

  // --- cycle function: sequentially scan each side for 5s ---
  // We'll run an internal async loop that repeats while camera is running.
  useEffect(() => {
    let cancelled = false;

    async function runCycleLoop() {
      while (!cancelled) {
        if (!isRunning) {
          // wait until camera started
          await new Promise((res) => setTimeout(res, 300));
          continue;
        }

        // for each side sequentially
        const newSideCounts = [0, 0, 0, 0];
        for (let i = 0; i < sides.length; i++) {
          if (cancelled) break;

          setActiveSide(i);
          setStatusText(`Scanning ${sides[i]} for 5s...`);
          // reset window max and let detection loop update it
          windowMaxRef.current = 0;

          // wait 5 seconds while updating windowMaxRef via detect loop
          const start = performance.now();
          while (performance.now() - start < 5000) {
            if (cancelled) break;
            await new Promise((res) => setTimeout(res, 200)); // short sleep to yield
          }

          // after 5s lock the windowMaxRef as this side's count
          newSideCounts[i] = windowMaxRef.current;
          setSideCounts((prev) => {
            const copy = [...prev];
            copy[i] = windowMaxRef.current;
            return copy;
          });

          console.log(`Locked ${sides[i]} = ${windowMaxRef.current}`);
          // small pause between sides (optional)
          await new Promise((res) => setTimeout(res, 250));
        }

        if (cancelled) break;

        // decide winner
        const maxVal = Math.max(...newSideCounts);
        const winnerIdx = newSideCounts.indexOf(maxVal);
  setGreenSide(winnerIdx);
  setStatusText(`Released ${sides[winnerIdx]} for traffic`);

        console.log("Cycle result:", {
          sideCounts: newSideCounts,
          winner: sides[winnerIdx],
        });

        // hold green for configurable time, e.g., 5 seconds
        await new Promise((res) => setTimeout(res, 5000));
        // clear green and repeat after short rest
  setGreenSide(null);
  setStatusText("Next cycle starting...");
        await new Promise((res) => setTimeout(res, 500)); // tiny gap
      }
    }

    runCycleLoop();

    return () => {
      cancelled = true;
    };
  }, [isRunning, sides]); // restart loop when isRunning toggles

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  // removed unused eslint-disable
  }, []);

  // render light component
  const renderLight = (index) => {
    const isGreen = greenSide === index;
    return (
      <div key={sides[index]} className="flex flex-col items-center space-y-2">
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: isGreen ? "green" : "darkred",
            boxShadow: isGreen ? "0 0 8px rgba(0,255,0,0.6)" : "none",
          }}
        />
        <div style={{ fontSize: 12 }}>{sides[index]}</div>
        <div style={{ fontSize: 12, fontWeight: "600" }}>{sideCounts[index]}</div>
        {activeSide === index && <div style={{ fontSize: 11, color: "#888" }}>(scanning)</div>}
      </div>
    );
  };

  return (
    <div className="rounded-2xl mb-3.5" style={{ padding: 18, fontFamily: "Arial, sans-serif,",boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2>Demo Car Counter </h2>
      <p style={{ color: "#555" }}>
        Status: {statusText} {modelLoaded ? "(model loaded)" : "(loading model...)"}
      </p>

      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ position: "relative", background: "#000", borderRadius: 8, overflow: "hidden" }}>
            <video ref={videoRef} style={{ width: "100%", height: "auto" }} muted playsInline />
            <canvas ref={canvasRef} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }} />
          </div>

          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button className="bg-green-400 cursor-pointer ease-in transition-all  rounded-2xl text-white hover:text-green-400 backdrop-blur-md hover:bg-white/100" onClick={startCamera} disabled={!modelLoaded || isRunning} style={{ padding: "8px 12px" }}>
              Start Camera
            </button>
            <button className="bg-green-400 ease-in  rounded-2xl cursor-pointer text-white hover:text-green-400 backdrop-blur-md hover:bg-white/30 " onClick={stopCamera} disabled={!isRunning} style={{ padding: "8px 12px" }}>
              Stop Camera
            </button>
            <div style={{ marginLeft: "auto", color: "#333" }}>FPS: {fps}</div>
          </div>
        </div>

        <aside className="h-96" style={{ width: 300, border: "1px solid #eee", padding: 12, borderRadius: 8,boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h3>Live stats</h3>
          <div style={{ marginTop: 1}}>
            {sides.map((s, i) => (
              <div key={s} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>{s}</div>
                <div style={{ fontWeight: 700 }}>{sideCounts[i]} {activeSide === i ? " (scanning)" : ""}</div>
              </div>
            ))}
          
            <div className="text-red-400" style={{ marginTop: 10, fontWeight: 700 }}>
              Result: {greenSide !== null ? `${sides[greenSide]} released (${sideCounts[greenSide]} cars)` : "Waiting..."}
            </div>
            <div style={{ marginTop: 8, color: "#666" }}>{statusText}</div>

            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-around" }}>
              {sides.map((_, i) => renderLight(i))}
            </div>
         
          </div>
         
        </aside>
        
      </div>
    </div>
  );
}