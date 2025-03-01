/**
 * 에러 클래스 상속
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 */
class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 타입 에러
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError}
 */
export class CustomTypeError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'TYPE_ERROR';
  }
}
