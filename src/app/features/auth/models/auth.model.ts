export interface LoginData {
  username: string;
  password: string;
}

export interface RegistrationFormData extends LoginData {
  email: string;
  postCode: number;
  city: string;
}
