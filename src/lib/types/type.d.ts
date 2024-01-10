type AlertVariant = 'ERROR' | 'OK' | 'NEUTRAL';
type UserPrivilege = 'STUDENT' | 'TEACHER' | 'ADMIN';
type ClassMember = 'STUDENT' | 'TEACHER';
type formType = "CLASS_EDIT" | "ENROLL_CLASS" | "NEW_CLASS"
type ClassType = {
  id: string;
  name: string;
  description: string;
  enrolled_student_count: number;
  teaching_teacher_count: number;
  created_date: Date;
  updated_date: Date;
};
type UserType = {
  id: string;
  username: string;
  fullname: string;
  password: string;
  email: string;
  privilege: $Enums.UserPrivilege;
  register_date: Date;
};
