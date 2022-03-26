/**
 * classname을 만들어주는 함수
 * @param classnames
 * @returns
 */
export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

/**
 * Cloudflare의 이미지를 불러오는 함수
 * @param imageId Cloudflare에 저장된 이미지의 ID
 * @param options 이미지 크기
 * @returns
 */
export function loadImageByID(imageId: string, options: { type: 'public' | 'avatar' | 'product' }) {
  return `https://imagedelivery.net/deOyHLPsiQ-RAS-wtCRaWQ/${imageId}/${options.type}`;
}
