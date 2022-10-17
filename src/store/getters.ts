import type { State } from '@/store/state';

export type Getters<T> = {
  [key: string]: (state: T) => void;
};

const getters: Getters<State> = {
  isLogin: state => state.isLogin,
  userInfo: state => state.userInfo,
  historyOrder: state => state.historyOrder
};

export default getters;
