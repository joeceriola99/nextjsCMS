import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container, Button, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function checkout(props) {

  return (
    <Container
      style={{
        position: 'relative',
        height: '90vh',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="subtitle1" style={{ fontWeight: 800 }} gutterBottom>
        MY ORDER{' '}
      </Typography>
      <Grid container>
        <Box
          width="100%"
          borderRadius="10px"
          padding="1rem"
          border="1px solid #bebebe"
        >
          {(!true && (
            <>
              <Typography variant="caption" style={{ color: 'gray' }}>
                Select Address
              </Typography>
              <Typography style={{ lineHeight: 1.2 }}>Roy</Typography>
            </>
          )) || (
            <>
              <Typography style={{ color: 'gray' }} variant="caption">
                Change address
              </Typography>
              <Typography style={{ lineHeight: 1.2 }}>Roy</Typography>
              <Typography style={{ lineHeight: 1.2 }}>
                {/* {selectedAddress.address + ', ' + selectedAddress.city + ', ' + selectedAddress.zipCode} */}
              </Typography>
              <Typography style={{ lineHeight: 1.2 }}>+91947400000</Typography>
            </>
          )}
        </Box>
      </Grid>
      <Box height="1rem" />
      <Grid container spacing={1}>
        <Typography style={{ textAlign: 'center', width: '100%', color: '#bebebe' }} variant="h6">
          NO ITEMS IN CHECK!
        </Typography>

        {[
          {
            image:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=480:*',
            productName: 'abc',
          },
        ].map((item) => {
          return (
            <React.Fragment key={item.image}>
              <Grid item xs={2}>
                <Box display="flex" justifyContent="center">
                  <img src={item.image} style={{ width: '100%', borderRadius: '10px' }} />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="subtitle2">{item.productName}</Typography>
                <Typography variant="caption">$10</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container justify="flex-end">
                  <Box border="1px solid #cecece" borderRadius="5px" padding="1px" display="flex" alignItems="center">
                    <RemoveIcon fontSize="small" />
                    <Box margin="0rem 6px">1</Box>
                    <AddIcon fontSize="small" />
                  </Box>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      <Box height="1rem" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Typography>
              <span style={{ fontWeight: 800 }}>Tips</span> $100
            </Typography>

            <Button
              style={{
                textTransform: 'none',
                color: 'gray',
                fontSize: '0.8rem',
              }}
            >
              Change
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="space-between">
            <Typography style={{ fontWeight: 800, textAlign: 'right' }}>Subtotal</Typography>
            <Typography>$ 100</Typography>
          </Grid>
          <Grid container justify="space-between">
            <Typography style={{ fontWeight: 800 }}>Tax (8%)</Typography>
            <Typography>$ 8</Typography>
          </Grid>
          <Grid container justify="space-between">
            <Typography style={{ fontWeight: 800 }}>Total</Typography>
            <Typography>$ 108</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box bottom="0px" left="0px" width="100%">
        <Button
          style={{
            padding: '11px 0rem',
            borderRadius: '10px',
            backgroundColor: '#ff0000',
            boxShadow: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            letterSpacing: '1px',
          }}
          fullWidth
          variant="contained"
        >
          Place order
        </Button>
      </Box>
    </Container>
  );
}
