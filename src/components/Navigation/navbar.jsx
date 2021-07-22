import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 15,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Navbar(props) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <Button>Sliders</Button>
          <Button>SPECIAL IT</Button>
          <Button>Daily Spec</Button>
          <Button>DESSERTS</Button>
        </div>
        <div>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={0} color="secondary">
              <ShoppingCartIcon onClick={() => router.push('/checkout')} />
            </StyledBadge>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
}
