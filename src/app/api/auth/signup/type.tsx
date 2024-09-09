export interface SignUpData {
  email: string;
  password: string;
  authorize: {
    admin: boolean;
  };
}