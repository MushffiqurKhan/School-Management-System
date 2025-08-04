const express = require('express');
const router = express.Router();

const {studentMiddleware, teacherMiddleware,principalMiddleware} = require('../Middleware/Authmiddleware');

//Student CRUD
router.use("/api/v1/student",studentMiddleware,require("../Controller/StudentController"));

// CRUD for teacher itself 
router.use("/api/v1/teacher", teacherMiddleware,require("../Controller/TeacherController"));

//Teacher to Student
router.use("/api/v1/teachertostudent",require("../Controller/TeacherToStudent"));

//Principal CRUD
router.use("/api/v1/principal",principalMiddleware,require("../Controller/PrincipalController"));

//Principal TO Teacher
router.use("/api/v1/principaltoteacher",require("../Controller/PrincipalTeacherController"));

//Principal To Student
router.use("/api/v1/principaltostudent",require("../Controller/PrincipalStudentController"));

module.exports = router;