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
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../redux/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const router = useRouter();
  const classes = stylesMain();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [product, setProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [modifiers, setModifiers] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [modifierOptionName, setModifierOptionName] = useState();
  const [extraCost, setExtraCost] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, cost) => {
    let val = 0;
    if (event.target.checked == true) {
      val = +extraCost + +cost;
    } else {
      val = +extraCost - +cost;
    }
    setExtraCost(numberFormatter(+val));
  };

  const handleCheckOut = (id, url, title, count, totalVal) => {
    let userid = Cookies.get('userID');
    console.log(url, title);
    if (userid) {
      if (Cookies.get('cartData')) {
        let existingData = JSON.parse(Cookies.get('cartData'));
        let insert = {
          productID: id,
          productName: title,
          url: url,
          quantity: count,
          cost: totalVal,
        };
        existingData.push(insert);
        JSON.stringify(Cookies.set('cartData', existingData));
        dispatch(addtoCart(count));
        handleClose();
        toast.success('Added to cart');
      } else {
        JSON.stringify(
          Cookies.set('cartData', [
            {
              productID: id,
              productName: title,
              url: url,
              quantity: count,
              cost: totalVal,
            },
          ]),
        );
        dispatch(addtoCart(count));
        handleClose();
        toast.success('Added to cart');
      }
    } else {
      router.push('auth/login');
    }
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        draggable
        pauseOnHover
      />
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
                            control={
                              <Checkbox onChange={(e) => handleChange(e, data.mod_price)} name={data.itemDescription} />
                            }
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
            ${numberFormatter(itemCount * (+productPrice + +extraCost))}
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
          <Button
            autoFocus
            onClick={() =>
              handleCheckOut(
                product?.ItemID,
                url,
                product?.title,
                itemCount,
                numberFormatter(itemCount * (+productPrice + +extraCost)),
              )
            }
            color="primary"
          >
            Add to Check
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
