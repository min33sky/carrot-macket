import Button from '@components/Button';
import InputWithLabel from '@components/InputWithLabel';
import Layout from '@components/Layout';
import TextareaWithLabel from '@components/TextareaWithLabel';
import { Stream } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IStreamForm {
  name: string;
  price: number;
  description: string;
}

interface IStreamResponse {
  success: boolean;
  stream: Stream;
}

/**
 * 방송 생성 요청 API
 * @param formData
 * @returns
 */
export async function createStream(formData: IStreamForm) {
  const { data } = await axios.post(`/api/streams`, formData);
  return data;
}

/**
 * 방송 시작하기 페이지
 * @returns
 */
function Create() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IStreamForm>();
  const { mutate, isLoading } = useMutation<IStreamResponse, AxiosError, IStreamForm>(
    (formData) => createStream(formData),
    {
      onSuccess: (data) => {
        console.log('방송 생성 성공');
        router.replace(`/streams/${data.stream.id}`);
      },
      onError: (err) => {
        console.log('에러발생....', err);
      },
    }
  );

  const onValid: SubmitHandler<IStreamForm> = (data) => {
    if (isLoading) return;
    mutate(data);
  };

  return (
    <Layout canGoBack hasTabBar title="방송 시작하기">
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 py-10 px-4">
        <InputWithLabel
          label="Name"
          placeholder="방송 제목을 입력해주세요."
          register={register('name', { required: true })}
        />

        <InputWithLabel
          label="Price"
          method="price"
          register={register('price', { required: true, valueAsNumber: true })}
        />

        <TextareaWithLabel
          label="Description"
          name="Description"
          placeholder="방송 설명을 작성해주세요."
          register={register('description', { required: true })}
        />

        <Button>{isLoading ? 'Loading...' : '방송 시작하기'}</Button>
      </form>
    </Layout>
  );
}

export default Create;
