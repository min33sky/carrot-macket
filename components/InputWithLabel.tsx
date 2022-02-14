import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputWithLabel {
  label: string;
  method?: 'email' | 'phone' | 'text' | 'price';
  name?: 'email' | 'phone';
  register: UseFormRegisterReturn;
  required: boolean;
}

/**
 * 라벨이 있는 인풋
 * @param method 'email' | 'phone' | 'text' | 'price'
 * @param label 라벨 이름
 * @returns
 */
function InputWithLabel({ method = 'text', label, register, required }: IInputWithLabel) {
  return (
    <div className="mb-2">
      <label htmlFor={label} className="mb-1 block to-gray-700 text-sm font-medium text-gray-500">
        {label}
      </label>

      {method === 'email' && (
        <input
          id={label}
          type="email"
          {...register}
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          required={required}
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
            {...register}
            className="w-full appearance-none rounded-r-md border border-l-0 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            required={required}
          />
        </div>
      )}

      {method === 'text' && (
        <input
          id={label}
          type="text"
          {...register}
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          required={required}
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
            {...register}
            placeholder="0.00"
            className="w-full appearance-none rounded-md border border-gray-300 py-2 pr-12 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            required={required}
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputWithLabel;
