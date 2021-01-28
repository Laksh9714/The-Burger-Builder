import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';


class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading:true});


        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer : {
                name : "Laksh",
                address : {
                    street : "Shiv Mandir Road",
                    zipcode : "421201",
                    country : "India"
                },
                email : "lsss@gmail.com"
            },
            deliveryMethod : "fastest"
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false } );
                this.props.history.push('/');
            }) 
            .catch(error => {
                this.setState({loading:false });
            });

    }

    render(){

        let form = (
            <form>
                    <Input inputtype = "input" type = "text" name = "name" placeholder = "Your name" />
                    <Input inputtype = "input" type = "email" name = "email" placeholder = "Your Mail" />
                    <Input inputtype = "input" type = "text" name = "street" placeholder = "Street" />
                    <Input inputtype = "input" type = "text" name = "postalCode" placeholder = "Postal Code" />
                    <Button btnType = "Success" clicked = {this.orderHandler}>Order</Button>
                </form>
        );

        if(this.state.loading){
            form = <Spinner/>
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;