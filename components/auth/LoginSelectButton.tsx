import React from 'react';
import { cls } from '../../libs/client/util';

interface ILoginSelectButton {
  method: 'email' | 'phone';
  type: 'email' | 'phone';
  handleLogin: () => void;
  children: React.ReactNode;
}

function LoginSelectButton({ method, type, handleLogin, children }: ILoginSelectButton) {
  return (
    <button
      className={cls(
        'border-b-2 pb-4 text-sm font-medium',
        `${
          type === method
            ? 'border-orange-500 text-orange-400'
            : 'border-transparent text-gray-500 hover:text-gray-400'
        } `
      )}
      onClick={handleLogin}
    >
      {children}
    </button>
  );
}

export default LoginSelectButton;
