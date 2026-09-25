export type UserRole =
  | "admin"
  | "receptionist"
  | "lab_technician";

export interface User {
  userId: string;
  labId: string;
  labName: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}