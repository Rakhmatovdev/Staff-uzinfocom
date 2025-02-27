/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Pagination, Table } from "antd";
import { useState } from "react";
import { servisePayment } from "../api";
import { useQuery } from "@tanstack/react-query";
import { CloseCircleOutlined } from "@ant-design/icons";

const ProjectAllocationReport = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["payments", currentPage, searchText],
    queryFn: () =>
      servisePayment.getPayment({ page: currentPage, search: searchText }),
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
      title: "№",
      key: "position",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * 10 + index + 1, 
    },
    {
      title: "Loyiha",
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
          dataIndex: "name",
          key: "name",
        },
      ],
    },
    {
      title: "Shartnoma bo'yicha loyihaning qiymati",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "To'langan",
      dataIndex: ["payments", "paid"],
      key: "paid",
      render: (paid: string | null) => paid || "—",
    },
    {
      title: "Qolgan",
      dataIndex: ["payments", "left"],
      key: "left",
      render: (left: string | null) => left || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string | null) => status || "—",
    },
  ];

  return (
    <>
      <Table
        dataSource={data?.results}
        columns={columns}
        rowKey="full_name"
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

export default ProjectAllocationReport;
