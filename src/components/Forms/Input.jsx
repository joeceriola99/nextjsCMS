import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField as BaseInput, Typography, InputAdornment } from '@material-ui/core';

export const Input = ({
  id = '',
  name,
  autoFocus = false,
  type = 'text',
  variant = '',
  readOnly = false,
  autoMargin = true,
  autoShrink,
  endAdornment = null,
  ...props
}) => {
  const { register, errors } = useFormContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <BaseInput
        InputProps={{
          endAdornment: endAdornment,
        }}
        variant={variant || 'standard'}
        inputRef={(e) => {
          register(e);
          inputRef.current = e;
        }}
        inputProps={{
          readOnly: readOnly,
          endAdornment: endAdornment,
        }}
        InputLabelProps={{
          shrink: autoShrink,
        }}
        type={type}
        name={name}
        style={{ width: '100%', margin: '0.6rem 0rem' }}
        {...props}
      />
      {errors[name] && (
        <Typography style={{ color: 'red' }} variant="subtitle2">
          {errors[name].message}
        </Typography>
      )}
    </>
  );
};
