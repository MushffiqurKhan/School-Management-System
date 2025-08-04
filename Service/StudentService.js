const con = require('../Config/db');
const bcrypt = require('bcryptjs')

const createStudent = async ({ name, emailormobile, password, studentClass, rollNumber, gender, age }) => {
  try {
    const existingUser = await con.Student.findOne({ emailormobile });
    if (existingUser) return { status: false, exists: emailormobile };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new con.Student({
      name,
      emailormobile,
      password: hashedPassword,
      class: studentClass,
      rollNumber,
      gender,
      age
    });
    await newStudent.save();

    return { status: true };
  } catch (error) {
    console.error("Error creating student:", error.message);
    return {
      status: false,
      error: error.message.includes("validation")
        ? error.message
        : "Something went wrong",
    };
  }
};

const getStudentById = async (id) => {
  try {
    const foundStudent = await con.Student.findById(id);

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

//update Students by ID
const updateStudents = async (id, updateData) => {
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

//delete students By ID
const deleteStudent = async (id) => {
  try {
    const deletedStudent = await con.Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return { status: false, notFound: true };
    }

    return { status: true };
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
    createStudent,
    getStudentById,
    updateStudents, 
    deleteStudent
}