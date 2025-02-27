/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input, Pagination, Table } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { serviseProject } from "../api";
import { EmployeeResponse } from "../types";
interface Employee {
  first_name: string;
  last_name: string;
  employee_position: string;
}

interface Project {
  name: string;
  responsible_team: string;
  responsible_manager: string;
  start_date: string;
  deadline: string;
  status: string;
  employees: Employee[];
}
interface TableDataItem {
  key: string;
  projectName: string;
  responsibleTeam: string;
  responsibleManager: string;
  employeeFullName: string;
  employeePosition: string;
  startDate: string;
  deadline: string;
  status: string;
  rowSpan: number;
  employeeData?: Employee[];
  project?: Project; // Add this if it's required
}

const EmployeeAssignmentsReport = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  const { data, isLoading, isError, error } = useQuery<EmployeeResponse>({
    queryKey: ["projects", currentPage, searchText],
    queryFn: () =>
      serviseProject.getProject({ page: currentPage, search: searchText }),
  });

  useEffect(() => {
    if (data?.results) {
      const processedData: TableDataItem[] = [];

      data.results.forEach((project: any, projectIndex: number) => {
        const participantsCount = project.employees.length;

        project.employees.forEach(
          (employee: Employee, employeeIndex: number) => {
            processedData.push({
              key: `${projectIndex}-${employeeIndex}`,
              projectName: project.name,
              responsibleTeam: project.responsible_team,
              responsibleManager: project.responsible_manager,
              employeeFullName: `${employee.first_name} ${employee.last_name}`,
              employeePosition: employee.employee_position,
              startDate: project.start_date,
              deadline: project.deadline,
              status: project.status,
              rowSpan: employeeIndex === 0 ? participantsCount : 0,
              employeeData: project.employees, // Add this if it's required
              project: project, // Add this if it's required
            });
          }
        );
      });

      setTableData(processedData);
    }
  }, [data, currentPage, searchText]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const clearSearch = (event: React.MouseEvent) => {
    event.preventDefault();
    setSearchText("");
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "№",
      key: "index",
      render: (_: any, record: TableDataItem, index: number) => {
        const uniqueProjects = Array.from(
          new Set(tableData.map((item) => item.projectName))
        );

        const projectIndex = uniqueProjects.indexOf(record.projectName);

        if (
          tableData.findIndex(
            (item) => item.projectName === record.projectName
          ) === index
        ) {
          const projectOccurrences = tableData.filter(
            (item) => item.projectName === record.projectName
          );

          return {
            children: projectIndex + 1 + (currentPage - 1) * 10,
            props: {
              rowSpan: projectOccurrences.length,
            },
          };
        }

        return {
          children: null,
          props: {
            rowSpan: 0,
          },
        };
      },
    },
    {
      title: "Loyiha nomi",
      children: [
        {
          title: (
            <Input
              placeholder="Izlash..."
              value={searchText}
              onChange={(event) => handleSearch(event.target.value)}
              allowClear={false}
              autoFocus
              suffix={
                searchText ? (
                  <CloseCircleOutlined
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={clearSearch}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                ) : null
              }
              className="block min-w-[200px]"
            />
          ),
          dataIndex: "projectName",
          key: "projectName",
          render: (text: string, record: TableDataItem) => ({
            children: text,
            props: {
              rowSpan: record.rowSpan,
            },
          }),
        },
      ],
    },
    {
      title: "Mas'ul jamoa",
      dataIndex: "responsibleTeam",
      key: "responsibleTeam",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: "Mas'ul menejer",
      dataIndex: "responsibleManager",
      key: "responsibleManager",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: "Xodim",
      dataIndex: "employeeFullName",
      key: "employeeFullName",
    },
    {
      title: "Lavozimi",
      dataIndex: "employeePosition",
      key: "employeePosition",
    },
    {
      title: "Boshlanish sanasi",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: "Muddat",
      dataIndex: "deadline",
      key: "deadline",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
  ];

  const filteredData = tableData.filter((item) => {
    if (!searchText) return true;
    return (
      item.projectName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.employeeFullName.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (isError && error) return <p>Xatolik: {(error as Error).message}</p>;

  return (
    <>
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        loading={isLoading}
        pagination={false}
      />
      <Pagination
        className="mt-[20px] justify-center"
        current={currentPage}
        total={data?.count || 0}
        onChange={(page) => setCurrentPage(page)}
        pageSize={10}
      />
    </>
  );
};

export default EmployeeAssignmentsReport;
