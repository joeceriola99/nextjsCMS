import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputGroup } from '@paljs/ui/Input';
import styled from 'styled-components';

const InputContainer = styled(InputGroup)`
  margin-bottom: 10px;
`;

export interface FormTextInputProps {
  id?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  label?: string;
  type?: string;
  variant?: string;
  onFocus?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  className?: string;
}

export const Input: FunctionComponent<FormTextInputProps | any> = ({
  id = '',
  name,
  autoFocus = false,
  type = 'text',
  variant = '',
  className = '',
  ...props
}) => {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  console.log(errors[name]);

  return (
    <>
      <InputContainer size="Medium" shape="Rectangle" fullWidth>
        <input
          variant={variant || 'outlined'}
          type={type}
          name={name}
          autoFocus={false}
          style={{ width: '100%' }}
          className={className}
          {...register(name)}
          {...props}
        />
      </InputContainer>
      {errors[name] && <p style={{ color: 'red' }}>{errors[name].message}</p>}
    </>
  );
};
