import React from 'react';
import { Box, Container, Link } from '@mui/material';

import Drinks from '../components/menu components/Drinks';
import Pizzas from '../components/menu components/Pizzas';
import Appetizers from '../components/menu components/Appetizers';
import BurgerAndHotDog from '../components/menu components/BurgersAndHotDogs';
import TendersAndWings from '../components/menu components/TendersAndWings';
import Kids from '../components/menu components/Kids';
import Salads from '../components/menu components/Salads';
import Subs from '../components/menu components/Subs';
import Desserts from '../components/menu components/Desserts';

const linkSx = { mx: 1 }

function Menu() {
    return (
        <Container>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    minHeight: '2rem',
                    border: 1,
                    borderRadius: 5,
                    mt:1,
                    mb:-2,
                    background: 'white',
                    opacity: '90%'
                }}
            >
                <Link variant='button' underline='none' color='inherit' href='#pizzas' sx={linkSx}>{'Pizzas'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#appetizers' sx={linkSx}>{'Appetizers'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#burgerAndHotDog' sx={linkSx}>{'Burgers and Dogs'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#tendersAndWings' sx={linkSx}>{'Tenders and Wings'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#salads' sx={linkSx}>{'Salads'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#subs' sx={linkSx}>{'Subs'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#kids' sx={linkSx}>{'Kids'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#desserts' sx={linkSx}>{'Desserts'}</Link>
                <Link variant='button' underline='none' color='inherit' href='#drinks' sx={linkSx}>{'Drinks'}</Link>
            </Box>
            <Box id='pizzas'>
                <Pizzas />
            </Box>
            <Box id='appetizers'>
                <Appetizers />
            </Box>
            <Box id='burgerAndHotDog'>
                <BurgerAndHotDog />
            </Box>
            <Box id='tendersAndWings'>
                <TendersAndWings />
            </Box>
            <Box id='salads'>
                <Salads />
            </Box>
            <Box id='subs'>
                <Subs />
            </Box>
            <Box id='kids'>
                <Kids />
            </Box>
            <Box id='desserts'>
                <Desserts />
            </Box>
            <Box id='drinks'>
                <Drinks />
            </Box>
        </Container>
    );
}

export default Menu;
