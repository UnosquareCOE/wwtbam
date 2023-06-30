import { create } from "zustand";
import { User } from "../interfaces/Interfaces";

interface UserState {
  user: User;
  saveUser: (
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ) => void;
}

export const useAccountStore = create<UserState>((set) => ({
  user: { id: 0, firstName: "", lastName: "", email: "" },
  saveUser: (id, firstName, lastName, email) => {
    console.log(id, firstName, lastName, email);
    set((state) => ({
      user: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    }));
    console.log("This works");
  },
}));
