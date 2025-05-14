type LoginForm = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthorized: boolean;
  setAuth: (auth: boolean) => void;
};

export type { LoginForm, AuthContextType };
