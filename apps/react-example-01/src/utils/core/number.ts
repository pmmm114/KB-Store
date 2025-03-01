interface IGetRandomIntParams {
  min: number;
  max: number;
}

export function getRandomInt({ min, max }: IGetRandomIntParams) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
