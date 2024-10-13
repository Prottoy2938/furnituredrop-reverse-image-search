const express = require('express');
const app = express();
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyAJumUPsP_gy0sBhae4DfBYwxpbVZZeEvI');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set up a route to handle requests
app.post('/generate-content', async (req, res) => {
  try {
    // Define the prompt and image to send to the model
    const prompt = "Out of Poundex, American Star, Coaster Furniture & Aasley Furniture, which one is this furniture from & what's its code? Search on google for the latest information";
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
        mimeType: "image/png",
      },
    };

    // Generate content using the model
    const response = await model.generateContent([prompt, image]);

    // Send the response text back to the client
    res.json({ result: response.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during content generation" });
  }
});


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.listen(process.env.PORT || 3000);

module.exports = app;