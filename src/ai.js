
import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make using some or all of those ingredients. You do not need to use every ingredient they mention. The recipe can include additional ingredients, but try to limit them. Format your response in Markdown for better readability.`;

// Load API key safely
const apiKey = process.env.REACT_APP_RECIPE_API_KEY;
if (!apiKey) {
    throw new Error("Missing Hugging Face API key. Check your .env file.");
}
const hf = new HfInference(apiKey);

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe recommendation.` },
            ],
            max_tokens: 1024,
        });

        console.log("API Response:", response);
        
        return response.choices?.[0]?.message?.content || "No response received";
    } catch (err) {
        console.error("Error fetching recipe:", err.message);
        return "An error occurred while fetching the recipe.";
    }
}
