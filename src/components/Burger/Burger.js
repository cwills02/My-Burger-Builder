import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  console.log(props);
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  // [] is the initial value of the reduced value, we are iterating through each el in the original array and arr is the value returned with each time we loop through the array; here we are transforming our array of arrays into 1 single array as concat adds each element to the new arr we return
  
  // the keys we used in the BurgerBuilder state have to equal exactly the keys we are checking for in the BurgerIngredient (meat, cheese, salad, bacon) -> VERY IMPORTANT
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;


// When you initialise the state of the ingredients (into burgerBuilder component) you start with an object of ingredients with keys or properties -> salad, cheese, bacon and meat, and with initial value as 0, for each ingredient (0 is equal the value). 

// BurgerBuilder.js
 
// state = {
// ingredients: {
// salad: 0,
// cheese: 0,
// bacon: 0,
// meat: 0
// }
// }
// When you reach this point of snippet code .map((_, i) => {  you going to  receive an array of undefined properties. You suppose that initialise the ingredients state as: 

// state = {                            
// ingredients: {
// salad: 1,
// cheese: 2,
// bacon: 1,
// meat: 0
// }
// }
// you going to iterate an array of -> [undefined], [undefined, undefined], [undefined], [ ] 

// salad == [undefined],

// cheese == [undefined, undefined],

// bacon == [undefined],

// meat == [] 

// Then, in our case, you don't care about the object,  to access its properties, (and then use "_" syntax)  but you need to receive the index. And why? To render the BurgerIngredient component, you will need to receive type as props (remember the switch case into BurgerIngredients component), and then you will use igKeys, and the key attribute used, as unique value to render many items, as unique key you found, if you going to find multiples keys, you will render multiples component  (to render BurgerIngredients as our case).

// Burger.js 
 
// //...other code
 
// return <BurgerIngredient key={igKey + i} type={igKey} />;
// If use a console.log of igKey you will return the precedent undefined as:

// salad, cheese, cheese, bacon

// and if you print a console.log og igKey + i (the syntax used into map parameters, _, i) you going to receive the result:

// salad0, cheese0, cheese1, bacon0

// and for each key received you wil render many BurgerIngredient component of type salad (once time), cheese (twice time), bacon (once time) and meat zero time, because you won't receive meat property. The i, is important to valorize the unique key prop for each children rendered.