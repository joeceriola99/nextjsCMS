import React, { FC } from 'react';
import { FormProvider } from 'react-hook-form';

interface FormProps {
  provider: any;
  onSubmit: any;
  children: React.ReactNode;
}
export const Form: FC<FormProps> = ({ provider, onSubmit, children }) => {
  const { handleSubmit } = provider;
  return (
    <FormProvider {...provider}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
