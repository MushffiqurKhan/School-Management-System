const con = require('../Config/db');
const bcrypt = require('bcryptjs');

const PrincipalGetStudentById = async (studentId) => {
  try {
    const foundStudent = await con.Student.findById(studentId);

    if (!foundStudent) {
      return { status: false, notFound: true };
    }

    return { status: true, data: foundStudent };
  } catch (error) {
    console.error("Error fetching student by ID:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid student ID format"
        : "Something went wrong",
    };
  }
};

const PrincipalUpdateStudentById = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedStudent = await con.Student.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent) {
      return { status: false, notFound: true };
    }

    return { status: true, data: updatedStudent };
  } catch (error) {
    console.error("Error updating student:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid student ID format"
        : "Something went wrong",
    };
  }
};

const PrincipalDeleteStudentById = async (id) => {
  try {
    const deletedStudent = await con.Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return { status: false, notFound: true };
    }

    return { status: true, data: deletedStudent };
  } catch (error) {
    console.error("Error deleting student:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid student ID format"
        : "Something went wrong",
    };
  }
};

module.exports ={
    PrincipalGetStudentById,
    PrincipalUpdateStudentById,
    PrincipalDeleteStudentById
}