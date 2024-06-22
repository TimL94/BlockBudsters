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

const pages = ['Events', 'Menu', 'Order', 'Booking', 'Contact'];

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
            href='/Order'
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
      <AppBar position="static" sx={{ maxWidth: { mb: '100vw', md: '65vw' }, borderRadius: 10, margin: 'auto'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NightlifeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              603 Bar
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 7,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              603 Bar
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent:'flex-end' } }}>
              <Button onClick={toggleDrawer(true)} color='inherit'>
                <MenuIcon />
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' >
                {DrawerList}
              </Drawer>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={`/${page}`}
                  sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Typography
                noWrap
                component={Link}
                href="/Login"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Login
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;