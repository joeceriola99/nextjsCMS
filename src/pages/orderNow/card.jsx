import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Collapse } from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
}));

export default function RecipeReviewCard() {
  const [products, setProducts] = useState(null);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <Grid container spacing={3}>
        {products &&
          products.map((data, index) => {
            const url = 'https://ajsliders.com/images/' + data.FileName;
            const price = '$' + data.ItemCost;
            console.log(url);
            return (
              <Grid item xs={6} sm={3}>
                <div className={classes.paper}>
                  <Grid>
                    <Card>
                      <CardHeader
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        titleTypographyProps={{ variant: 'h7' }}
                        title={data.ItemDescription}
                      />
                      <CardMedia className={classes.media} image={url} title="Dish" />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {price}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.icons}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                          })}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Method:</Typography>
                          <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                          </Typography>
                          <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat.
                            Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to
                            8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in
                            the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and
                            remaining 4 1/2 cups chicken broth; bring to a boil.
                          </Typography>
                          <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again
                            without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more.
                            (Discard any mussels that don’t open.)
                          </Typography>
                          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                        </CardContent>
                      </Collapse>
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
