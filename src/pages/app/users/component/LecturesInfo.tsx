import React from "react";
import { format } from "date-fns";
import TableComponent from "./TableComponent";
import { User } from "../types/user";

interface LecturesInfoProps {
  user: User | undefined;
}

const LecturesInfo: React.FC<LecturesInfoProps> = ({ user }) => {
  const lecturesColumns = [
    { title: "Nomi", dataIndex: "title" },
    {
      title: "Sana",
      dataIndex: "date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
    {
      title: "Hujjatlar",
      dataIndex: "files",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (files: any) => files.map((file: any) => file.title).join(", "),
    },
  ];

  return (
    <TableComponent data={user?.lecture || []} columns={lecturesColumns} />
  );
};

export default LecturesInfo;
