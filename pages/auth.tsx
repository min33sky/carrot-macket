import useMutation from '@hooks/useMutation';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import LoginSelectButton from '@components/auth/LoginSelectButton';
import Button from '@components/Button';
import InputWithLabel from '@components/InputWithLabel';
import Layout from '@components/Layout';

interface IForm {
  email?: string;
  phone?: string;
}

interface ITokenForm {
  token: string;
}

interface IMutationResponse {
  success: boolean;
  [key: string]: any;
}

/**
 * 인증 페이지
 * @returns
 */
export default function Auth() {
  const [enter, { data, error, loading }] = useMutation<IMutationResponse>('/api/users/auth');
  const [confirmToken, { data: tokenData, loading: tokenLoading }] =
    useMutation<IMutationResponse>('/api/users/confirm');

  const { register, watch, reset, handleSubmit } = useForm<IForm>();
  // 토큰 입력 전용 폼
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } = useForm<ITokenForm>();

  const [method, setMethod] = useState<'email' | 'phone'>('email');

  const onEmailClick = () => {
    reset();
    setMethod('email');
  };

  const onPhoneClick = () => {
    reset();
    setMethod('phone');
  };

  // console.log(watch());

  const onValid = (validForm: IForm) => {
    if (loading) return;
    enter(validForm);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log('errors: ', errors);
  };

  const onValidToken = (validForm: ITokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  return (
    <Layout hasTabBar>
      <div className="mt-16 px-4">
        <h3 className="text-center text-3xl font-bold">Enter to Carrot</h3>
        <div className="mt-12">
          {data?.success ? (
            <>
              <form onSubmit={tokenHandleSubmit(onValidToken)} className="mt-8 flex flex-col">
                <InputWithLabel
                  register={tokenRegister('token', { required: '토큰을 입력해주세요.' })}
                  label="token"
                  required
                />
                <Button>{loading ? 'Loading...' : 'Input Token'}</Button>
              </form>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h5 className="text-sm font-medium text-gray-500">Enter using:</h5>

                {/* 로그인 방식 선택 */}
                <div className="mt-8 grid w-full grid-cols-2 gap-16 border-b">
                  <LoginSelectButton type="email" method={method} handleLogin={onEmailClick}>
                    Email
                  </LoginSelectButton>
                  <LoginSelectButton type="phone" method={method} handleLogin={onPhoneClick}>
                    Phone
                  </LoginSelectButton>
                </div>
              </div>

              {/* 로그인 폼 */}
              <form onSubmit={handleSubmit(onValid, onInvalid)} className="mt-8 flex flex-col">
                {method === 'email' && (
                  <>
                    <InputWithLabel
                      register={register('email', { required: '이메일 주소를 입력해주세요.' })}
                      label="Email"
                      name="email"
                      method="email"
                      required
                    />
                    <Button>{loading ? 'Loading...' : 'Get Login Link'}</Button>
                  </>
                )}

                {method === 'phone' && (
                  <>
                    <InputWithLabel
                      register={register('phone', { required: '전화번호를 입력해주세요.' })}
                      label="Phone"
                      name="phone"
                      method="phone"
                      required
                    />
                    <Button>{loading ? 'Loading...' : 'Get one-time password'}</Button>
                  </>
                )}
              </form>
            </>
          )}

          {/******************************** 외부 인증 서비스 버튼 **************************************/}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2 text-sm text-gray-500">Or enter with</span>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3 ">
              {/* 트위터 로그인 버튼 */}
              <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 ">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>

              {/* 깃허브 로그인 버튼 */}
              <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 ">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
