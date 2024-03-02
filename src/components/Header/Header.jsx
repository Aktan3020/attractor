import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import api from "../../api/api";
import { Menu, Layout } from "antd";
const { Header } = Layout;

const HeaderApp = () => {
  return (
    <Header style={{ position: "fixed", width: "100%", zIndex: "9999" }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1" onClick={api.loginForGitHub}>
          Регистрация
        </Menu.Item>
        <Link to={"/profile"}>
          <Menu.Item key="2">
            <Link to={"/profile"}>Профиль</Link>
          </Menu.Item>
        </Link>
        <Menu.Item key="3">
          <Link to={"/repo"}>Репозиторий </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderApp;
