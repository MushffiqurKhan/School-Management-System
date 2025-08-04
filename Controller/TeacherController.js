const TeacherService = require('../Service/TeacherService');
const router = require("express").Router();

const createTeacher = async (req, res) => {
  try {
    const save_res = await TeacherService.createTeacher(req.body);

    if (save_res.status) {
      return res.status(201).send({
        result: "success",
        message: "Teacher created successfully",
        data: save_res.data,
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
      message: "Error creating teacher",
      error: error.message,
    });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const update_res = await TeacherService.updateTeacher(req.params.id, req.body);

    if (update_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Teacher updated successfully",
        data: update_res.data,
      });
    } else if (update_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Teacher with ID '${req.params.id}' not found for update`,
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
      message: "Error updating teacher",
      error: error.message,
    });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const delete_res = await TeacherService.deleteTeacher(req.params.id);

    if (delete_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Teacher deleted successfully",
        data: delete_res.data,
      });
    } else if (delete_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Teacher with ID '${req.params.id}' not found`,
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
      message: "Error deleting teacher",
      error: error.message,
    });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const fetch_res = await TeacherService.getTeacherById(req.params.id);

    if (fetch_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Teacher fetched successfully",
        data: fetch_res.data,
      });
    } else if (fetch_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Teacher with ID '${req.params.id}' not found`,
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
      message: "Error fetching teacher",
      error: error.message,
    });
  }
};

router.post('/Create', createTeacher);
router.put('/update/:id',updateTeacher);
router.delete('/delete/:id', deleteTeacher);
router.get('/fetch/:id', getTeacherById);
module.exports = router;
