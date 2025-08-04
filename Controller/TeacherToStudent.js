const TeachertoStudent = require('../Service/TeacherToStudent')
const router = require("express").Router();

const teachergetStudent = async (req, res) => {
  try {
    const fetch_res = await TeachertoStudent.TeachergetStudentById(req.params.id);

    if (fetch_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Student fetched successfully",
        data: fetch_res.data,
      });
    } else if (fetch_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Student with ID '${req.params.id}' not found`,
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: fetch_res.error || "Validation error",
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: "Error fetching student",
      error: error.message,
    });
  }
};

const teacherupdateStudent = async (req, res) => {
  try {
    const update_res = await TeachertoStudent.TeacherupdateStudentById(req.params.id, req.body);

    if (update_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Student updated successfully",
        data: update_res.data,
      });
    } else if (update_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Student with ID '${req.params.id}' not found for update`,
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: update_res.error || "Validation error",
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: "Error updating student",
      error: error.message,
    });
  }
};

const teacherdeleteStudent = async (req, res) => {
  try {
    const delete_res = await TeachertoStudent.TeacherdeleteStudentById(req.params.id);

    if (delete_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Student deleted successfully",
        data: delete_res.data,
      });
    } else if (delete_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Student with ID '${req.params.id}' not found`,
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: delete_res.error || "Validation error",
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: "Error deleting student",
      error: error.message,
    });
  }
};

router.get('/:id',teachergetStudent);
router.put('/:id',teacherupdateStudent);
router.delete('/:id',teacherdeleteStudent);
module.exports =router;