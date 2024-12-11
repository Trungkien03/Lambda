import User from "../models/User.model";

interface AuthState {
  isLoading: boolean;
  user: User | null;
  isShowingSlashScreen: boolean;
}

const initialAuthState: AuthState = {
  isLoading: false,
  user: null,
  isShowingSlashScreen: false,
};

export { initialAuthState };
export type { AuthState };
