import { Post } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import TextareaWithLabel from '../../components/TextareaWithLabel';

interface IWriteForm {
  question: string;
}

export async function writeQuestion(formData: IWriteForm) {
  const { data } = await axios.post(`/api/post`, formData);
  return data;
}

interface IWriteResponse {
  success: boolean;
  post: Post;
}

/**
 * 동네 생활 글쓰기
 * @returns
 */
function Write() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IWriteForm>();
  const { mutate, isLoading } = useMutation<IWriteResponse, Error, IWriteForm>(
    (formData) => writeQuestion(formData),
    {
      onSuccess: (data) => {
        console.log('성공!!', data);
        router.replace(`/community/${data.post.id}`);
      },
    }
  );

  const onValid = (formData: IWriteForm) => {
    if (isLoading) return;
    mutate(formData);
  };

  return (
    <Layout hasTabBar canGoBack title="동네생활 글쓰기">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 p-4">
        <TextareaWithLabel
          register={register('question', { required: true, minLength: 5 })}
          placeholder="무엇이든 물어보세요 :)"
        />
        <Button>제출하기</Button>
      </form>
    </Layout>
  );
}

export default Write;
