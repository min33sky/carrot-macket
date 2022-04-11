import { IGetMyStatus } from '@hooks/useUser';
import { getMyStatus } from '@libs/client/fetcher';
import { cls, loadImageByID } from '@libs/client/util';
import { withSsrSession } from '@libs/server/withSession';
import { Review } from '@prisma/client';
import axios from 'axios';
import { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout';

interface IReviewWithUser extends Review {
  createdBy: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

interface IReviewsResponse {
  success: boolean;
  reviews: IReviewWithUser[];
}

export async function getReviews() {
  const { data } = await axios.get('http://localhost:3000/api/reviews');
  return data;
}

function Profile(props: any) {
  const { data: userData, isLoading } = useQuery<IGetMyStatus>('myStatus', getMyStatus, {
    initialData: { success: true, profile: props.profile },
  });

  const { data: reviewsData, isLoading: isReviewLoading } = useQuery<
    IReviewsResponse,
    Error,
    IReviewsResponse
  >('getReviews', getReviews, {
    initialData: {
      success: true,
      reviews: props.reviews,
    },
  });

  console.log(reviewsData);
  console.log('user: ', userData);
  console.log('isReviewLoading: ', isReviewLoading);
  console.log('isLoading: ', isLoading);

  return (
    <Layout hasTabBar title="나의 당근">
      <div className="py-10 px-4">
        <div className="flex items-center space-x-3">
          {userData?.profile?.avatar ? (
            <Image
              width={64}
              height={64}
              src={loadImageByID(userData.profile?.avatar, { type: 'avatar' })}
              className="rounded-full bg-slate-500"
              alt="avatar"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-slate-500" />
          )}

          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {isLoading ? 'Loading...' : userData?.profile?.name}
            </span>
            <Link href={`/profile/edit`}>
              <a className="text-sm text-gray-700 transition-all hover:text-orange-800">
                프로필 수정 &rarr;
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-10 flex justify-around">
          {/* 판매 내역 */}
          <Link href={`/profile/sold`}>
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white transition-colors hover:bg-orange-500">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">판매내역</span>
            </a>
          </Link>

          {/* 구매 내역 */}
          <Link href={`/profile/bought`}>
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white transition-colors hover:bg-orange-500">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">구매내역</span>
            </a>
          </Link>

          {/* 관심 목록 */}
          <Link href={`/profile/loved`}>
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white transition-colors hover:bg-orange-500">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">관심목록</span>
            </a>
          </Link>
        </div>

        {/* 리뷰 목록 */}
        {reviewsData
          ? reviewsData?.reviews?.map((review) => (
              <div key={review.id} className="mt-12">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-slate-500" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{review.createdBy.name}</h4>

                    {/* 평점 표시 */}
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <svg
                          key={score}
                          className={cls(
                            'h-5 w-5',
                            score <= review.rating ? 'text-yellow-400' : 'text-gray-400'
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          : 'Loading...........................................................'}
      </div>
    </Layout>
  );
}

export default Profile;

export const getServerSideProps = withSsrSession(async function ({ req }: NextPageContext) {
  const profile = await client?.user.findUnique({
    where: { id: req?.session.user?.id },
  });

  const reviews = await client?.review.findMany({
    where: {
      createdForId: req?.session.user?.id,
    },
    // 리뷰 작성자 정보도 가져오기
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
});
