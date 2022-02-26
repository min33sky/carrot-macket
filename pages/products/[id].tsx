import { Product } from '@prisma/client';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import Button from '@components/Button';
import Layout from '@components/Layout';

export interface IProductResponse {
  success: boolean;
  product: IProductWithUser;
}

interface IProductWithUser extends Product {
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
}

/**
 * 상품 상세 페이지
 * @returns
 */
function ProductDetail() {
  const router = useRouter();

  const { data, isLoading } = useQuery<
    AxiosResponse<IProductResponse>,
    AxiosError,
    IProductWithUser
  >(['product', router.query.id], () => axios.get(`/api/products/${router.query.id}`), {
    onSuccess: (data) => {
      console.log('상품이 성공적으로 로드되었습니다.');
    },
    //? 쿼리 결과값을 변형시킬 수 있다.
    select: (data) => {
      return data.data.product;
    },
    //? URL query가 존재할 때 쿼리 요청을 한다.
    enabled: !!router.query.id,
  });

  return (
    <Layout canGoBack hasTabBar title="제품 상세보기">
      <Head>
        <title>{data ? data.name : '상품'} 페이지</title>
      </Head>

      <div className="p-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex items-center space-x-3 border-t border-b py-3">
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data ? data.user.username : 'Loading...'}
              </p>
              <Link href={`/users/profile/${data?.user.username}`}>
                <a className="text-sm font-medium text-gray-700">View profile &rarr;</a>
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{data ? data.name : 'Loading...'}</h1>
            <span className="mt-3 block text-2xl text-gray-900">
              ${data ? data.price : 'Loading...'}
            </span>
            <p className="my-6 text-gray-700">{data ? data.description : 'Loading...'}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large>Talk to seller</Button>
              <button className="flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="mb-4 h-56 w-full bg-slate-300" />
                <h3 className="-mb-1 text-gray-700">Galaxy S60</h3>
                <p className="text-sm font-medium text-gray-900">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
