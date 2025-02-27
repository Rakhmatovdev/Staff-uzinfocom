import { Tabs } from "antd";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user-service";
import PersonalInfo from "./component/PersonalInfo";
import EducationInfo from "./component/EducationInfo";
import ExperienceInfo from "./component/ExperienceInfo";
import SocialMediaInfo from "./component/SocialMediaInfo";
import TasksInfo from "./component/TasksInfo";
import MentorsInfo from "./component/MentorsInfo";
import LecturesInfo from "./component/LecturesInfo";
import ProblemSolvingInfo from "./component/ProblemSolvingInfo";
import EmployeeEvaluationInfo from "./component/EmployeeEvaluationInfo";
import { User } from "./types/user";

const { TabPane } = Tabs;

const tabsData = [
  {
    key: "1",
    label: "Shaxsiy ma'lumotlar",
    component: PersonalInfo,
  },
  {
    key: "2",
    label: "O'quv ma'lumotlari",
    component: EducationInfo,
  },
  {
    key: "3",
    label: "Ish tajriba",
    component: ExperienceInfo,
  },
  {
    key: "4",
    label: "Ijtimoiy tarmoqlar",
    component: SocialMediaInfo,
  },
  {
    key: "5",
    label: "Topshiriqlar",
    component: TasksInfo,
  },
  {
    key: "6",
    label: "Mentorlar",
    component: MentorsInfo,
  },
  {
    key: "7",
    label: "Meetup ma'ruzalar",
    component: LecturesInfo,
  },
  {
    key: "8",
    label: "Masala yechish",
    component: ProblemSolvingInfo,
  },
  {
    key: "9",
    label: "Daraja baholash",
    component: EmployeeEvaluationInfo,
  },
];

const Statistic = () => {
  const { data: user } = useQuery<User>({
    queryKey: ["users"],
    queryFn: userService.users,
  });

  return (
    <div className=" justify-center w-full">
      <Tabs
        defaultActiveKey="1"
        className="custom-tabs "
        tabBarStyle={{
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {tabsData.map((tab) => {
          const Component = tab.component;
          return (
            <TabPane
              tab={
                <span className="text-gray-700 font-sans font-semibold">
                  {tab.label}
                </span>
              }
              key={tab.key}
            >
              <Component user={user} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Statistic;
