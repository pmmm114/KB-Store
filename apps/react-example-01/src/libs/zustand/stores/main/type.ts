import type { ITabItem } from '@/components/templates/Main/types';

export type TMainState = {
  tab: {
    key: ITabItem['key'];
  };
};

export type TMainActions = {
  setTab: (tab: TMainState['tab']) => void;
};

export type TMainSlice = TMainState & TMainActions;
