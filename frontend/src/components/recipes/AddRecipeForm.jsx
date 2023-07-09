import React from "react";

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
        const data = await fetch(`http://localhost:20074/calories/search/${ingredient.name}`);
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
        const response = await fetch('http://localhost:20073/recipes', {
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
        const response = await fetch('http://localhost:20075/ingredients', {
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
            <form onSubmit={this.handleSubmit}>
                <h1 key={"RecipeDetails"}>Add recipe</h1>
                <label key={"nameInput"}>
                    Name:
                    <input
                        type="text"
                        value={this.state.name}
                        name="name"
                        onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label key={"descriptionInput"}>
                    Description:
                    <input
                        type="text"
                        value={this.state.desc}
                        name="desc"
                        onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label key={"instructionsInput"}>
                    Instructions:
                    <textarea
                        value={this.state.instructions}
                        name="instructions"
                        onChange={this.handleChange}
                    />
                </label>
                <h2 key={"addIngredients"}>Adding ingredients:</h2>
                {this.state.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Ingredient"
                            name="name"
                            value={ingredient.name}
                            onChange={this.handleIngredientChange.bind(this, index)}
                        />
                        <input
                            type="number"
                            placeholder="Amount in g"
                            name="amount"
                            value={ingredient.amount}
                            onChange={this.handleIngredientChange.bind(this, index)}
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => this.removeIngredient(index)}>
                                Remove
                            </button>
                        )}
                    </div>

                ))}
                <button type="button" onClick={this.addIngredient.bind(this)}>
                    Add ingredient
                </button>
                <br/>
                <button type="submit">Submit</button>
                {this.state.submitted && <div>Submitted!</div>}
            </form>

        );
    }
}

export default AddRecipeForm;

