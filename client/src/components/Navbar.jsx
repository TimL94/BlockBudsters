import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  Nightlife as NightlifeIcon,
  RestaurantMenu as RestarauntMenuIcon,
  Event as EventIcon,
  LocalPizza as PizzaIcon,
  EditCalendar as BookingIcon,
  ContactPhone as ContactIcon,
  Login as LoginIcon
} from '@mui/icons-material';

import BarImage from  '../assets/images/603bar.png';

const pages = ['Events', 'Menu', 'Order', 'Booking', 'Contact', 'Login'] ;

function ResponsiveAppBar() {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const buttonStyles = {textDecoration:'none', color:'inherit', textTransform:'none'};

  const DrawerList = (
    <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <Button 
            sx={buttonStyles}
            component={Link}
            variant='text'
            href='/Menu'
            width='100%'
          >
            <ListItemIcon>
              <RestarauntMenuIcon />
            </ListItemIcon>
            <ListItemText>
              Menu
            </ListItemText>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button 
            sx={buttonStyles}
            component={Link}
            href='https://www.toasttab.com/local/order/603pizza/r-9ffe1139-45e2-4d9b-8aff-ed2dc38760c2'
            target='_blank'
            width='100%'
          >
            <ListItemIcon>
              <PizzaIcon />
            </ListItemIcon>
            <ListItemText>
              Order Online
            </ListItemText>
          </Button>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <Button 
            sx={buttonStyles}
            component={Link}
            href='/Events'
            width='100%'
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText>
              Events
            </ListItemText>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button 
            sx={buttonStyles}
            component={Link}
            href='/Booking'
            width='100%'
          >
            <ListItemIcon>
              <BookingIcon />
            </ListItemIcon>
            <ListItemText>
              Booking
            </ListItemText>
          </Button>
        </ListItem>
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <Button 
            sx={buttonStyles}
            component={Link}
            href='/Contact'
            width='100%'
          >
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText>
              Contact
            </ListItemText>
          </Button>
        </ListItem>

      </List>
            
      <Divider />
      <List>
        <ListItem disablePadding>
            <Button 
            sx={buttonStyles}
            component={Link}
            href='/Login'
            width='100%'
          >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>
                Login
              </ListItemText>
            </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <AppBar position="static" sx={{ maxWidth: { mb: '100vw', md: '100vw', maxHeight:'150px'}}}>
        <Container width='100vw'>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: 'none', lg: 'flex', md:'flex' },
                mt:-10
              }}
            >
              <img src={BarImage} style={{width:'150px', height:'300px' }}/>
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 0,
                mt:-5,
                mb:-5,
                ml:-2
              }}
            >
              <img src={BarImage} style={{width:'75px', height:'150px' }}/>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none', justifyContent:'flex-end' }, mr: -2 }}>
              <Button onClick={toggleDrawer(true)} color='inherit'>
                <MenuIcon />
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' >
                {DrawerList}
              </Drawer>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex', justifyContent: 'flex-end' }}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={`/${page}`}
                  sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none', textTransform: 'none' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;