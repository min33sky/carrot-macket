import axios from 'axios';
import { useState } from 'react';

type FetchStateType<T> = {
  data?: T;
  error?: object;
  loading: boolean;
};

type UseMutationReturnType<T> = [(data: any) => void, FetchStateType<T>];

/**
 * ! [Deprecated]
 * ! react-query의 useMutation으로 대체함
 */
function useMutation_old<T = any>(path: string): UseMutationReturnType<T> {
  const [fetchState, setFetchState] = useState<FetchStateType<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(data: any) {
    // fetch('/api/users/auth', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    try {
      setFetchState((prev) => ({
        ...prev,
        loading: true,
      }));
      const response = await axios.post(path, data);
      setFetchState((prev) => ({
        ...prev,
        data: response.data,
      }));
    } catch (error: any) {
      setFetchState((prev) => ({
        ...prev,
        error,
      }));
    } finally {
      setFetchState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }

  return [mutation, fetchState];
}

export default useMutation_old;
