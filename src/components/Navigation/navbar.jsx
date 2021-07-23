import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

export default function Navbar(props) {
  return (
    <React.Fragment>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button>Sliders</Button>
        <Button>SPECIAL IT</Button>
        <Button>Daily Spec</Button>
        <Button>DESSERTS</Button>
      </Toolbar>
    </React.Fragment>
  );
}
