const con = require('../Config/db');
const bcrypt = require('bcryptjs')

const createPrincipal = async ({ name, email, password, phone }) => {
  try {
    const existingPrincipal = await con.Principal.findOne({ email });
    if (existingPrincipal) {
      return { status: false, exists: email };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const principal = new con.Principal({
      name,
      email,
      password: hashedPassword,
      phone
    });
    await principal.save();

    return { status: true, data: principal };
  } catch (error) {
    console.error("Error creating principal:", error.message);
    return {
      status: false,
      error: error.message.includes("validation")
        ? error.message
        : "Something went wrong",
    };
  }
};

const getPrincipal = async (filter = {}) => {
  try {
    const principals = await con.Principal.find(filter);
    return { status: true, data: principals };
  } catch (error) {
    console.error("Error fetching principals:", error.message);
    return {
      status: false,
      error: error.message.includes("validation")
        ? error.message
        : "Something went wrong",
    };
  }
};

const updatePrincipalById = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedPrincipal = await con.Principal.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPrincipal) {
      return { status: false, notFound: true };
    }

    return { status: true, data: updatedPrincipal };
  } catch (error) {
    console.error("Error updating principal:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid principal ID format"
        : "Something went wrong",
    };
  }
};


const deletePrincipalById = async (id) => {
  try {
    const deletedPrincipal = await con.Principal.findByIdAndDelete(id);

    if (!deletedPrincipal) {
      return { status: false, notFound: true };
    }

    return { status: true };
  } catch (error) {
    console.error("Error deleting principal:", error.message);
    return {
      status: false,
      error: error.message.includes("Cast to ObjectId failed")
        ? "Invalid principal ID format"
        : "Something went wrong",
    };
  }
};

module.exports = {
    createPrincipal,
    getPrincipal,
    updatePrincipalById,
    deletePrincipalById
}