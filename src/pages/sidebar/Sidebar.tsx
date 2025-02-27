import {
  LeftOutlined,
  ProfileOutlined,
  RightOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { useEffect, useState } from "react";
import { Outlet,  useNavigate } from "react-router";
import logo from "../../../public/UZINFOCOM (2).png";
import Navbar from "../home/Navbar";

const { Header, Sider, Content } = Layout;

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
}

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

export default function ISidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const roleData = localStorage.getItem("role");
  const userRole = roleData ? JSON.parse(roleData) : null;
  const isSuperUser =
  userRole && userRole.groups && userRole.groups[0] === "superuser";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("Xodim");
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return localStorage.getItem("selectedMenuKey") || "/user";
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems: MenuItem[] = [
    {
      key: "/user",
      icon: (
        <UserSwitchOutlined style={{ fontSize: "24px", color: "inherit" }} />
      ),
      label: "Xodim",
    },
  ];

  // Agar foydalanuvchi superuser bo‘lsa, "Hisobotlar" menyusini qo‘shamiz
  if (isSuperUser) {
    menuItems.push({
      key: "/report",
      icon: <ProfileOutlined style={{ fontSize: "24px", color: "inherit" }} />,
      label: "Hisobotlar",
    });
  }
  useEffect(() => {
    const savedKey = localStorage.getItem("selectedMenuKey");
    if (savedKey) {
      setSelectedKey(savedKey);
      const clickedItem = menuItems.find((item) => item.key === savedKey);
      if (clickedItem) {
        setSelectedLabel(clickedItem.label);
      }
    }
  }, []);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    const clickedItem = menuItems.find((item) => item.key === key);
    if (clickedItem) {
      setSelectedLabel(clickedItem.label);
      setSelectedKey(key);
      localStorage.setItem("selectedMenuKey", key);
    }
    navigate(key);
  };

  return (
    <div className="flex">
      <main className="w-full">
        <div className="flex justify-between items-center">
          <Layout>
            <Sider
              trigger={null}
              style={siderStyle}
              collapsible
              collapsed={collapsed}
              width={280}
              className="h-screen bg-[#0E1F33] "
            >
              <div className="mx-auto">
                <div className="flex items-center justify-center my-4 h-[125px]">
                  <div
                    className={`flex flex-col items-center gap-2 justify-center rounded-full   bg-[#0E1F33] shadow-lg   ${
                      collapsed ? "w-[50px] h-[45px]" : "w-[180px] h-[125px]"
                    } `}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      className="visible w-full h-full rounded-full"
                    />
                  </div>
                </div>

                <div
                  className="my-4"
                  style={{ borderBottom: "1px solid rgba(30, 41, 59, 0.7)" }}
                ></div>

                <Menu
                  className="bg-[#0E1F33] text-[15px] pb-[16px]"
                  mode="inline"
                  inlineCollapsed={collapsed}
                  defaultSelectedKeys={[selectedKey]}
                  onClick={handleMenuClick}
                  items={menuItems}
                />
              </div>
            </Sider>

            <Layout>
              <Header
                className="shadow-md relative z-50"
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  height: "80px",
                  position: "sticky",
                  top: "0",
                }}
              >
                <div className="flex justify-between items-center px-4 relative h-[80px] ">
                  <Button
                    className="absolute bottom-[-20px] left-[-20px] rounded-full border-[2px] border-[#fff]"
                    type="text"
                    icon={
                      collapsed ? (
                        <RightOutlined style={{ color: "#fff" }} />
                      ) : (
                        <LeftOutlined style={{ color: "#fff" }} />
                      )
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0E1F33";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#0E1F33";
                    }}
                    style={{
                      backgroundColor: "#0E1F33",
                      fontSize: "22px",
                      width: 40,
                      height: 40,
                    }}
                  />

                  <Navbar title={selectedLabel} />
                </div>
              </Header>

              <Content
                style={{ margin: "16px 16px" }}
                className="bg-white rounded-[10px] px-6 py-4 shadow-md"
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </div>
      </main>
    </div>
  );
}
