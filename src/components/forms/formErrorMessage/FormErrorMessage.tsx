import React from 'react';
import { FieldError } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

interface FormErrorMessageProps {
  error?: FieldError;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  if (!error) return null;

  return (
    <HelperText type="error" visible={true}>
      {error.message}
    </HelperText>
  );
};

export default FormErrorMessage;
