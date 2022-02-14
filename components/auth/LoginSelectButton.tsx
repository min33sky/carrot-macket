import React from 'react';
import { cls } from '../../libs/client/util';

interface ILoginSelectButton {
  method: 'email' | 'phone';
  type: 'email' | 'phone';
  handleLogin: () => void;
  children: React.ReactNode;
}

/**
 * 로그인 페이지에서 로그인 방식을 선택하는 버튼 컴포넌트
 * @param param0
 * @returns
 */
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
