import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface userState {
  id?: number;
  email?: string;
  name?: string;
}

export const userState = atom<userState>({
  key: "userState",
  default: {
    id: 0,
    email: "",
    name: "",
  },
  effects_UNSTABLE: [persistAtom],
});
