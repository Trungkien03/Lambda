type Role = "student" | "admin" | "instructor";

interface User {
  id: string;
  email: string;
  name: string;
  profile_image: string;
  role: Role;
  specialization: string;
  status: string;
}

export default User;
