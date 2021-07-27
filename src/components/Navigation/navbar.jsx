import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

export default function Navbar(props) {
  return (
    <React.Fragment>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {props &&
          props.categoriesList &&
          props.categoriesList.map((data, index) => {
            return (
              <Button onClick={() => props.handlerClick(data)} key={index}>
                {data}
              </Button>
            );
          })}
      </Toolbar>
    </React.Fragment>
  );
}
