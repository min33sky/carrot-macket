import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextAreaWithLabel {
  label?: string;
  name?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

function TextareaWithLabel({ label, name, placeholder, register, ...rest }: ITextAreaWithLabel) {
  return (
    <div>
      {label ? (
        <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
        placeholder={placeholder}
        rows={4}
        {...register}
        {...rest}
      />
    </div>
  );
}

export default TextareaWithLabel;
