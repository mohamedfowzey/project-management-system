import axios from "axios";
import {  KEY_2 } from "../Constants/OPEN_ROUTER_KEY";

export const askAI = async (userInput: string) => {
const payLoad = {

    model: "gpt-3.5-turbo",
        "messages": [
  {
    "role": "user",
    "content": userInput
  }
] }

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", payLoad, {
      headers: {
        authorization: `Bearer ${KEY_2}`,
        "Content-Type": "application/json"
      }

    });
    console.log(response.data.choices[0]?.message?.content);
    
    return response.data.choices[0]?.message?.content || "unknown";
  } catch (error) {
    console.error("Error asking AI:", error);
    return "unknown";
  }
};
