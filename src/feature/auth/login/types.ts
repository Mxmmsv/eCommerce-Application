type LoginForm = {
  email: string;
  password: string;
};

type AuthContext = {
  IS_AUTHORIZED: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
};

export type { LoginForm, AuthContext };
