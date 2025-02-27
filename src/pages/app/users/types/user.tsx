export interface User {
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  birth_date: string | null;
  address: string | null;
  position: string | null;
  level: string | null;
  employee_education: Education[];
  experiences: Experience[];
  social_media_accounts: SocialMedia[];
  tasks: Task[];
  mentorship: Mentorship[];
  lecture: Lecture[];
  problem_solving: ProblemSolving[];
  employee_level_evaluation: EmployeeEvaluation | null;
}

interface Education {
  name: string;
  faculty: string;
  specialization: string;
  start_date: string;
  end_date: string;
}

interface Experience {
  position: string;
  company: string;
  start_date: string;
  end_date: string;
}

interface SocialMedia {
  social_media: string;
  url: string;
}

interface Task {
  name: string;
  start_date: string;
  end_date: string;
  task_type: string;
  role_in_project: {
    role_in_project: string;
  };
  status: string;
}

interface Mentorship {
  student: {
    id: string;
    first_name: string;
    last_name: string;
  };
  start_date: string;
  end_date: string;
}

interface Lecture {
  title: string;
  date: string;
  files: { title: string }[];
}

interface ProblemSolving {
  platform: string;
  easy: number;
  medium: number;
  hard: number;
}

interface EmployeeEvaluation {
  problem_solving_easy: number;
  problem_solving_medium: number;
  problem_solving_hard: number;
  mentorship_count: number;
  project_test_count: number;
  project_architecture_count: number;
  database_architecture_count: number;
  additional_tasks_count: number;
  experience_years: number;
  meetup_lecture_count: number;
  other_programming_languages_count: number;
  level: string;
  next_level_gaps: {
    next_level: string;
    gaps: {
      problem_solving_easy: number;
      mentorship_count: number;
      project_test_count: number;
      additional_tasks_count: number;
      meetup_lecture_count: number;
    };
  };
  next_level_requirements: {
    language: string;
    level: string;
    requirements: string;
  }[];
}
