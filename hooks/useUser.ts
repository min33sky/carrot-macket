import { getMyStatus } from '@libs/client/fetcher';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export interface IGetMyStatus {
  success: boolean;
  profile: IProfile;
}

export interface IProfile {
  id: number;
  phone: null;
  email: string;
  name: string;
  avatar: null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 내 정보를 가져오는 훅
 * @returns
 */
function useUser(): {
  data?: IGetMyStatus;
  isLoading: boolean;
} {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<IGetMyStatus>('myStatus', getMyStatus, {
    retry: false, //? 쿼리 실패시 재시도하지 않는다.
  });

  console.log('isLoading', isLoading, isError, error);

  if (isError) {
    router.replace('/auth');
  }

  return { data, isLoading };
}

export default useUser;
