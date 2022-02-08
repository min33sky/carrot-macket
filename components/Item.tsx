import Link from 'next/link';
import React from 'react';

interface IItem {
  id: number;
  title: string;
  price: number;
  comments: number;
  hearts: number;
}

/**
 * 상품 리스트 아이템
 * @param param0
 * @returns
 */
function Item({ id, title, price, comments, hearts }: IItem) {
  return (
    <Link href={`/items/${id}`}>
      <a className="flex cursor-pointer justify-between px-4 pt-5">
        <div className="flex space-x-4">
          {/* 이미지 들어갈 곳 */}
          <div className="h-20 w-20 rounded-md bg-gray-400" />

          {/* 제품 설명 */}
          <div className="flex flex-col pt-2">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500">Black</span>
            <span className="mt-1 font-medium text-gray-900">${price}</span>
          </div>
        </div>

        <div className="flex items-end justify-end space-x-1.5">
          {/* 좋아요 수 */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>

          {/* 댓글 개수 */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>{comments}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Item;
