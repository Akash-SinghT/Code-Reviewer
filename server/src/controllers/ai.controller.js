import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required.",
      });
    }

    const aiResponse = await aiService(code);

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      data: {
        text: aiResponse,
      },
    });
  } catch (error) {
    console.error("❌ Error in getReview:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI review.",
      error: error.message,
    });
  }
};
