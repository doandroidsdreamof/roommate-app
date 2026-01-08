import { useState } from 'react';
import z from 'zod';

interface IStructuredErrors {
  path: (string | number)[];
  message: string;
}

export default function useValidation<T>(schema: z.Schema<T>) {
  const [errors, setErrors] = useState<IStructuredErrors[] | null>(null);

  const validate = (data: unknown): boolean => {
    try {
      schema.parse(data);
      setErrors(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const structuredErrors = error.issues.map((item) => ({
          path: item.path as (string | number)[],
          message: item.message,
        }));
        setErrors(structuredErrors);
      }
      return false;
    }
  };

  const clearErrors = () => setErrors(null);

  return { validate, clearErrors, errors };
}
