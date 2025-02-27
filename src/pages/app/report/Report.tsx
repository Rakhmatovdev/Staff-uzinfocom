import { Tabs, TabsProps } from "antd";
import EmployeeProjectReport from "./component/EmployeeProjectReport";
import StaffProjectOverview from "./component/StaffProjectOverview";
import TeamProjectSummary from "./component/TeamProjectSummary";
import EmployeeAssignmentsReport from "./component/EmployeeAssignmentsReport";
import ProjectAllocationReport from "./component/ProjectAllocationReport";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Xodimlar va ularning loyihalari haqida hisobot",
    children: <EmployeeProjectReport />,
  },
  {
    key: "2",
    label: "Barcha xodimlar haqida hisobot",
    children: <StaffProjectOverview />,
  },
  {
    key: "3",
    label: "Xodimlarning tajribasi va texnik stack hisoboti",
    children: <TeamProjectSummary />,
  },
  {
    key: "4",
    label: "Har bir loyiha bo'yicha hisobot",
    children: <EmployeeAssignmentsReport />,
  },
  {
    key: "5",
    label: "Loyiha qiymati va to'lov hisoboti",
    children: <ProjectAllocationReport />,
  },
];

const Report = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default Report;
