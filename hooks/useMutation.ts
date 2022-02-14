import axios from 'axios';
import { useState } from 'react';

type FetchStateType = {
  data?: object;
  error?: object;
  loading: boolean;
};

type UseMutationReturnType = [(data: any) => void, FetchStateType];

function useMutation(path: string): UseMutationReturnType {
  const [fetchState, setFetchState] = useState<FetchStateType>({
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

export default useMutation;
