const PrincipalToTeacher = require('../Service/PrincipleToTeacher')
const router = require("express").Router();

const principalgetTeacher = async (req, res) => {
  try {
    const fetch_res = await PrincipalToTeacher.PrincipalGetTeacherById(req.params.id);

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

const principalUpdateTeacherById = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTeacher) {
      return { status: false, notFound: true };
    }

    return { status: true, data: updatedTeacher };
  } catch (error) {
    console.error("Error updating teacher:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid teacher ID format"
        : "Something went wrong",
    };
  }
};

const princpaldeleteTecher = async (req, res) => {
  try {
    const delete_res = await PrincipalToTeacher.PrincipalDeleteTeacherById(req.params.id);

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

router.get('/fetch',principalgetTeacher);
router.put('/update',principalUpdateTeacherById);
router.delete('/delete/:id',princpaldeleteTecher);
module.exports = router;