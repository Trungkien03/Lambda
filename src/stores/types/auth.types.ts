interface AuthState {
  isLoading: boolean;
}

const initialAuthState: AuthState = {
  isLoading: false,
};

export { initialAuthState };
export type { AuthState };
