import React from "react";
import { format } from "date-fns";
import TableComponent from "./TableComponent";
import { User } from "../types/user";

interface ExperienceInfoProps {
  user: User | undefined;
}

const ExperienceInfo: React.FC<ExperienceInfoProps> = ({ user }) => {
  const experienceColumns = [
    { title: "Ish turi", dataIndex: "position" },
    { title: "Ish joyi", dataIndex: "company" },
    {
      title: "Boshlangan sana",
      dataIndex: "start_date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
    {
      title: "Tugatgan sana",
      dataIndex: "end_date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
  ];

  return (
    <TableComponent
      data={user?.experiences || []}
      columns={experienceColumns}
    />
  );
};

export default ExperienceInfo;
