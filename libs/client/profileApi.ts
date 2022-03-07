import { Product, Sale } from '@prisma/client';
import axios from 'axios';

export interface IProductsListWithCount extends Sale {
  product: Product & {
    _count: {
      favorites: number;
    };
  };
}

export type KindType = 'favorites' | 'sales' | 'purchases';

export type IProductsList = { [key in KindType]: IProductsListWithCount[] };

/**
 * 프로필 페이지에서 상품 목록을 가져오는 함수
 * @param kind 판매내역 | 구매내역 | 관심목록
 * @returns
 */
export async function getProductsList(kind: string) {
  const { data } = await axios.get(`/api/users/me/${kind}`);
  return data;
}

export interface IFetchProductsResponse {
  success: boolean;
  result: IProductsList;
}

export interface IProductsListProps {
  kind: KindType;
}
