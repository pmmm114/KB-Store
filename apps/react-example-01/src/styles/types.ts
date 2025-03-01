export interface ITailwindClass {
  [key: string]: ((className?: string) => string) | ITailwindClass;
}
