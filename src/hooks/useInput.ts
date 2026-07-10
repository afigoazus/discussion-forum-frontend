import React, { useState } from 'react';

export default function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(target.value);
  }

  return [value, handleValueChange, setValue] as const;
}
