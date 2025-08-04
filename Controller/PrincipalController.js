const PrincipalService = require('../Service/PrincipalService')
const router = require("express").Router();

const CreatePrincipal = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const save_res = await PrincipalService.createPrincipal({ name, email, password, phone });

    if (save_res.status) {
      return res.status(201).send({
        result: "success",
        message: "Principal created successfully",
        data: save_res.data,
      });
    } else if (save_res.exists) {
      return res.status(409).send({
        result: "fail",
        message: `Principal with email '${save_res.exists}' already exists`,
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
      message: "Error creating principal",
      error: error.message,
    });
  }
};

const GetPrincipal = async (req, res) => {
  try {
    const fetch_res = await PrincipalService.getPrincipal(req.query); // agar future me filters bhejne ho

    if (fetch_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Principals fetched successfully",
        data: fetch_res.data,
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
      message: "Error fetching principals",
      error: error.message,
    });
  }
};

const UpdatePrincipal = async (req, res) => {
  try {
    const update_res = await PrincipalService.updatePrincipalById(req.params.id, req.body);

    if (update_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Principal updated successfully",
        data: update_res.data,
      });
    } else if (update_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Principal with ID '${req.params.id}' not found`,
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
      message: "Error updating principal",
      error: error.message,
    });
  }
};

const DeletePrincipal = async (req, res) => {
  try {
    const delete_res = await PrincipalService.deletePrincipalById(req.params.id);

    if (delete_res.status) {
      return res.status(200).send({
        result: "success",
        message: "Principal deleted successfully",
      });
    } else if (delete_res.notFound) {
      return res.status(404).send({
        result: "fail",
        message: `Principal with ID '${req.params.id}' not found`,
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
      message: "Error deleting principal",
      error: error.message,
    });
  }
};

router.post('/create',CreatePrincipal);
router.get('/fetch',GetPrincipal);
router.put('/:id',UpdatePrincipal);
router.delete('/:id',DeletePrincipal);

module.exports = router;