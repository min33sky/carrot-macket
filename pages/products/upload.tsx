import Button from '@components/Button';
import InputWithLabel from '@components/InputWithLabel';
import Layout from '@components/Layout';
import TextareaWithLabel from '@components/TextareaWithLabel';
import { Product } from '@prisma/client';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IUploadForm {
  // image: string;
  name: string;
  price: number;
  description: string;
}

interface IUploadResponse {
  success: boolean;
  product: Product;
}

/**
 * 상품 업로드 페이지
 * @returns
 */
function Upload() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<IUploadForm>();
  const { mutate, isLoading } = useMutation<
    AxiosResponse<IUploadResponse>,
    AxiosError,
    IUploadForm
  >((formData) => axios.post('/api/products', formData), {
    onSuccess: ({ data: { product } }) => {
      router.replace(`/products/${product.id}`);
    },
    onError: (data) => {
      console.log('업로드 실패: ', data);
    },
  });

  const onValid = (formData: IUploadForm) => {
    if (isLoading) return;
    mutate(formData);
  };

  return (
    <Layout hasTabBar canGoBack title="상품 업로드">
      <form className="space-y-5 px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <div>
          <label
            className="
              flex h-48 w-full cursor-pointer
              items-center justify-center rounded-md
              border-2 border-dashed border-gray-300 text-gray-600
              hover:border-orange-500 hover:text-orange-500"
          >
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>

        <InputWithLabel label="Name" register={register('name', { required: true })} />
        <InputWithLabel
          label="price"
          method="price"
          register={register('price', { required: true })}
        />

        <TextareaWithLabel
          label="Description"
          name="description"
          register={register('description', { required: true })}
          placeholder="상품에 대한 설명을 작성해주세요."
        />

        <Button>{isLoading ? 'Loading' : 'Upload Item'}</Button>
      </form>
    </Layout>
  );
}

export default Upload;
