import React from 'react';

interface IInputWithLabel {
  label: string;
  method?: 'email' | 'phone' | 'text' | 'price';
  [key: string]: any;
}

/**
 * 라벨이 있는 인풋
 * @param method 'email' | 'phone' | 'text' | 'price'
 * @param label 라벨 이름
 * @returns
 */
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

      {method === 'text' && (
        <input
          id={label}
          type="text"
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          required
        />
      )}

      {method === 'price' && (
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            id={label}
            type="number"
            placeholder="0.00"
            className="w-full appearance-none rounded-md border border-gray-300 py-2 pr-12 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      )}
    </>
  );
}

export default InputWithLabel;
