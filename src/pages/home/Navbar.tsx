import { Link, useNavigate } from "react-router";
import {
  KeyOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useState } from "react";
import USearch from "@/components/ui/USearch";
import authService from "@/services/auth-service.ts";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="flex justify-between items-center gap-4 sm:gap-0 h-8 mr-4 sm:w-[81vw]">
        <h1 className="font-semibold text-lg ml-[20px] text-[#0E1F33]">
          {title}
        </h1>

        <div className="flex gap-4">
          <USearch
            ClassName="hidden sm:flex mr-4"
            enterButton={
              <Button
                className="w-[50px] bg-[#0E1F33]"
                type="primary"
                icon={
                  <SearchOutlined
                    style={{
                      fontSize: 24,
                    }}
                  />
                }
              />
            }
            Suffix
            placeholder="Search..."
          />

          <Popover
            content={
              <form className="space-y-2">
                <Link
                  to={"users/settings"}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <SettingOutlined /> <span className="text-sm">Setting</span>
                </Link>

                <Link
                  to={"users/change"}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <KeyOutlined /> <span className="text-sm">Password</span>
                </Link>

                <button
                  onClick={handleClick}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <LogoutOutlined /> <span className="text-sm">Logout</span>
                </button>
              </form>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <button className="btn-user h-[45px] w-[46px] flex justify-center items-center bg-[#0E1F33] hover:bg-[#053272] ">
              <UserOutlined style={{ fontSize: "24px", color: "white" }} />
            </button>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
