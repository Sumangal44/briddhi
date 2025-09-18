import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import issueModel from "../models/issueModel.js";
import fetch from "node-fetch";
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

const getAddressFromCoords = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const response = await fetch(url, { headers: { "User-Agent": "CitizenApp/1.0" } });
    const data = await response.json();
    return data.display_name || "Unknown location";
  } catch (err) {
    console.error("Geocoding error:", err);
    return "Unknown location";
  }
};

const registercitizen = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // validation
    if (!name || !password || (!email && !phone)) {
      return res
        .status(400)
        .json({ message: "Name, password, and either email or phone are required" });
    }

    // Email validation if provided
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Phone validation if provided
    if (phone && !validator.isMobilePhone(phone, "any")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // Strong password check
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    // Check for existing user
    if (email) {
      const existingEmail = await userModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    if (phone) {
      const existingPhone = await userModel.findOne({ phone });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone already registered" });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "citizen",
    });

    // Create token
    const token = createToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// login
const logincitizen = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // validation
    if ((!email && !phone) || !password) {
      return res
        .status(400)
        .json({ message: "Email or phone and password are required" });
    }

    // find user by email or phone
    let user;
    if (email) {
      user = await userModel.findOne({ email });
    } else if (phone) {
      user = await userModel.findOne({ phone });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = createToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const submitIssue = async (req, res) => {
  try {
    const { description, location } = req.body;
    if (!description || !location) {
      return res.status(400).json({ message: "Description and live location required" });
    }
    const parsedLocation = JSON.parse(location);
    const [lng, lat] = parsedLocation.coordinates;
    const address = await getAddressFromCoords(lat, lng);

    // Handle multiple images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path); // Cloudinary URL or local path
    }

    const issue = await issueModel.create({
      description,
      images, // save array of image URLs
      location: { type: "Point", coordinates: [lng, lat] },
      address,
      reportedBy: req.user._id,
    });
    const io = req.app.get("io");
    io.to("admins").emit("newIssue", issue);

    res.status(201).json({ success: true, message: "Issue submitted", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getMyIssues = async (req, res) => {
  try {
    const issues = await issueModel
      .find({ reportedBy: req.user._id }) // only the logged-in citizen's issues
      .sort({ createdAt: -1 });          // latest first

    res.status(200).json({
      success: true,
      issues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export { registercitizen, logincitizen, submitIssue, getMyIssues };
