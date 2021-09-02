import { State } from '@/store/state';
import { Getters } from '@/store/getters';

interface Store {
  state: State;
  getters: Getters<State>;
  commit(type: string, payload: unknown): void;
  dispatch(type: string, payload: unknown): void;
}

interface Actions<T> {
  [key: string]: Action<T>
}

interface Action<T> {
  (state: Store, payload: unknown): void;
}

const actions: Actions<Store> = {
  setMsg({ commit }, msg: unknown) {
    commit('setMsg', msg);
  }
}

export default actions;
