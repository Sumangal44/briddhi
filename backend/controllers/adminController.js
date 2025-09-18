import issueModel from "../models/issueModel.js";


const getAllIssues = async (req, res) => {
  try {
    const issues = await issueModel.find().populate("reportedBy", "name email phone").sort({ createdAt: -1 });
    // Ensure title and type are always present in response
    const formattedIssues = issues.map(issue => ({
      _id: issue._id,
      title: issue.title || "",
      type: issue.type || "other",
      description: issue.description,
      images: issue.images,
      location: issue.location,
      address: issue.address,
      status: issue.status,
      reportedBy: issue.reportedBy,
      createdAt: issue.createdAt
    }));
    res.json({ success: true, issues: formattedIssues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update issue status
const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["in_progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const issue = await issueModel.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = status;
    await issue.save();

    // emit live update to the citizen
    const io = req.app.get("io");
    io.to(issue.reportedBy.toString()).emit("issueStatusUpdate", issue);

    res.json({ success: true, message: `Issue marked as ${status}`, issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getAllIssues, updateIssueStatus };