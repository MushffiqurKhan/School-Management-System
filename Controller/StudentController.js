const StudentService = require('../Service/StudentService')
const router = require("express").Router();

const createStudent = async (req, res) => {
  try {
    const { name, emailormobile, password, class: studentClass, rollNumber, gender, age } = req.body;
    const save_res = await StudentService.createStudent({ name, emailormobile, password, studentClass, rollNumber, gender, age });

    if (save_res.status) {
      return res.status(201).send({
        result: "success",
        message: "Student created successfully",
      });
    } else if (save_res.exists) {
      return res.status(409).send({
        result: "fail",
        message: `Student with email '${save_res.exists}' already exists`,
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: save_res.error || "Validation error",
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: error.message,
      error: "Internal server error",
    });
  }
};

const getStudentsById = async (req, res) => {
  try {
    const student_res = await StudentService.getStudentById(req.params.id);

    if (student_res.status) {
      return res.status(200).send({
        result: "success",
        data: student_res.data,
      });
    } else if (student_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Student with ID '${req.params.id}' not found`,
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: student_res.error || "Validation error",
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: error.message,
      error: "Internal server error",
    });
  }
};

const updateStudents = async (req, res) => {
  try {
    const update_res = await StudentService.updateStudents(req.params.id, req.body);

    if (update_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Student updated successfully",
        data: update_res.data,
      });
    } else if (update_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Student with ID '${req.params.id}' not found`,
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
      message: error.message,
      error: "Internal server error",
    });
  }
};

const deleteStudents = async (req, res) => {
  try {
    const delete_res = await StudentService.deleteStudent(req.params.id);

    if (delete_res.status) {  
      return res.status(200).send({
        result: "success",
        message: "Student deleted successfully",
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
      message: error.message,
      error: "Internal server error",
    });
  }
};

/**
 * @swagger
 * /api/v1/student/create:
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               class:
 *                 type: string
 *               rollNumber:
 *                 type: integer
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 */
router.post("/Create",createStudent);
router.get("/fetch/:id",getStudentsById);
router.patch("/update/:id",updateStudents);
router.delete("/delete/:id",deleteStudents);
module.exports = router;