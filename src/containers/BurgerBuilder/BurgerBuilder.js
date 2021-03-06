import React, { Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchaseable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const newPrice = this.state.totalPrice - PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('You continue');
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
            <OrderSummary
              ingredients={this.state.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice} />
        </Modal>
        <Burger
          ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          order={this.purchaseHandler}
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
