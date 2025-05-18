type LoginForm = {
  email: string;
  password: string;
};

type AuthContext = {
  AUTH_STATUS_KEY: boolean;
  setAuth: (auth: boolean) => void;
};

export type { LoginForm, AuthContext };
