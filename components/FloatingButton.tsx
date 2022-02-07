import React from 'react';

/**
 * 플로팅 버튼
 * @returns
 */
function FloatingButton() {
  return (
    <button className="fixed bottom-24 right-5 cursor-pointer rounded-full bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500">
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
    </button>
  );
}

export default FloatingButton;
