import Button from '@components/Button';
import InputWithLabel from '@components/InputWithLabel';
import useUser, { IGetMyStatus } from '@hooks/useUser';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Layout from '../../components/Layout';

interface IEditForm {
  phone?: string;
  email?: string;
  name?: string;
  avatar?: FileList;
  avatarId?: string;
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
    watch,
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

  /**
   *? 프로필 이미지 업로드
   */

  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');

  useEffect(() => {
    let url: string = '';
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      //? 객체를 가리키는 URL을 DOMString으로 반환
      url = URL.createObjectURL(file);
      setAvatarPreview(url);

      // FileReader 테스트
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   console.log('하하: ', e.target?.result);
      // };
      // reader.readAsDataURL(file);
      // console.log('reader: ', reader);
    }

    return () => {
      //? 메모리 관리를 위해 이전에 생성한 객체 URL을 해제한다.
      URL.revokeObjectURL(url);
    };
  }, [avatar]);

  /**
   * ? 유저 정보로 폼을 초기화한다.
   */
  useEffect(() => {
    if (data) {
      setValue('email', data.profile.email);
      setValue('phone', data.profile.phone);
      setValue('name', data.profile.name);
      if (data.profile.avatar) {
        // 이미지 주소 등록하기
        setAvatarPreview(
          `https://imagedelivery.net/deOyHLPsiQ-RAS-wtCRaWQ/${data.profile.avatar}/public`
        );
      }
    }
  }, [data, setValue]);

  /**
   * 프로필 업데이트 폼 핸들러
   * @param param0
   * @returns
   */
  const onValid: SubmitHandler<IEditForm> = async ({ email, phone, name, avatar }) => {
    if (isLoading) return;

    if ((!email || !email.trim()) && !phone && !phone?.trim()) {
      return setError('formErrors', {
        type: 'required',
        message: 'Email이나 Phone 둘 중 하나는 반드시 입력해야 합니다!',
      });
    }

    if (avatar && avatar.length > 0) {
      //* Cloudflare에 이미지를 업로드 할 수 있는 URL을 요청한다.
      const { uploadURL } = await axios
        .get('/api/files')
        .then((res) => res.data)
        .catch((err) => console.log('이미지 URL 받기 실패'));

      //* 이미지 업로드를 위한 FormData를 생성한다.
      const form = new FormData();
      form.append('file', avatar[0], String(data?.profile.id));

      //* 이미지를 Cloudflare에 업로드 후 이미지의 ID를 받아서 DB에 저장한다.
      const {
        result: { id },
      } = await axios.post(uploadURL, form).then((res) => res.data);

      mutate({
        email,
        phone,
        name,
        avatarId: id,
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
          {avatarPreview ? (
            <img src={avatarPreview} className="h-14 w-14 rounded-full bg-slate-500" />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Avatar Image Change
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
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
