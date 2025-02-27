import React from "react";
import { User } from "../types/user";

interface PersonalInfoProps {
  user: User | undefined;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const renderField = (value: string | null | undefined, fallback = "-") =>
    value || fallback;

  return (
    <section className="text-gray-600 ">
      <table className="table-auto w-[95%] border mt-4 sm:mt-7 mx-8 ]">
        <thead className="text-gray-700 ">
          <tr className="mt-10 border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Ism
            </th>
            <th>{renderField(user?.first_name)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Familiya
            </th>
            <th>{renderField(user?.last_name)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Email
            </th>
            <th>{renderField(user?.email)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Telefon
            </th>
            <th>{renderField(user?.phone)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Tug'ilgan kun
            </th>
            <th>{renderField(user?.birth_date)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Manzil
            </th>
            <th>{renderField(user?.address)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Lavozim
            </th>
            <th>{renderField(user?.position)}</th>
          </tr>
          <tr className="border">
            <th className="px-6 py-3 text-left text-sm font-medium border-r-2">
              Daraja
            </th>
            <th>{renderField(user?.level)}</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default PersonalInfo;
