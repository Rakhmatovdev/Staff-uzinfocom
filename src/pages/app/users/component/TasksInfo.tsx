/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { format } from "date-fns";
import TableComponent from "./TableComponent";
import { User } from "../types/user";

interface TasksInfoProps {
  user: User | undefined;
}

const TasksInfo: React.FC<TasksInfoProps> = ({ user }) => {
  const tasksColumns = [
    { title: "Nomi", dataIndex: "name" },
    {
      title: "Boshlangan sana",
      dataIndex: "start_date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
    {
      title: "Tugash sanasi",
      dataIndex: "end_date",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
    {
      title: "Topshirish sanasi",
      dataIndex: "deadline",
      render: (date: string) => format(date, "dd MMMM yyyy"),
    },
    { title: "Topshiriq turi", dataIndex: "task_type" },
    {
      title: "Topshiriq ishi",
      dataIndex: "role_in_project",
      render: (role: any) => role.role_in_project,
    },
    { title: "Holati", dataIndex: "status" },
  ];

  return <TableComponent data={user?.tasks || []} columns={tasksColumns} />;
};

export default TasksInfo;
