

export default function IngredientsList(props){

    const ingredientsList = props.ingredients.map(ingredient => {
        return <li key={ingredient}>{ingredient}</li>
    });

    return(
        <section className="listContainer">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredientUnordList">{ingredientsList}</ul>

            {/* used ternary operator to hide and show when it got 4 items or more. */}
            {props.ingredients.length > 3 ? <div className="readyRecipe">
                <div className="readyRecipeText">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div> : null}
        </section>
    )
}