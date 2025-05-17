type LoginForm = {
  email: string;
  password: string;
};

type AuthContextType = {
  AUTH_STATUS_KEY: boolean;
  setAuth: (auth: boolean) => void;
};

export type { LoginForm, AuthContextType };
