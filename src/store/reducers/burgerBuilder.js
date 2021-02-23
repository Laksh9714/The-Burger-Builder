
import { bindActionCreators } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import { setIngredients } from '../actions/burgerBuilder';
import { updateObject } from '../utility';

const initialState = {
    ingredients : null,
    totalprice : 4,
    error : false,
    building: false
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

const addIngredient = (state,action) => {
    const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 }

            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);

            const updatedState = {
                ingredients : updatedIngredients,
                totalprice : state.totalprice + INGREDIENT_PRICES[action.ingredientName],
                building : true
            }

            return updateObject(state , updatedState);
}


const removeIngredient = (state,action) => {
    const updatedIng = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1 }

            const updatedIngs = updateObject(state.ingredients,updatedIng);

            const updatedSt = {
                ingredients : updatedIngs,
                totalprice : state.totalprice - INGREDIENT_PRICES[action.ingredientName],
                building : true
            }

            return updateObject(state , updatedSt);
}

const setIngredient = (state,action) => {
    return updateObject(state , {
        ingredients : action.ingredients,
        totalprice : 4,
        error : false,
        building : false
    });
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);
            
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state,action);
           
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state , {error : true});
        
        default:
            return state;
    }
};

export default reducer;