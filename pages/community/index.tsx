import { getAllCommunityPosts } from '@libs/client/communityApi';
import { Post } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import FloatingButton from '../../components/FloatingButton';
import Layout from '../../components/Layout';
import useCoords from '@hooks/useCoords';

interface IPostWithCounts extends Post {
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  _count: {
    answers: number;
    curiosities: number;
  };
}

export interface IPostsResponse {
  success: boolean;
  posts: IPostWithCounts[];
}

/**
 * 동네생활 페이지
 * @returns
 */
function Community() {
  const { latitude, longitude } = useCoords();

  const { data, isLoading } = useQuery<IPostsResponse, Error, IPostsResponse>(
    ['AllCommunityPosts', latitude, longitude],
    () => getAllCommunityPosts(latitude, longitude),
    {
      enabled: !!latitude,
    }
  );

  return (
    <Layout hasTabBar title="동네생활">
      <div className="space-y-8 divide-y-[2px]">
        {data?.posts.map((post) => (
          <Link key={post.id} href={`/community/${post.id}`}>
            <a className="flex cursor-pointer flex-col items-start">
              <span className="ml-4 flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                동네질문
              </span>
              <span className="mt-2 px-4 text-gray-700">
                <span className="font-medium text-orange-500">Q.</span> {post.question}
              </span>
              <div className="mt-5 flex w-full items-center justify-between px-4 text-xs font-medium text-gray-500">
                <span>{post.user.name}</span>
                <span>{post.updatedAt}</span>
              </div>
              <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5 text-gray-700">
                <span className="flex items-center space-x-2 text-sm">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>궁금해요 {post._count.curiosities}</span>
                </span>

                <span className="flex items-center space-x-2 text-sm">
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
                  <span>답변 {post._count.answers}</span>
                </span>
              </div>
            </a>
          </Link>
        ))}

        <FloatingButton type="community" path="/community/write" />
      </div>
    </Layout>
  );
}

export default Community;
