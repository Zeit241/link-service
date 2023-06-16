export interface CustomTypes {
  id: string;
  username: string;
  status: "ACTIVE" | "BANNED" | "FROZEN";
  role: "USER" | "ADMIN";
}

export interface FormValues {
  error: string;
  username: string;
  password: string;
}
