const { GoogleGenerativeAI } = require("@google/generative-ai");

export const BujjiAi = async () => {
  console.log("Bujji Aji");

  const apiKey = "AIzaSyA-A_IPZW8YonSqF1krVvnQJekwpVjb6nM";
  if (!apiKey) {
    console.error("API Key is missing");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const model = "gemini-1.5-flash";
    const userQuery = "Hi Im Sai Ajith Kumar";

    const res = await genAI.generateMessage({
      model: model,
      prompt: userQuery,
    });

    console.log(res.response.text());
    return res.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
