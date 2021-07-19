import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Collapse } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
// import AddSharpIcon from '@material-ui/icons/AddSharp';
import OrderModal from './orderModal';
import { db } from '../../../firebase';

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

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [products, setProducts] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    console.log('use effect');
    let array = [];
    const productData = await db.collection('products').get();
    productData.docs.map((doc) => {
      let formatData = doc.data();
      array.push(formatData);
    });
    let finalData = array.filter((modifier) => modifier.IsModifier == 'False' && modifier.price > 0);
    setProducts(finalData);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {products &&
          products.map((data, index) => {
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
