import React from 'react';

interface ITextAreaWithLabel {
  label?: string;
  name?: string;
  placeholder?: string;
  [key: string]: any;
}

function TextareaWithLabel({ label, name, placeholder, ...rest }: ITextAreaWithLabel) {
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
        {...rest}
      />
    </div>
  );
}

export default TextareaWithLabel;
