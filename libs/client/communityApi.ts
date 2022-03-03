import axios from 'axios';

export interface IWriteForm {
  question: string;
}

export interface IAnswerWriteForm {
  answer: string;
}

export interface IAnswerVariables {
  postId: string;
  formData: IAnswerWriteForm;
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

/**
 * 질문 게시글에 궁금해요 추가,취소하기
 * @param postId 질문 게시물 ID
 * @returns
 */
export async function toggleCuriosity(postId: string) {
  const { data } = await axios.post(`/api/posts/${postId}/curiosity`);
  return data;
}

/**
 * 답변 등록 요청
 * @param param0
 * @returns
 */
export async function createAnswer({ postId, formData }: IAnswerVariables) {
  const { data } = await axios.post(`/api/posts/${postId}/answer`, formData);
  return data;
}

/**
 * 모든 동네생활 질문글을 가져오기
 * @returns
 */
export async function getAllCommunityPosts() {
  const { data } = await axios.get('/api/posts');
  return data;
}
