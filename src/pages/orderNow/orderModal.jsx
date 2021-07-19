import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ProductModifier from './productModifiers';

import { db } from '../../../firebase';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [product, setProduct] = useState(null);
  const [modifiers, setModifiers] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    let productData = props.data;
    setProduct(productData);
    // console.log('Product ID', props.data.ItemID);

    const modifierData = await db.collection('modifiers').get();
    modifierData.docs.map((doc, index) => {
      let formatData = doc.data();
      // console.log('FormData-', index, '==', formatData.ItemID);
      if (formatData.ItemID == props.data.ItemID) {
        console.log(formatData);
        setModifiers(formatData);
      }
    });

    let url = 'https://ajsliders.com/images/' + props.data.FileName;
    setUrl(url);
  }, []);

  return (
    <div>
      <AddCircleOutline onClick={handleClickOpen} />
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {product?.title}
        </DialogTitle>
        <DialogContent dividers>
          <img src={url} alt="Product Image" width={'100%'} />
          <ProductModifier data={modifiers} />
          <Typography gutterBottom>{product?.fulltext}</Typography>
        </DialogContent>
        <DialogActions>
          <DialogContent style={{ paddingLeft: '40px', fontSize: '1.1rem', fontWeight: '600' }}>
            {`$${product?.price}`}
          </DialogContent>
          <Button autoFocus onClick={handleClose} color="primary">
            Add to Check
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
