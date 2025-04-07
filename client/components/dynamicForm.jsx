import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';

const DynamicForm = ({ fields, apiUrl, defaultValues = {}, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    const method = 'POST';
    const url = apiUrl;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      onSuccess && onSuccess(result);
      reset(); // clear form
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ name, label, type }) => (
        <TextField
          key={name}
          label={label || name}
          type={type || 'text'}
          fullWidth
          margin="normal"
          {...register(name, {})}
          defaultValue={defaultValues[name] || ''}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;