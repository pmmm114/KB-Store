import { RANDOM_IMAGE_URL } from "@/const/external";
import { getRandomInt } from "@/utils/core/number";

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
    const { width, height, extension, isRandom = true } = params;
    const randomSeed = isRandom ? `?random=${getRandomInt({min: 1, max: 1000})}` : '';
    const url = `${RANDOM_IMAGE_URL}/${width}/${height}.${extension}${randomSeed}`;

    return url;
  }