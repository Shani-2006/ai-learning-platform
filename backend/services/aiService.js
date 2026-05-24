const OpenAI = require("openai");

const generateLesson = async ({ categoryName, subCategoryName, prompt }) => {
  console.log("KEY END:", process.env.OPENAI_API_KEY.slice(-4));

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an educational assistant. Create clear, structured, beginner-friendly lessons."
      },
      {
        role: "user",
        content: `Category: ${categoryName}\nSub-category: ${subCategoryName}\nPrompt: ${prompt}`
      }
    ]
  });

  return completion.choices[0].message.content;
};

module.exports = {
  generateLesson
};