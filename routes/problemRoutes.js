const express = require("express");
const router = express.Router();
const {
  createProblem,
  getUserProblems,
  editProblem,
  deleteProblem,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/problemController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createProblem).get(protect, getUserProblems);
router.route("/:id/edit").put(protect, editProblem);
router.route("/:id").delete(protect, deleteProblem);
router.route("/:id/notes").post(protect, addNote);
router.route("/:id/notes/:noteId").put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
