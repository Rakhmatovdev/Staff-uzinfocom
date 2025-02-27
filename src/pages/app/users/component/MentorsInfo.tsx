/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { format } from "date-fns";
import TableComponent from "./TableComponent";
import { User } from "../types/user";

interface MentorsInfoProps {
  user: User | undefined;
}

const MentorsInfo: React.FC<MentorsInfoProps> = ({ user }) => {
  const mentorsColumns = [
    { title: "ID", dataIndex: "student", render: (student: any) => student.id },
    {
      title: "Ismi",
      dataIndex: "student",
      render: (student: any) => student.first_name,
    },
    {
      title: "Familiyasi",
      dataIndex: "student",
      render: (student: any) => student.last_name,
    },
    {
      title: "Boshlanish sanasi",
      dataIndex: "start_date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
    {
      title: "Tugatgan sanasi",
      dataIndex: "end_date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
  ];

  return (
    <TableComponent data={user?.mentorship || []} columns={mentorsColumns} />
  );
};

export default MentorsInfo;
