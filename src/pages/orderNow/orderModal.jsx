import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import numberFormatter from '../../utils/numberFormatter';
import { db } from '../../../firebase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCookies } from 'react-cookie';

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
  productMod: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formLabel: {
    color: 'black',
    fontWeight: 600,
    height: '20px',
  },
});

const stylesMain = makeStyles((theme) => ({
  input: {
    borderWidth: 2,
    borderStyle: 'solid',
  },
}));

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
  const classes = stylesMain();
  const [state, setState] = useState(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [product, setProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [modifiers, setModifiers] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [modifierOptionName, setModifierOptionName] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['product']);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    console.log(state);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleCheckOut = (id, count) => {
    let products = [];
    if (cookies.product) {
      products = cookies.product;
      console.log(products);
    }
    products.push({ productId: id, quantity: count });
    setCookie('product', products);
    setOpen(false);
  };

  const itemAdd = () => {
    setItemCount(itemCount + 1);
  };

  const itemMinus = () => {
    setItemCount(Math.max(itemCount - 1, 0));
  };

  useEffect(async () => {
    let productData = props.data;
    setProduct(productData);
    setProductPrice(numberFormatter(props.data.price));
    // console.log('Product---------', props.data.price);

    const modifierData = await db.collection('modifiers').get();
    modifierData.docs.map((doc, index) => {
      let formatData = doc.data();
      // console.log('FormData-', index, '==', formatData.ItemID);
      if (formatData.ItemID == props.data.ItemID) {
        // console.log(formatData.option_unique_name);
        setModifierOptionName(formatData.option_unique_name);
        setModifiers(formatData.subModDetails);
      }
    });

    let url = 'https://ajsliders.com/images/' + props.data.FileName;
    setUrl(url);
  }, []);

  return (
    <div>
      <AddCircleOutline onClick={handleOpen} />

      {/* CUSTOMISED MODAL */}

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {product?.title}
        </DialogTitle>
        <DialogContent dividers>
          <img src={url} alt="Product Image" width={'100%'} />

          {/* PRODUCT MODIFER  ----> Starts */}

          <div className={classes.productMod}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel className={classes.formLabel}>{modifierOptionName}?</FormLabel>
              <FormGroup>
                {modifiers && modifiers
                  ? modifiers.map((data) => {
                      return (
                        <div>
                          <FormControlLabel
                            control={<Checkbox onChange={handleChange} name={data.itemDescription} />}
                            label={data.itemDescription}
                          />
                          <FormLabel>${numberFormatter(data.mod_price)}</FormLabel>
                        </div>
                      );
                    })
                  : null}
              </FormGroup>
            </FormControl>
          </div>

          {/* PRODUCT MODIFER ----> ENDS */}

          <Typography gutterBottom>{product?.fulltext}</Typography>
        </DialogContent>
        <DialogActions>
          <DialogContent style={{ paddingLeft: '40px', fontSize: '1.1rem', fontWeight: '600' }}>
            ${numberFormatter(itemCount * productPrice)}
          </DialogContent>
          <DialogContent>
            <Typography style={{ borderWidth: 2, borderStyle: 'solid', width: '70%' }}>
              <Button onClick={itemMinus}>
                <RemoveIcon fontSize="small" />
              </Button>
              {itemCount}
              <Button onClick={itemAdd}>
                <AddIcon fontSize="small" />
              </Button>
            </Typography>
          </DialogContent>
          <Button autoFocus onClick={() => handleCheckOut(product?.ItemID, itemCount)} color="primary">
            Add to Check
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
