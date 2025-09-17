
# **Contributing to Briddhi 🌱 (Team Aimers)**

This document outlines **how our team collaborates** on Briddhi to maintain smooth development and consistent code quality.

---

## **1. Team Members & Roles**

| Member   | Role                     | Responsibilities                                        |
| -------- | ------------------------ | ------------------------------------------------------- |
| Member 1 | Frontend Lead            | React components, dashboard UI, citizen reporting forms |
| Member 2 | Backend Lead             | Node.js API, MongoDB, server logic, authentication      |
| Member 3 | AI/ML Lead               | Traffic prediction, infrastructure detection, AI models |
| Member 4 | IoT & Simulation Lead    | Sensor simulation, mock IoT data streams                |
| Member 5 | DevOps & Deployment Lead | Docker setup, Netlify/Vercel deployment, CI/CD          |

---

## **2. Branching & Workflow**

* `main` → Production-ready, stable branch
* `dev` → Active development branch
* `feature/<feature-name>` → Individual feature branches

**Workflow Steps:**

1. Pull latest changes from `dev` before starting a feature.
2. Create a new feature branch:

```bash
git checkout -b feature/<your-feature-name>
```

3. Work on your feature locally and commit changes frequently.
4. Push your branch to GitHub and open a **Pull Request (PR)** to `dev`.
5. Team lead or responsible member reviews and merges after approval.

---

## **3. Commit Guidelines**

* Use **present tense** and clear messages:

  * `feat:` New feature
  * `fix:` Bug fix
  * `docs:` Documentation
  * `chore:` Maintenance tasks

**Examples:**

* `feat: Add citizen issue reporting form`
* `fix: Correct API endpoint for fetching issues`

---

## **4. Code Style**

* **Frontend:** React + Tailwind CSS + ESLint + Prettier
* **Backend:** Node.js + Express, follow Airbnb style guide
* **AI/ML:** Python, follow PEP8 conventions

---

## **5. Pull Requests**

* Always target `dev` branch
* Include a **description of changes** and **screenshots/mock data** if applicable
* Ensure **feature is tested locally** before requesting review
* Merge only after approval from the relevant lead

---

## **6. Testing & QA**

* Test new features with mock data (AI predictions, IoT simulation)
* Verify API endpoints are working correctly with frontend
* Ensure no breaking changes before merging into `dev`

---

