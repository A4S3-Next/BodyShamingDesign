require("dotenv").config();

const express = require("express");
const cors = require("cors");

const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

app.post("/chat", async (req, res) => {

  try {

    const userMessage =
      req.body.message;

    const response =
      await client.chat.completions.create({

         model: "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",
            content:
              "You are a kind, supportive assistant helping teenagers with stress, bullying, emotions, and school problems."
          },

          {
            role: "user",
            content: userMessage
          }

        ]

      });

    res.json({
      reply:
        response.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply:
        "I'm here for you."
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});


let visits = 0;

app.get("/", (req, res) => {
  visits++;
  console.log("Visits:", visits);
  res.send("Server running");
});
