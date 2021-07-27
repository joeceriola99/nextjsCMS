import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import OrderModal from './orderModal';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    margin: 5,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  icons: {
    justifyContent: 'center',
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  console.log('use effect card page', props);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {props.products &&
          props.products.map((data, index) => {
            const url = 'https://ajsliders.com/images/' + data.FileName;
            const price = '$' + data.ItemCost;
            // console.log(data.ItemID);
            return (
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>
                  <Grid>
                    <Card>
                      <CardHeader titleTypographyProps={{ variant: 'h7' }} title={data.ItemDescription} />
                      <CardMedia className={classes.media} image={url} title="Dish" />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {price}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.icons}>
                        <IconButton>
                          <OrderModal data={data} />
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
