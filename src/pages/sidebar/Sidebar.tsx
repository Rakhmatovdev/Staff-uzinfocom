import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import logo from "../../../public/UZINFOCOM.png";
import Navbar from "../home/Navbar";

const { Header, Sider, Content } = Layout;
export default function ISidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  // Menu elementlarini dinamik ravishda tuzish
  const menuItems = [
    // {
    //   key: "/",
    //   icon: <AppstoreOutlined />,
    //   label: "Dashboard",
    // },
    {
      key: "/user",
      icon: <UserSwitchOutlined />,
      label: "Xodim",
    },
  ];
  
  // const role = localStorage.getItem("role");
  // if (role === "admin") {
    //   menuItems.splice(1, 0, {
  //     key: "/app/upload",
  //     icon: <UploadOutlined/>,
  //     label: "Upload file",
  //   });
  //   menuItems.splice(1, 0, {
  //     key: "/app/exam",
  //     icon: <FileAddOutlined />,
  //     label: "Create exam",
  //   });
  // }

  return (
    <div className="flex">
      <main className="w-full">
        <div className="flex justify-between items-center">
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className="h-screen">
              <div />
              <Link to="/" className="flex items-center">
                <img src={logo} alt="" className="visible mx-auto mt-4 w-12 h-12" />
              </Link>
              <Menu
                className="h-[500px] mt-4"
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                onClick={({ key }) => navigate(key)}
                items={menuItems}
              />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }}>
                <div className="flex justify-between">
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  <Navbar />
                </div>
              </Header>
              <Content
                style={{
                  
                  minHeight: 280,
                  background: colorBgContainer,
                }}
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
