import React from 'react';

interface IInputWithLabel {
  label: string;
  method?: 'email' | 'phone' | 'text' | 'price';
  [key: string]: any;
}

function InputWithLabel({ method = 'text', label, ...rest }: IInputWithLabel) {
  return (
    <>
      <label htmlFor={label} className="mb-1 block to-gray-700 text-sm font-medium">
        {label.toUpperCase()}
      </label>

      {method === 'email' && (
        <input
          id={label}
          type="email"
          {...rest}
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          required
        />
      )}

      {method === 'phone' && (
        <div className="flex shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-300 px-3 text-sm text-gray-500">
            +82
          </span>

          <input
            id={label}
            type="number"
            {...rest}
            className="w-full appearance-none rounded-r-md border border-l-0 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            required
          />
        </div>
      )}
    </>
  );
}

export default InputWithLabel;
