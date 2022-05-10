export type State = {
  isLogin: boolean;
  userInfo: unknown;
  orderList: unknown;
};

const state: State = {
  isLogin: false,
  userInfo: {},
  orderList: {}
};

export default state;
