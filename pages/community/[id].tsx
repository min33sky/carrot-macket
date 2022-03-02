import Button from '@components/Button';
import Layout from '@components/Layout';
import TextareaWithLabel from '@components/TextareaWithLabel';
import { getCommunityPostById } from '@libs/client/communityApi';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

interface IAnswerWriteFrom {
  answer: string;
}

interface ICommunityPostResponse {
  success: true;
  question: IQuestion;
}

interface IQuestion extends Post {
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  answers: {
    user: {
      id: number;
      name: string;
      avatar: string | null;
    };
    id: number;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  _count: {
    answers: number;
    curiosities: number;
  };
}

/**
 * 동네 질문 상세 페이지
 * @returns
 */
function CommunityDetail() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IAnswerWriteFrom>();

  const { data, isLoading } = useQuery<ICommunityPostResponse, Error, ICommunityPostResponse>(
    ['community_question', router.query.id],
    () => getCommunityPostById(router.query.id),
    {
      onSuccess: (data) => {
        console.log('질문 데이터를 성공적으로 가져왔습니다. ', data);
      },
      onError: (data) => {
        console.log('에러에러~~~', data);
      },
      enabled: !!router.query.id,
    }
  );

  const onValid = (formData: IAnswerWriteFrom) => {
    // TODO: 로딩 시 처리
  };

  return (
    <Layout canGoBack hasTabBar title="동네 질문">
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>

        {/* 작성자 프로필 */}
        <div className="mb-3 flex cursor-pointer items-center space-x-3 border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data ? data.question.user.name : 'Loading...'}
            </p>
            <p className="text-xs font-medium text-gray-500">프로필 보기 &rarr;</p>
          </div>
        </div>

        {/* 질문 내용 */}
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span>{' '}
            {data ? data.question.question : 'Loading...'}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  text-gray-700">
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
              <span>궁금해요 {data ? data.question._count.curiosities : 0}</span>
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
              <span>답변 {data ? data.question._count.answers : 0}</span>
            </span>
          </div>
        </div>

        {/* 답변  */}
        <div className="my-5 space-y-5 px-4">
          {data?.question.answers.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">{answer.user.name}</span>
                <span className="block text-xs text-gray-500 ">{answer.updatedAt}</span>
                <p className="mt-2 text-gray-700">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 댓글 입력 폼 */}
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextareaWithLabel
            register={register('answer', { required: true, minLength: 5 })}
            placeholder="소중한 답변 부탁드립니다..."
          />
          <Button>댓글 작성</Button>
        </form>
      </div>
    </Layout>
  );
}

export default CommunityDetail;
