import { State } from '@/store/state';

type Mutations<T, U = any> = {
  [key: string]: (state: T, payload: U) => void;
};

const mutations: Mutations<State> = {
  setUserInfo(state, userInfo: unknown) {
    state.userInfo = userInfo;
  }
};

export default mutations;
