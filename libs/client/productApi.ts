import axios from 'axios';

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
