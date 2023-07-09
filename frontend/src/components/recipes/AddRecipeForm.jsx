import React from "react";
import "../../styles/AddRecipeForm.css"

class AddRecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            instructions: '',
            imageName: '',
            ingredientName: '',
            ingredientAmountsInGram: [],
            ingredientIds: [],
            ingredients: [{name: '', amount: ''},],
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleIngredientChange(index, event) {
        const {name, value} = event.target;
        this.setState((prevState) => {
            const updatedIngredients = [...prevState.ingredients];
            updatedIngredients[index][name] = name === 'amount' ? parseFloat(value) : value;
            return {ingredients: updatedIngredients};
        });
    }

    addIngredient() {
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, {name: '', amount: ''}]
        }));
    }

    removeIngredient(index) {
        this.setState((prevState) => {
            const updatedIngredients = [...prevState.ingredients];
            updatedIngredients.splice(index, 1);
            return {ingredients: updatedIngredients};
        });
    }

    addIngredientId(fdcId) {
        this.setState((prevState) => ({
            ingredientIds: [...prevState.ingredientIds, fdcId]
        }));
    }

    addIngredientAmounts(amount) {
        this.setState((prevState) => ({
            ingredientAmountsInGram: [...prevState.ingredientAmountsInGram, amount]
        }));
    }

    async handleUSDAData(ingredient) {
        const data = await fetch(`http://194.94.204.27:20074/calories/search/${ingredient.name}`);
        const ingredientData = await data.json();
        console.log('Current fdcId:' + ingredientData.fdcId);
        console.log('Current amount: ' + ingredient.amount)
        await this.addIngredientId(ingredientData.fdcId);
        await this.addIngredientAmounts(ingredient.amount);
        await this.postIngredient(ingredientData);
    }

    async getUSDAData(ingredient) {
        try {
            await this.handleUSDAData.call(this, ingredient);
        } catch (err) {
            console.error(err);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.setState({
            submitted: true
        })
        for (const ingredient of this.state.ingredients) {
            await this.getUSDAData(ingredient).catch(err => console.error(err));
        }
        console.log('A recipe was submitted ' + this.state.name);
        await this.postRecipe().catch(err => console.error(err));
    }

    async postRecipe() {
        const response = await fetch('http://194.94.204.27:20073/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name: this.state.name,
                    desc: this.state.desc,
                    instructions: this.state.instructions,
                    ingredientIds: this.state.ingredientIds,
                    ingredientAmountsInGram: this.state.ingredientAmountsInGram
                }
            )
        })

        console.log(response);
    }

    async postIngredient(body) {
        const response = await fetch('http://194.94.204.27:20075/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        console.log('Response: ' + response);
    }

    render() {
        return (
            <div className="main-content">
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <h2 className="form-title" key={"RecipeDetails"}>Add recipe</h2>
                    <div className="form-group">
                        <label className="form-label" key={"nameInput"}>Name:</label>
                        <input className="form-input" type="text" value={this.state.name} name="name"
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" key={"descriptionInput"}>Description:</label>
                        <input className="form-input" type="text" value={this.state.desc} name="desc"
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" key={"instructionsInput"}>Instructions:</label>
                        <input className="form-input" type="text" value={this.state.instructions} name="instructions"
                               onChange={this.handleChange}/>
                    </div>
                    <h3 className="form-title" key={"addIngredients"}>Adding ingredients:</h3>
                    {this.state.ingredients.map((ingredient, index) => (
                        <div className="form-group" key={index}>
                            <input className="form-input" type="text" placeholder="Ingredient" name="name"
                                   value={ingredient.name} onChange={this.handleIngredientChange.bind(this, index)}/>
                            <input className="form-input" type="number" placeholder="Amount in g" name="amount"
                                   value={ingredient.amount} onChange={this.handleIngredientChange.bind(this, index)}/>
                            {index > 0 && (
                                <button className="form-button" type="button"
                                        onClick={() => this.removeIngredient(index)}>
                                    Remove
                                </button>
                            )}
                        </div>

                    ))}
                    <button className="form-button" type="button" onClick={this.addIngredient.bind(this)}>
                        Add ingredient
                    </button>
                    <br/>
                    <button className="form-button" type="submit">Submit</button>
                    {this.state.submitted && <div className="form-label">Submitted!</div>}
                </form>
            </div>
        );
    }
}

export default AddRecipeForm;

