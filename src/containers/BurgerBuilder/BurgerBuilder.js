import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import axios from '../../axios-orders';




class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    
    state = {
        purchasing : false,
        loading : false,
        error : false
    } 

    componentDidMount(){
        // axios.get("https://react-burger-builder-5305e-default-rtdb.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ingredients:response.data});
        //     })
        //     .catch(error =>{
        //         this.setState({error : true});
        //     });
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum,el) => {
            return sum = sum + el;
        },0);

        return sum>0;
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        this.props.history.push('/checkout');
    } 

  
    render(){
        
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0
        }
        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients cannot be loaded</p> : <Spinner/>;

        if (this.props.ings)
        {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                        <BuildControls
                            ingredientAdded = {this.props.onIngredientAdded}
                            ingredientRemoved = {this.props.onIngredientRemoved}
                            disabled = {disableInfo}
                            price = {this.props.price}
                            purchaseable = {this.updatePurchaseState(this.props.ings)}
                            purchasing = {this.state.purchasing} 
                            ordered = {this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                price = {this.props.price}/>;
        }

        if(this.state.loading)
        {
            orderSummary = <Spinner/>;
        }
        
        

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Aux>
        );
    }

}


const mapStateToProps = state => {
    return{
        ings : state.ingredients,
        price : state.totalprice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT , ingredientName : ingName}),
        onIngredientRemoved : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT , ingredientName : ingName})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));