type Role = "student" | "admin" | "instructor";

interface User {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  role: Role;
  specialization: string;
  status: string;
}

export default User;
