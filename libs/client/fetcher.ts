import axios from 'axios';

export async function getMyStatus() {
  const { data } = await axios.get('/api/users/me');

  return data;
}
