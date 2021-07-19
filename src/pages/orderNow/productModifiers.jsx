import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const [modifiers, setModifiers] = useState(null);
  const maxLimit = props.data?.maxSelect;

  useEffect(async () => {
    console.log(props.data?.subModDetails);
    setModifiers(props.data?.subModDetails);
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          {modifiers && modifiers
            ? modifiers.map((data) => {
                return (
                  <div>
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} name={data.itemDescription} />}
                      label={data.itemDescription}
                    />
                    <FormLabel>$ {data.mod_price}</FormLabel>
                  </div>
                );
              })
            : null}
        </FormGroup>
        <FormHelperText>Total Value</FormHelperText>
      </FormControl>
    </div>
  );
}
