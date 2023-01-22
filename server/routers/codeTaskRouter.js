const codeTaskBL = require("../models/codeTaskBL");
const express = require("express");
const router = express.Router();

router.get("/", async function (req, resp) {
  try {
    const codeTasks = await codeTaskBL.getAllCodeTasks();
    return resp.status(200).json(codeTasks);
  } catch (error) {
    return resp.status(400).json("cant access DB");
  }
});

router.get("/:id", async function (req, resp) {
  const id = req.params.id;
  try {
    const codeTask = await codeTaskBL.getCodeTaskById(id);
    return resp.status(200).json(codeTask);
  } catch (error) {
    return resp.status(400).json(error.message);
  }
});

router.post("/", async function (req, resp) {
  const newTask = req.body;
  try {
    const newCodeTask = await codeTaskBL.addCodeTask(newTask);
    return resp.status(200).json(newCodeTask);
  } catch (error) {
    return resp.status(400).json(error.message);
  }
});

module.exports = router;
