import axios from 'axios';

/**
 * 모든 상품 목록 가져오기
 * @returns
 */
export async function getAllProducts() {
  const { data } = await axios.get('/api/products');
  return data;
}

/**
 * 특정 상품 정보 가져오기
 * @param productId
 * @returns
 */
export async function getProductById(productId: string | string[] | undefined) {
  if (typeof productId === 'string') {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  }
  throw new Error('productId is invalid.');
}

/**
 * 해당 상품에 좋아요 요청하는 api
 * @param id 상품 아이디
 * @returns
 */
export async function favoriteProduct(productId: string | string[] | undefined) {
  if (typeof productId === 'string') {
    const { data } = await axios.post(`/api/products/${productId}/favorite`);
    return data;
  }
  throw new Error('productId is invalid.');
}
