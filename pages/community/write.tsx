import Button from '@components/Button';
import Layout from '@components/Layout';
import TextareaWithLabel from '@components/TextareaWithLabel';
import { IWriteForm, writeQuestion } from '@libs/client/communityApi';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldError, SubmitErrorHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IWriteForm>();
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
    console.log('성공');
    // mutate(formData);
  };

  const onInvalid: SubmitErrorHandler<IWriteForm> = (error) => {
    console.log('에러: ', error);
    setError('question', {
      type: error.question?.type,
      message: error.question?.message,
    });
  };

  return (
    <Layout hasTabBar canGoBack title="동네생활 글쓰기">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-4 p-4">
        <TextareaWithLabel
          register={register('question', {
            required: true,
            pattern: {
              value: /^[\w\d]+/,
              message: 'noBlank',
            },
          })}
          placeholder="무엇이든 물어보세요 :)"
        />
        {errors.question && <p className="">{errors.question.message}</p>}
        <Button>제출하기</Button>
      </form>
    </Layout>
  );
}

export default Write;
