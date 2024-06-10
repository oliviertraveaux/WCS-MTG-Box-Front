export interface LoginData {
  username: string;
  password: string;
}

export interface RegistrationFormData extends LoginData {
  email: string;
  department: number;
  city: string;
}
