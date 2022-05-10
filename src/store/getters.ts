import { State } from '@/store/state';

export type Getters<T> = {
  [key: string]: (state: T) => void;
};

const getters: Getters<State> = {
  isLogin: state => state.isLogin,
  userInfo: state => state.userInfo,
  orderList: state => state.orderList
};

export default getters;