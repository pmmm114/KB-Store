import * as DTO from '@/api/dto/dto';

export type TMainState = {
  tab: {
    key: DTO.TCategory;
  };
};

export type TMainActions = {
  setTab: (tab: TMainState['tab']) => void;
};

export type TMainSlice = TMainState & TMainActions;
