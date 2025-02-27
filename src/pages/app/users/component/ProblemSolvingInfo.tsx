import React from "react";
import TableComponent from "./TableComponent";
import { User } from "../types/user";

interface ProblemSolvingInfoProps {
  user: User | undefined;
}

const ProblemSolvingInfo: React.FC<ProblemSolvingInfoProps> = ({ user }) => {
  const problemSolvingColumns = [
    { title: "Platforma", dataIndex: "platform" },
    { title: "Oson daraja", dataIndex: "easy" },
    { title: "O'rta daraja", dataIndex: "medium" },
    { title: "Yuqori daraja", dataIndex: "hard" },
  ];

  return (
    <TableComponent
      data={user?.problem_solving || []}
      columns={problemSolvingColumns}
    />
  );
};

export default ProblemSolvingInfo;