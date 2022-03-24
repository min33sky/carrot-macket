import ChatMessage from '@components/chats/ChatMessage';
import Layout from '@components/Layout';
import useUser from '@hooks/useUser';
import { Stream } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface StreamWithMessages extends Stream {
  messages: {
    id: number;
    user: {
      id: number;
      avatar: string | null;
    };
    message: string;
  }[];
}

interface IStreamResponse {
  success: boolean;
  stream: StreamWithMessages;
}

interface IMessageForm {
  message: string;
}

/**
 * 방송 정보 가져오기
 * @param streamId
 * @returns
 */
export async function getStreamById(streamId: string | string[] | undefined) {
  if (typeof streamId === 'string') {
    const { data } = await axios.get(`/api/streams/${streamId}`);
    return data;
  }
  throw new Error('streamId is invalid.');
}

type MessageVariableType = {
  streamId: string;
  formData: IMessageForm;
};

/**
 * 메세지 전송
 * @param param0
 * @returns
 */
export async function createMessage({ streamId, formData }: MessageVariableType) {
  const { data } = await axios.post(`/api/streams/${streamId}/message`, formData);
  return data;
}

/**
 * 상품 방송 페이지
 * @returns
 */
function StreamDetail() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData } = useUser();

  const { register, handleSubmit, reset } = useForm<IMessageForm>();

  /**
   * 스트리밍 페이지 정보 가져오기 훅
   */
  const { data, isLoading } = useQuery<IStreamResponse, Error, IStreamResponse>(
    ['stream', router.query.id],
    () => getStreamById(router.query.id),
    {
      onSuccess: (data) => {
        console.log('스트림 로드 성공!!', data);
      },
      onError: (err) => {
        console.log('에러 발생!!!', err);
      },
      enabled: !!router.query.id,
      refetchInterval: 1000, //! Serverless는 실시간 구현이 안되므로 1초마다 요청하는 식으로 해결
    }
  );

  /**
   * 채팅 메세지 전송 훅
   */
  const { mutate, isLoading: isMessageLoading } = useMutation<
    IStreamResponse,
    AxiosError,
    MessageVariableType
  >((variable) => createMessage(variable), {
    //* 최대한 실시간식으로 구현하기 위해 Optimistic UI를 적용
    onMutate: async (data) => {
      await queryClient.cancelQueries(['stream', router.query.id]);

      const previousStreamData: IStreamResponse | undefined = queryClient.getQueryData([
        'stream',
        router.query.id,
      ]);

      queryClient.setQueryData<IStreamResponse | undefined>(
        ['stream', router.query.id],
        (oldQueryData: IStreamResponse | undefined) => {
          if (!oldQueryData) return undefined;

          return {
            ...oldQueryData,
            stream: {
              ...oldQueryData.stream,
              messages: [
                ...oldQueryData.stream.messages,
                {
                  id: Date.now(),
                  message: data.formData.message,
                  user: {
                    id: userData?.profile.id,
                    avatar: userData?.profile.avatar,
                  } as any,
                },
              ],
            },
          };
        }
      );

      return previousStreamData;
    },
    onSuccess: (data) => {
      console.log('성공 메세지: ', data);
    },
    onError: (err, variable, context) => {
      console.log('에러 발생: ', err);
      queryClient.setQueryData(['stream', router.query.id], context);
    },
    onSettled: () => {
      //? 쿼리 무효화해서 다시 채팅 메세지 로드하기
      queryClient.invalidateQueries(['stream', router.query.id]);
    },
  });

  /**
   * 메세지 전송 핸들러
   * @param formData
   * @returns
   */
  const onValid: SubmitHandler<IMessageForm> = (formData) => {
    if (isMessageLoading) return;
    if (!router.query.id) return;
    mutate({
      streamId: router.query.id?.toString(),
      formData,
    });
    reset();
  };

  return (
    <Layout canGoBack title="XXX 상품 채팅방">
      <div className="space-y-4 py-10  px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data ? data.stream.name : 'Loading'}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">${data ? data.stream.price : 0}</span>
          <p className=" my-6 text-gray-700">{data ? data.stream.description : 'Loading'}</p>
        </div>

        {/* 채팅창 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>

          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
            {data?.stream.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.message}
                reversed={userData?.profile.id === message.user.id}
              />
            ))}
          </div>

          {/* 채팅 입력 폼 */}
          <form
            onSubmit={handleSubmit(onValid)}
            className="fixed inset-x-0 bottom-0  bg-white py-2"
          >
            <div className="relative mx-auto flex w-full  max-w-md items-center">
              <input
                type="text"
                {...register('message', { required: true })}
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export default StreamDetail;
