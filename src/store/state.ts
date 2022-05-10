export type State = {
  isLogin: boolean;
  userInfo: unknown;
  historyOrder: unknown;
};

const state: State = {
  isLogin: false,
  userInfo: {},
  historyOrder: []
};

export default state;
