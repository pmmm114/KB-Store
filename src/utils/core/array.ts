import { getRandomInt } from "./number";

type IGenerateRandomArrayParams<T> = {
    minLength?: number;
    maxLength: number;
    generator?: (index: number) => T,
    randomIntFn?: ({min, max}: {min: number, max: number}) => number;
}

/**
 * 주어진 길이의 랜덤 배열을 생성하는 함수
 * @param minLength 최소 길이
 * @param maxLength 최대 길이
 * @param generator 요소를 생성하는 콜백 함수 (기본값: 인덱스 반환)
 * @param randomIntFn 랜덤 숫자 생성 함수 (기본값: getRandomInt)
 * @returns 랜덤한 길이를 가진 배열
 */
export function generateRandomArray<T>(
    {
        maxLength,
        minLength = 0,
        generator = (i) => i as unknown as T,
        randomIntFn = getRandomInt,
    }: IGenerateRandomArrayParams<T>
): T[] {
    const randomLength = randomIntFn({min: minLength, max: maxLength ?? minLength}); // 유연한 randomIntFn 사용
    return Array.from({ length: randomLength }, (_, i) => generator(i));
}
