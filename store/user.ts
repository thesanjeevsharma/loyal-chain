import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

type State = {
  address: null | string;
  nfts: Object[];
};

const { persistAtom } = recoilPersist();

export const userState = atom<State>({
  key: "userState",
  default: {
    address: null,
    nfts: [],
  },
  effects_UNSTABLE: [persistAtom],
});
