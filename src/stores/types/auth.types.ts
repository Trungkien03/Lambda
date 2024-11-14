import User from "../models/User.model";

interface AuthState {
  isLoading: boolean;
  user: User | null;
}

const initialAuthState: AuthState = {
  isLoading: false,
  user: null,
};

export { initialAuthState };
export type { AuthState };
