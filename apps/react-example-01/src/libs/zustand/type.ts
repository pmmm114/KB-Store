import type { StateCreator } from 'zustand/vanilla';

export type ImmerStateCreator<T> = StateCreator<
  T,
  [['zustand/immer', never], never],
  [],
  T
>;
