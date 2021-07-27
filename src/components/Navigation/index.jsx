import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Cookies from 'js-cookie';

export default function AdminNavigation(props) {
  const router = useRouter();

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 15,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const cartHandler = () => {
    let data = Cookies.get('userID');
    console.log(data);
    if (data) {
      router.push('/checkout');
    } else {
      router.push('auth/login');
    }
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} color="inherit">
        <Toolbar style={{width:"100%"}}>
          <Box flexGrow={1} py={1}>
            <Box>
              <Image src={'/LogoAjSlider.png'} height={30} width={150} alt="AJ SLider" />
            </Box>
          </Box>
          <div style={{marginLeft:"auto"}}>
          <Button onClick={() => router.push('/home')}>Home</Button>
          <Button onClick={() => router.push('/orderNow')}>Order Now</Button>
          <Button>About Us</Button>
          <Button>Contact Us</Button>
          </div>
          <div>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={0} color="secondary">
                <ShoppingCartIcon onClick={cartHandler} />
              </StyledBadge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
