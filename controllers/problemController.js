const Problem = require("../models/Problem");

// Create Problem
const createProblem = async (req, res) => {
  const { title, description, category } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  try {
    const problem = await Problem.create({
      user: req.user._id,
      title,
      description,
      category,
    });
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Problems
const getUserProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ user: req.user._id }).sort("-createdAt");
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Edit Problem
const editProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    if (!problem.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    problem.title = req.body.title ?? problem.title;
    problem.description = req.body.description ?? problem.description;
    problem.category = req.body.category ?? problem.category;

    await problem.save();
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Problem
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    if (!problem.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    await problem.deleteOne();
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add Note
const addNote = async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ message: "Note text is required" });

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    if (!problem.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    problem.notes.push({ text });
    await problem.save();
    res.status(200).json(problem.notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    if (!problem.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    const note = problem.notes.id(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.text = req.body.text;
    await problem.save();
    res.status(200).json(problem.notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    if (!problem.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    problem.notes = problem.notes.filter(note => note._id.toString() !== req.params.noteId);
    await problem.save();
    res.status(200).json(problem.notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProblem,
  getUserProblems,
  editProblem,
  deleteProblem,
  addNote,
  updateNote,
  deleteNote,
};