import { Input, Pagination, Table } from "antd";
import { useState } from "react";
import { serviseEmloyes } from "../api";
import { useQuery } from "@tanstack/react-query";
import { CloseCircleOutlined } from "@ant-design/icons";

const StaffProjectOverview = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["employees", currentPage, searchText],
    queryFn: () =>
      serviseEmloyes.getEmloyes({ page: currentPage, search: searchText }),
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
    },
    {
      title: "Daraja",
      dataIndex: "level",
      key: "level",
      render: (level: string | null) => level || "—",
    },
    {
      title: "Joylashuv",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Boshlanish sanasi",
      dataIndex: "hired_date",
      key: "hired_date",
      render: (date: string | null) => date || "—",
    },
    {
      title: "Sinov davridagi ish haqi",
      dataIndex: ["probation", "salary_in_probation"],
      key: "salary_in_probation",
      render: (salary: number | null) => (salary ? `${salary} so'm` : "—"),
    },
    {
      title: "Sinov muddati",
      dataIndex: ["probation", "probation_period"],
      key: "probation_period",
      render: (period: string | null) => period || "—",
    },
    {
      title: "Sinov muddatidan keyin ish haqi",
      dataIndex: "estimated_salary",
      key: "estimated_salary",
      render: (salary: number | null) => (salary ? `${salary} so'm` : "—"),
    },

    {
      title: "Oxirgi ish haqi o'zgarishi sanasi",
      dataIndex: ["probation", "salary_updated_date"],
      key: "salary_updated_date",
      render: (period: string | null) => period || "—",
    },
    {
      title: "Hozirgi ish haqi",
      dataIndex: ["probation", "current_salary"],
      key: "current_salary",
      render: (salary: number | null) => (salary ? `${salary} so'm` : "—"),
    },
    {
      title: "Aloqa raqami",
      dataIndex: "phone",
      key: "phone",
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
        showSizeChanger={false}
      />
    </>
  );
};

export default StaffProjectOverview;
