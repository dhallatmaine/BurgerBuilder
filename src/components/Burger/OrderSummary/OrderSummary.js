import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .map(ingredient => {
      return (  <li key={ingredient}>
                  <span style={{textTransform: 'capitalize'}}>{ingredient}</span>:
                  {props.ingredients[ingredient]}
                </li> )
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
};

export default orderSummary;
