import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
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
  Settings as SettingsIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  RestaurantMenu as RestarauntMenuIcon,
  Event as EventIcon,
  LocalPizza as PizzaIcon,
  EditCalendar as BookingIcon,
  ContactPhone as ContactIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const pages = ['Events', 'Menu', 'Order', 'Booking', 'Contact'];
const settings = ['Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RestarauntMenuIcon />
            </ListItemIcon>
            <ListItemText>
            <Link href='/Menu' sx={{textDecoration:'none', color:'inherit'}}>
                Menu
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <PizzaIcon />
            </ListItemIcon>
            <ListItemText>
              <Link href='/Order' sx={{textDecoration:'none', color:'inherit'}}>
                Order Online
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText>
              <Link href='/Events' sx={{textDecoration:'none', color:'inherit'}}>
                Events
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BookingIcon />
            </ListItemIcon>
            <ListItemText>
            <Link href='/Booking' sx={{textDecoration:'none', color:'inherit'}}>
                Booking
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText>
            <Link href='/Contact' sx={{textDecoration:'none', color:'inherit'}}>
                Contact
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

      </List>
            
      <Divider />
      <List>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>
              <Link href='/Login' sx={{textDecoration:'none', color:'inherit'}}>
                  Login
                </Link>
              </ListItemText>
            </ListItemButton>
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

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Button onClick={toggleDrawer(true)} color='inherit'>
                <MenuIcon />
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 6,
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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