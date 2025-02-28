import React, { useState, useEffect } from "react";
import { Input, Pagination, Table } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { docsService } from "../api";
import { Employee, EmployeeResponse, Project, TableDataItem } from "../types";

const EmployeeProjectReport = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  const { data, isLoading, isError, error } = useQuery<EmployeeResponse>({
    queryKey: ["employees-projects", currentPage, searchText],
    queryFn: () =>
      docsService.getDocs({ page: currentPage, search: searchText }),
  });

  useEffect(() => {
    if (data?.results) {
      const processedData: TableDataItem[] = [];

      data.results.forEach((employee: Employee) => {
        if (!employee.projects || employee.projects.length === 0) {
          processedData.push({
            key: `${employee.full_name}-0`,
            employeeData: {
              full_name: employee.full_name,
              position: employee.position,
              rowSpan: 1,
            },
            project: {
              name: "Loyihalar yo'q",
              role_in_project: "-",
              project_status: "-",
              join_date: "-",
              end_date: "-",
              duration: "-",
            },
          });
        } else {
          const totalPeriods = employee.projects.reduce(
            (sum: number, project: Project) => {
              return sum + (project.periods?.length || 1);
            },
            0
          );

          let isFirstProject = true;

          employee.projects.forEach(
            (project: Project, projectIndex: number) => {
              const periods =
                project.periods && project.periods.length > 0
                  ? project.periods
                  : [{ start_date: "-", end_date: "-" }];

              periods.forEach((period, periodIndex) => {
                processedData.push({
                  key: `${employee.full_name}-${projectIndex}-${periodIndex}`,
                  employeeData: {
                    full_name: employee.full_name,
                    position: employee.position,
                    rowSpan:
                      isFirstProject && periodIndex === 0 ? totalPeriods : 0,
                  },
                  project: {
                    name: periodIndex === 0 ? project.name || "-" : "",
                    role_in_project:
                      periodIndex === 0 ? project.role || "-" : "",
                    project_status:
                      periodIndex === 0 ? project.project_status || "-" : "",
                    join_date: period.start_date,
                    end_date: period.end_date,
                    duration:
                      periodIndex === 0 ? `${project.total_days || 0} kun` : "",
                  },
                  projectRowSpan: periodIndex === 0 ? periods.length : 0,
                });

                if (periodIndex === 0) {
                  isFirstProject = false;
                }
              });
            }
          );
        }
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
      title: "Xodim",
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
          dataIndex: ["employeeData", "full_name"],
          key: "full_name",
          render: (text: string, record: TableDataItem) => ({
            children: text,
            props: {
              rowSpan: record.employeeData.rowSpan,
            },
          }),
        },
      ],
    },
    {
      title: "Lavozim",
      dataIndex: ["employeeData", "position"],
      key: "position",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.employeeData.rowSpan,
        },
      }),
    },
    {
      title: "Loyiha",
      dataIndex: ["project", "name"],
      key: "project_name",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
    {
      title: "Loyihadagi roli",
      dataIndex: ["project", "role_in_project"],
      key: "role_in_project",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
    {
      title: "Loyiha holati",
      dataIndex: ["project", "project_status"],
      key: "project_status",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
    {
      title: "Loyihaga qo'shilish sanasi",
      dataIndex: ["project", "join_date"],
      key: "join_date",
    },
    {
      title: "Loyihaning tugallanish sanasi",
      dataIndex: ["project", "end_date"],
      key: "end_date",
    },
    {
      title: "Loyihada ishtirok etish muddati",
      dataIndex: ["project", "duration"],
      key: "duration",
      render: (text: string, record: TableDataItem) => ({
        children: text,
        props: {
          rowSpan: record.projectRowSpan,
        },
      }),
    },
  ];

  const filteredData = tableData.filter((item) => {
    if (!searchText) return true;
    return item.employeeData.full_name
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  const displayData = filteredData;

  if (isError && error) return <p>Xatolik: {(error as Error).message}</p>;

  return (
    <>
      <Table
        dataSource={displayData}
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
        showSizeChanger={false}
      />
    </>
  );
};

export default EmployeeProjectReport;
