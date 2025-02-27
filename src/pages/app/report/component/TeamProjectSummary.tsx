import React, { useState } from "react";
import { Input, Pagination, Table } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { serviseExpirence } from "../api";
import { EmployeeResponse } from "../types";

const TeamProjectSummary = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery<EmployeeResponse>({
    queryKey: ["experience", currentPage, searchText],
    queryFn: () =>
      serviseExpirence.getExpirence({ page: currentPage, search: searchText }),
  });

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
          dataIndex: "full_name",
          key: "full_name",
        },
      ],
    },
    {
      title: "Lavozim",
      dataIndex: "position",
      key: "position",
      render: (position: string) => (position ? position : "—"),
    },
    {
      title: "Daraja",
      dataIndex: "level",
      key: "level",
      render: (level: string) => (level ? level : "—"),
    },
    {
      title: "Stack texnologiyasi",
      dataIndex: "specialty",
      key: "specialty",
      render: (specialty: string) => (specialty ? specialty : "—"),
    },
    {
      title: "Tajriba",
      dataIndex: "experience_year",
      key: "experience_year",
      render: (experience_year: number | null) =>
        experience_year ? experience_year : "—",
    },
  ];

  if (isError && error) return <p>Xatolik: {(error as Error).message}</p>;

  return (
    <>
      <Table
        dataSource={data?.results}
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

export default TeamProjectSummary;
