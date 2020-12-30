import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

import classes from './Layout.css';

const layout = (props) =>(
    <Aux>
        <Toolbar/>
        <Sidedrawer/>
        <main className = {classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;