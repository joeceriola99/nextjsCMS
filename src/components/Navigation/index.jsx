import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export default function AdminNavigation(props) {
  const router = useRouter();

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} color="default">
        <Toolbar>
          <Box flexGrow={1} py={1}>
            <Box>
              <Image src={'/LogoAjSlider.png'} height={30} width={150} alt="AJ SLider" />
            </Box>
          </Box>
          <Button onClick={() => router.push('/home')}>Home</Button>
          <Button onClick={() => router.push('/orderNow')}>Order Now</Button>
          <Button>About Us</Button>
          <Button>Contact Us</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}