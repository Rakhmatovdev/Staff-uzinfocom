/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Period {
  start_date: string;
  end_date: string;
}

export interface Project {
  employees: any;
  start_date: any;
  deadline: any;
  status: any;
  responsible_manager: any;
  responsible_team: any;
  name: string;
  role?: string;
  project_status?: string;
  total_days?: number;
  periods?: Period[];
}

export interface Employee {
  first_name: any;
  last_name: any;
  employee_position: any;
  full_name: string;
  position: string;
  projects: Project[];
}

export interface TableEmployeeData {
  name?: string;
  full_name: string;
  position: string;
  rowSpan: number;
}

export interface TableProjectData {
  name: string;
  role_in_project: string;
  project_status: string;
  join_date: string;
  end_date: string;
  duration: string;
}

export interface TableDataItem {
  [x: string]: any;
  key: string;
  employeeData: TableEmployeeData;
  project: TableProjectData;
}

export interface EmployeeResponse {
  count: number;
  results: Employee[];
}
