import { RANDOM_IMAGE_URL } from '@/const/external';

interface IGetRandomImageParams {
  width: number;
  height: number;
  extension: 'webp' | 'jpg' | 'png';
  isRandom?: boolean;
}

/**
 * 랜덤 이미지 주소 가져오기
 * @param params - {@link IFetchRandomImageParams}
 * @returns 랜덤 이미지 주소
 */
export function getRandomImageUrl(params: IGetRandomImageParams): string {
  const { width, height, extension } = params;
  const url = `${RANDOM_IMAGE_URL}/seed/${Math.random()}/${width}/${height}.${extension}`;

  return url;
}
