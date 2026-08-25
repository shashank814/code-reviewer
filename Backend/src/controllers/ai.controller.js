const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await aiService(code);

    return res.status(200).send(response);

  } catch (error) {
    console.error("Error in getReview:", error);

    return res.status(500).json({
      message: "Something went wrong while processing AI request",
      error: error.message
    });
  }
};