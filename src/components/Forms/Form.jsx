import React from 'react';
import { FormProvider, UseFormMethods } from 'react-hook-form';

export default function Form({ provider, onSubmit, children }) {
  const { handleSubmit } = provider;
  return (
    <FormProvider {...provider}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
