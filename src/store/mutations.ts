import { State } from '@/store/state';

type Mutations<T, U = any> = {
  [key: string]: (state: T, payload: U) => void;
};

const mutations: Mutations<State> = {
  setUserInfo(state, userInfo) {
    if (Object.keys(userInfo).length > 0) {
      state.isLogin = true;
    } else {
      state.isLogin = false;
    }

    state.userInfo = userInfo;
  }
};

export default mutations;
