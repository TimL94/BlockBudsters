import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';

import Drinks from '../components/menu components/Drinks';
import Concentrates from '../components/menu components/Concentrates';
import Flower from '../components/menu components/Flower';
import PreRolls from '../components/menu components/PreRolls';
import Edibles from '../components/menu components/Edibles';
import Specials from '../components/menu components/Specials';
import Salads from '../components/menu components/Salads';


function linkItems() {
    const linkSx = { mx: 1, fontSize: '1.25rem', textTransform: 'none' }
                return (
                <>
                <Link variant='button' underline='none' color='inherit' href='#concentrates' sx={linkSx}>{'Concentrates'}</Link>
                |
                <Link variant='button' underline='none' color='inherit' href='#flower' sx={linkSx}>{'Flower'}</Link>
                |
                <Link variant='button' underline='none' color='inherit' href='#preRolls' sx={linkSx}>{'Pre Rolls'}</Link>
                |
                <Link variant='button' underline='none' color='inherit' href='#edibles' sx={linkSx}>{'Edibles'}</Link>
                |
                <Link variant='button' underline='none' color='inherit' href='#salads' sx={linkSx}>{'Salads'}</Link>
                |
                <Link variant='button' underline='none' color='inherit' href='#specials' sx={linkSx}>{'Specials'}</Link>
                |
                <Link variant='button' underline='none' color='inherit' href='#drinks' sx={linkSx}>{'Drinks'}</Link>
                </>)
}

function Menu() {
    return (
        <Container>
            <Box
                sx={{
                    position: 'sticky',
                    top: '10px',
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    minHeight: '3rem',
                    border: 2,
                    borderRadius: 2.5,
                    mt:1,
                    mb:-2,
                    background: 'white',
                    opacity: '95%',
                }}
            >
                {linkItems()}
            </Box>
            <Box
                sx={{
                    position: 'sticky',
                    top: '10px',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    minHeight: '2rem',
                    border: 2,
                    borderRadius: 2.5,
                    mt:1,
                    mb:-2,
                    background: 'white',
                    opacity: '90%',
                }}
            >
                {linkItems()}
            </Box>
            <Box id='concentrates'>
                <Concentrates />
            </Box>
            <Box id='flower'>
                <Flower />
            </Box>
            <Box id='preRolls'>
                <PreRolls />
            </Box>
            <Box id='edibles'>
                <Edibles />
            </Box>
            <Box id='salads'>
                <Salads />
            </Box>               
            <Box id='specials'>
                <Specials />
            </Box>
            <Box id='drinks'>
                <Drinks />
            </Box>
        </Container>
    );
}

export default Menu;
