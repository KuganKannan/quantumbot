// Import necessary modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration: OpenAIConfig, OpenAIApi } = require("openai");

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Initialize OpenAI API with your API key
const openaiConfig = new OpenAIConfig({
  apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variable
});
const openai = new OpenAIApi(openaiConfig); // Correct OpenAIApi instantiation

// Route to handle chat requests
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Log the user's message
  console.log("User Message:", userMessage);

  try {
    // Send the user's message to OpenAI
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    // Get the response from OpenAI
    const botMessage = response.data.choices[0].message.content;

    // Log the bot's response
    console.log("Bot Response:", botMessage);

    // Send the bot's response back to the frontend
    res.json({ response: botMessage });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res
      .status(500)
      .json({ error: "Something went wrong with the AI response!" });
  }
});

// Start the server on port 5000
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
