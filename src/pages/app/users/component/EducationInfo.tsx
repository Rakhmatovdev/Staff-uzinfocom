import React from "react";
import { format } from "date-fns";
import TableComponent from "./TableComponent";
import { User } from "../types/user";

interface EducationInfoProps {
  user: User | undefined;
}

const EducationInfo: React.FC<EducationInfoProps> = ({ user }) => {
  const educationColumns = [
    { title: "OTM", dataIndex: "name" },
    { title: "Fakultet", dataIndex: "faculty" },
    { title: "Mutaxassisligi", dataIndex: "specialization" },
    { title: "Boshlangan sana", dataIndex: "start_date", render: (date: string) => format(date, "dd MMMM yyyy") },
    { title: "Tugatgan sana", dataIndex: "end_date", render: (date: string) => format(date, "dd MMMM yyyy") },
  ];

  return (
    <TableComponent
      data={user?.employee_education || []}
      columns={educationColumns}
    />
  );
};

export default EducationInfo;