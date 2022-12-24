import { Admin, User } from "@prisma/client";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type UserType = User  | Partial<User>;
export type AdminType =   Admin | Partial<Admin> ;

export const userState = atom<UserType>({
  key: "userState",
  default: {
    id: 0,
    email: "",
    name: "",
    role: "MANAGER",
  },
  effects_UNSTABLE: [persistAtom],
});
export const adminState = atom<AdminType>({
  key: "adminState",
  default: {
    id: 0,
    email: "",
    name: "",
    role: "",
  },
  effects_UNSTABLE: [persistAtom],
});
