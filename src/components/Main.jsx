import React from 'react';
import IngredientsList from './IngrefientList';
import ClaudeRecipe from './ClaudeRecipe';
import { getRecipeFromMistral } from '../ai';

export default function Main(){

    const [ingredients , setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredients(formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevList => [...prevList,newIngredient]);
    }


    return(
        <main >
            <form action={addIngredients} className="mainContainer">
            <input
                type="text"
                placeholder="e.g.oregano"
                aria-label="Add ingredient"
                name="ingredient"
            />
            <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && 
                <IngredientsList 
                    ingredients={ingredients} 
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}