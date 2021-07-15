import React from 'react';
import { Box, Typography, IconButton, Toolbar } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
const Footer = () => {
  return (
    <>
      <Box
        style={{ backgroundColor: '#ff3100'}}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexDirection="column"
      >
        <Typography style={{ color: 'white' }} variant="h4" gutterBottom>
          SOCIAL CONNECT
        </Typography>
        <Box display="flex" alignItems="center">
          <a target="_blank" href="https://www.facebook.com/AJSliders/">
            <IconButton>
              <FacebookIcon style={{ color: 'white' }} fontSize="large" />
            </IconButton>
          </a>
          <a target="_blank" href="https://www.youtube.com/channel/UC36ugNR46ehnKurUSall9yQ">
            <IconButton>
              <YouTubeIcon style={{ color: 'white' }} fontSize="large" />
            </IconButton>
          </a>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" padding="1rem" flexDirection="column">
        <Typography>Privacy Policy</Typography>
        <Typography>© 2021 AJ Sliders. All Rights Reserved</Typography>
      </Box>
      <Toolbar />
    </>
  );
};

export default Footer;
