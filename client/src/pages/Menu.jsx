import React from 'react';
import { Box, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom

import Drinks from '../components/menu components/Drinks';
import Pizzas from '../components/menu components/Pizzas';
import Appetizers from '../components/menu components/Appetizers';
import BurgerAndHotDog from '../components/menu components/BurgersAndHotDogs';
import TendersAndWings from '../components/menu components/TendersAndWings';
import Kids from '../components/menu components/Kids';
import Salads from '../components/menu components/Salads';
import Subs from '../components/menu components/Subs';
import Desserts from '../components/menu components/Desserts';


function Menu() {
    return (
        <Container>

            <div id='pizzas'>
                <Pizzas />
            </div>
            <div id='appetizers'>
                <Appetizers />
            </div>
            <div id='burgerAndHotDog'>
                <BurgerAndHotDog />
            </div>
            <div id='tendersAndWings'>
                <TendersAndWings />
            </div>
            <div id='salads'>
                <Salads />
            </div>
            <div id='subs'>
                <Subs />
            </div>
            <div id='kids'>
                <Kids />
            </div>
            <div id='desserts'>
                <Desserts />
            </div>
            <div id='drinks'>
                <Drinks />
            </div>
        </Container>
    );
}

export default Menu;
