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
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  RestaurantMenu as RestarauntMenuIcon,
  Event as EventIcon,
  LocalPizza as PizzaIcon,
  ContactPhone as ContactIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import Auth from '../utils/auth';

import logo from '../assets/images/BlockBudsters.png';

function ResponsiveAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const buttonStyles = { textDecoration: 'none', color: 'inherit', textTransform: 'none' };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
            <ListItemText>Menu</ListItemText>
          </Button>
        </ListItem>

        {Auth.loggedIn() && (
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
              <ListItemText>Order Online</ListItemText>
            </Button>
          </ListItem>
        )}

        {Auth.loggedIn() && Auth.isAdmin() && (
          <ListItem disablePadding>
            <Button
              sx={buttonStyles}
              component={Link}
              href='/Inventory'
              width='100%'
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText>Inventory</ListItemText>
            </Button>
          </ListItem>
        )}
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
            <ListItemText>Contact</ListItemText>
          </Button>
        </ListItem>
      </List>

      <Divider />
      <List>
        {!Auth.loggedIn() ? (
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
              <ListItemText>Login</ListItemText>
            </Button>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <Button
              sx={buttonStyles}
              onClick={logout}
              width='100%'
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </Button>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <AppBar position="static" sx={{ maxWidth: '100vw', maxHeight: '150px', background: 'black' }}>
        <Container width='100vw'>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: 'none', lg: 'flex', md: 'flex' },
                mt: 0.3,
                mb: 0.3
              }}
            >
              <img src={logo} style={{ width: '150px', height: '75px' }} />
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 0,
                ml: -2,
                mb: 0.2,
                mt: 0.2
              }}
            >
              <img src={logo} style={{ width: '150px', height: '75px' }} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' }, mr: -2 }}>
              <Button onClick={toggleDrawer(true)} color='inherit'>
                <MenuIcon />
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
              </Drawer>
            </Box>

            {/* Desktop Links */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
                mt: -1,
                mb: -5
              }}
            >
              <Button component={Link} href="/Menu" sx={buttonStyles}>Menu</Button>
              <Button component={Link} href="/Contact" sx={buttonStyles}>Contact</Button>
              {!Auth.loggedIn() ? (
                <Button component={Link} href="/Login" sx={buttonStyles}>Login</Button>
              ) : (
                <>
                  <Button component={Link} href="/Order" sx={buttonStyles}>Order Online</Button>
                  {Auth.isAdmin() && (
                    <Button component={Link} href="/Inventory" sx={buttonStyles}>Inventory</Button>
                  )}
                  <Button onClick={logout} sx={buttonStyles}>Logout</Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
