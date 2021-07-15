import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core';

export default function Navbar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar>
        <div style={{ textAlign: 'center' }}>
          <Button>Sliders</Button>
          <Button>SPECIAL IT</Button>
          <Button>Daily Spec</Button>
          <Button>DESSERTS</Button>
        </div>
      </Toolbar>
    </React.Fragment>
  );
}
