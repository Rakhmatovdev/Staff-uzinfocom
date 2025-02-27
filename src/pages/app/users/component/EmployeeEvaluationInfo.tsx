import React from "react";
import { User } from "../types/user";

interface EmployeeEvaluationInfoProps {
  user: User | undefined;
}

const EmployeeEvaluationInfo: React.FC<EmployeeEvaluationInfoProps> = ({
  user,
}) => {
  const evaluation = user?.employee_level_evaluation;

  if (!evaluation) {
    return <p>Ma'lumot mavjud emas.</p>;
  }

  return (
    <div className=" mt-4 sm:mt-7 mx-8">
      <div className="flex p-4 border ">
        <p className="w-[400px] font-semibold">
          Masala yechish darajasi: Oddiy
        </p>
        <p>{evaluation.problem_solving_easy}</p>
      </div>
      <div className="flex p-4 border">
        <p className="w-[400px] font-semibold">
          Masala yechish darajasi: O'rta
        </p>
        <p>{evaluation.problem_solving_medium}</p>
      </div>
      <div className="flex p-4 border">
        <p className="w-[400px] font-semibold">
          Masala yechish darajasi: Yuqori
        </p>
        <p>{evaluation.problem_solving_hard}</p>
      </div>
      <div className="flex p-4 border">
        <p className="w-[400px] font-semibold">Level</p>
        <p>{evaluation.level}</p>
      </div>
    </div>
  );
};

export default EmployeeEvaluationInfo;
