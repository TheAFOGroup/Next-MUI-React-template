"use client";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import * as React from 'react';

const pages = [];
const settings = [];

interface ResponsiveAppBarProps {
  session: Session | null;
}

function ResponsiveAppBar({ session }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter(); // Initialize useRouter

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admincp' });
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admincp/dashboard"
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
            AFO GROUP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => { handleMenuItemClick("/admincp/forms/buildform") }}>
                <Typography textAlign="center">Build Form</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleMenuItemClick("/admincp/forms/viewform") }}>
                <Typography textAlign="center">View Form Results</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleMenuItemClick("/admincp/events/buildEvents") }}>
                <Typography textAlign="center">View Form Results</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/admincp/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AFO GROUP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => { handleMenuItemClick("/admincp/forms/buildform") }}>
              <Typography textAlign="center">Build Form</Typography>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => { handleMenuItemClick("/admincp/forms/viewform") }}>
              <Typography textAlign="center">View Form Results</Typography>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => { handleMenuItemClick("/admincp/speakers/buildspeakers") }}>
              <Typography textAlign="center">Build Speaker</Typography>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => { handleMenuItemClick("/admincp/events/buildevents") }}>
              <Typography textAlign="center">Build Event</Typography>
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            {session
              ?
              <Typography
                noWrap
                sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}
              >
                {session?.user?.email}
              </Typography>
              :
              <Button
                variant="outlined"
                color="primary"
                onClick={() => signIn(undefined, { callbackUrl: '/admincp/dashboard' })}
                sx={{ my: 2, mr: 2, color: 'white' }}
              >
                Sign In
              </Button>
            }
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" >{session?.user?.email}[0]</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} href="/admincp/dashboard" >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={() => { handleMenuItemClick("/admincp/dashboard") }}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <Typography textAlign="center">Sign out</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;