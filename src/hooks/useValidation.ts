import { useState } from 'react';
import z from 'zod';

interface IStructuredErrors {
  path: (string | number)[];
  message: string;
}

export default function useValidation<T>(schema: z.Schema<T>) {
  const [errors, setErrors] = useState<IStructuredErrors[] | null>(null);
  const validate = (data: unknown): T | null => {
    try {
      const parsedData = schema.parse(data);
      setErrors(null);
      return parsedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const structuredErrors = error.issues.map((item) => {
          return {
            path: item.path as (string | number)[],
            message: item.message,
          };
        });
        setErrors(structuredErrors);
      }
      return null;
    }
  };

  const clearErrors = () => setErrors(null);
  return { validate, clearErrors, errors };
}
