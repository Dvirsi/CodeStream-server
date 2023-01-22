const { CodeTask } = require("./schema");

const getAllCodeTasks = () => {
  try {
    return CodeTask.find({});
  } catch (error) {
    throw Error(error);
  }
};

const getCodeTaskById = (id) => {
  try {
    return CodeTask.findById(id);
  } catch (error) {
    throw Error(error);
  }
};

const addCodeTask = async (obj) => {
  const exists = await CodeTask.findOne({ title: obj.title });
  if (exists) {
    throw Error("Code block already exists");
  }
  const newCodeBlock = new CodeTask({
    title: obj.title,
    solution: obj.solution,
    difficulty: obj.difficulty,
    description: obj.description,
    blockPlaceholder: obj.blockPlaceholder,
  });
  try {
    const newObj = await newCodeBlock.save();
    return newObj;
  } catch (error) {
    throw Error(error);
  }
};

const mentorConnection = async (blockId, socketId) => {
  try {
    await CodeTask.findByIdAndUpdate(blockId, {
      mentorSocketId: socketId,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCodeTasks,
  mentorConnection,
  getCodeTaskById,
  addCodeTask,
};
