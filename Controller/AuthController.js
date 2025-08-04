const authService = require('../Service/AuthService');
const router = require("express").Router();

// Register
const registerUser = async (req, res) => {
  try {
    const register_res = await authService.register(req.body);

    if (register_res.status) {
      return res.status(201).send({
        result: "success",
        message: "User registered successfully",
      });
    } else if (register_res.exists) {
      return res.status(409).send({
        result: "fail",
        message: `User with email '${register_res.exists}' already exists`,
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: register_res.error || "Validation error",
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

// Login
const loginUser = async (req, res) => {
  try {
    const login_res = await authService.login(req.body);

    if (login_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Login successful",
        data: login_res.data
      });
    } else {
      return res.status(401).send({
        result: "fail",
        message: login_res.error || "Invalid credentials"
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: error.message,
      error: "Internal server error"
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const response = await authService.forgotPassword(req.body);

    if (response.status) {
      return res.status(200).send({
        result: "success",
        message: "Password reset successful"
      });
    } else {
      return res.status(400).send({
        result: "fail",
        message: response.error || "Unable to reset password"
      });
    }
  } catch (error) {
    return res.status(500).send({
      result: "fail",
      message: error.message,
      error: "Internal server error"
    });
  }
};

const verifyMobile = async (req, res) => {
  try {
    const result = await authService.verifyMobileSendOtp(req.body);

    if (result.status) {
      return res.status(result.statusCode).json({
        result: "success",
        message: result.message,
      });
    } else {
      return res.status(result.statusCode).json({
        result: "fail",
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "fail",
      message: error.message,
      error: "Internal server error",
    });
  }
};

const verifyMobOtp = async (req, res) => {
  try {
    const result = await authService.verifyMobileOtp(req.body);

    if (!result.status) {
      return res.status(result.code || 400).json({
        result: "fail",
        message: result.message,
      });
    }
    return res.status(result.code || 200).json({
      result: "success",
      message: result.message,
      data: result.data || null,
    });
  } catch (error) {
    return res.status(500).json({
      result: "fail",
      message: error.message,
      error: "Internal server error",
    });
  }
};

const sendEmailOtp = async (req, res) => {
  try {
    const result = await authService.sendEmailOtp(req.body);

    if (!result.status) {
      return res.status(result.code || 400).json({
        result: "fail",
        message: result.message,
      });
    }

    return res.status(result.code || 200).json({
      result: "success",
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      result: "fail",
      message: error.message,
      error: "Internal server error",
    });
  }
};

const verifySendEmailOTP = async (req, res) => {
  try {
    const result = await authService.verifyEmailOTP(req.body);

    if (result.status) {
      return res.status(result.statusCode).json({
        result: "success",
        message: result.message,
      });
    } else {
      return res.status(result.statusCode).json({
        result: "fail",
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "fail",
      message: error.message,
      error: "Internal server error",
    });
  }
};

router.post('/register',registerUser);
router.post('/login', loginUser);
router.put('/forgotPassword',forgotPassword);
router.post('/verifyMobile',verifyMobile);
router.post('/verifyMobileotp',verifyMobOtp);
router.post('/verifyEmail',sendEmailOtp);
router.post('/verifyEmailOTP',verifySendEmailOTP)

module.exports = router;