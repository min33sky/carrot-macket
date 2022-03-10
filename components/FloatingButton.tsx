import { useRouter } from 'next/router';
import React from 'react';

interface IFloatingButton {
  type: 'product' | 'community' | 'stream';
  path: string;
}

/**
 * 플로팅 버튼
 * @param path{string} 이동할 주소
 * @returns
 */
function FloatingButton({ path, type }: IFloatingButton) {
  const router = useRouter();

  const handleRouter = () => router.push(`${path}`);

  return (
    <button
      onClick={handleRouter}
      className="fixed bottom-24 right-5 cursor-pointer rounded-full bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500"
    >
      {type === 'product' && (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      )}

      {type === 'community' && (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      )}

      {type === 'stream' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

export default FloatingButton;
