import axios from 'axios';

export interface IWriteForm {
  question: string;
}

export async function writeQuestion(formData: IWriteForm) {
  const { data } = await axios.post(`/api/posts`, formData);
  return data;
}
