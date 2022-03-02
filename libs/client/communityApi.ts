import axios from 'axios';

export interface IWriteForm {
  question: string;
}

/**
 * 질문 작성하기
 * @param formData
 * @returns
 */
export async function writeQuestion(formData: IWriteForm) {
  const { data } = await axios.post(`/api/posts`, formData);
  return data;
}

/**
 * 동네 질문의 게시물 가져오기
 * @param postId
 * @returns
 */
export async function getCommunityPostById(postId: string | string[] | undefined) {
  if (typeof postId === 'string') {
    const { data } = await axios.get(`/api/posts/${postId}`);
    return data;
  }
  throw new Error('postId is invalid.');
}
