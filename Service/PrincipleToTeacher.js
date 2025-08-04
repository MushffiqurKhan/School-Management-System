const con = require('../Config/db');
const bcrypt = require('bcryptjs');

const PrincipalGetTeacherById = async (id) => {
  try {
    const foundTeacher = await con.Teacher.findById(id);

    if (!foundTeacher) {
      return { status: false, notFound: true };
    }

    return { status: true, data: foundTeacher };
  } catch (error) {
    console.error("Error fetching teacher by ID:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid teacher ID format"
        : "Something went wrong",
    };
  }
};

const PrincipalUpdateTeacherById = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedTeacher = await con.Teacher.findByIdAndUpdate(id, updateData, { new: true });

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

const PrincipalDeleteTeacherById = async (id) => {
  try {
    const deletedTeacher = await con.Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return { status: false, notFound: true };
    }

    return { status: true, data: deletedTeacher };
  } catch (error) {
    console.error("Error deleting teacher:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid teacher ID format"
        : "Something went wrong",
    };
  }
};

module.exports ={
    PrincipalGetTeacherById,
    PrincipalUpdateTeacherById,
    PrincipalDeleteTeacherById
}