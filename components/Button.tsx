import React from 'react';
import { cls } from '../libs/util';

interface IButton {
  children: React.ReactNode;
  large?: boolean;
  [key: string]: any;
}

/**
 * 당근 색상의 버튼
 * @param param0
 * @returns
 */
function Button({ children, large, ...rest }: IButton) {
  return (
    <button
      {...rest}
      className={cls(
        large ? 'py-3 text-base' : 'py-2 text-sm',
        'w-full rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
      )}
    >
      {children}
    </button>
  );
}

export default Button;
