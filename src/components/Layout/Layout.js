import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

import classes from './Layout.css';

class Layout extends Component{
    state = {
        showSidedrawer : true
    }


    sidedrawerClosedHandler = () =>{
        this.setState({
            showSidedrawer : false
        });
    }

    sidedrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSidedrawer:!prevState.showSidedrawer};
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar
                drawertoggleclicked = {this.sidedrawerToggleHandler}/>
                <Sidedrawer 
                open = {this.state.showSidedrawer} 
                closed = {this.sidedrawerClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
    
        );
    } 
};

export default Layout;