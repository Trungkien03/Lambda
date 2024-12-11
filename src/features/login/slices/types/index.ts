type LoginViewState = {
  email: string;
  password: string;
  isLoading: boolean;
};

const initialLoginViewState: LoginViewState = {
  email: "",
  password: "",
  isLoading: false,
};

export { initialLoginViewState };
export type { LoginViewState };
