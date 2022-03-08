import Button from '@components/Button';
import InputWithLabel from '@components/InputWithLabel';
import useUser, { IGetMyStatus } from '@hooks/useUser';
import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Layout from '../../components/Layout';

interface IEditForm {
  phone?: string;
  email?: string;
  name?: string;
  formErrors?: string;
}

interface IProfileError {
  success: boolean;
  message: string;
}

export async function updateProfile(formData: IEditForm) {
  const { data } = await axios.post('/api/users/me', formData);
  return data;
}

/**
 * 프로필 수정 페이지
 * @returns
 */
function EditProfile() {
  const { data } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IEditForm>();

  const { mutate, isLoading } = useMutation<IGetMyStatus, AxiosError<IProfileError>, IEditForm>(
    (formData) => updateProfile(formData),
    {
      onSuccess: (data) => {
        console.log('변경 성공: ', data);
      },
      onError: (err) => {
        setError('formErrors', {
          message: err.response?.data.message,
        });
      },
    }
  );

  useEffect(() => {
    //? 유저 정보로 폼을 초기화한다.
    if (data) {
      setValue('email', data.profile.email);
      setValue('phone', data.profile.phone);
      setValue('name', data.profile.name);
    }
  }, [data, setValue]);

  const onValid: SubmitHandler<IEditForm> = ({ email, phone, name }) => {
    if (isLoading) return;

    if ((!email || !email.trim()) && !phone && !phone?.trim()) {
      setError('formErrors', {
        type: 'required',
        message: 'Email이나 Phone 둘 중 하나는 반드시 입력해야 합니다!',
      });
    } else {
      mutate({
        email,
        phone,
        name,
      });
    }
  };

  return (
    <Layout canGoBack title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input id="picture" type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        <InputWithLabel
          register={register('name', { onChange: () => clearErrors('formErrors') })}
          method="text"
          label="Name"
          placeholder="이름를 입력해주세요."
        />

        <InputWithLabel
          register={register('email', { onChange: () => clearErrors('formErrors') })}
          name="email"
          method="email"
          label="Email"
          placeholder="이메일 주소를 입력해주세요."
        />

        <InputWithLabel
          register={register('phone', { onChange: () => clearErrors('formErrors') })}
          name="phone"
          method="phone"
          label="Phone"
          placeholder="전화번호를 입력해주세요."
        />

        <span className="block animate-bounce text-sm font-medium text-red-500">
          {errors.formErrors?.message}
        </span>

        <Button>{isLoading ? 'Loading...' : '프로필 업데이트'}</Button>
      </form>
    </Layout>
  );
}

export default EditProfile;
