import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

import classes from './Layout.css';

class Layout extends Component{
    state = {
        showSidedrawer : false
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