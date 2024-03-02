import React from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Layout, Breadcrumb, Card, Typography, Switch } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import api from "../../api/api";
const { Title, Paragraph, Link } = Typography;
const { Content } = Layout;
const Repo = ({ messageApi }) => {
  const [loading, setLoading] = React.useState(true);
  const [publicrep, setPublicrep] = React.useState(true);

  const [data, setData] = React.useState([]);

  const navigate = useNavigate();
  React.useEffect(() => {
    (async () => {
      const data = await api.getUserProfile();
      if (localStorage.getItem("access_token") == null) {
        messageApi.open({
          type: "error",
          content: "Вы не зарегистрированы ",
        });
        navigate("/");
      }
      const repos = await api.getUserRepos(data.login);
      console.log("repos", repos);
      setData(repos);
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <Spin style={{ margin: "50px auto", display: "block" }} />;
  }
  return (
    <div>
      <Content
        style={{
          padding: "0 50px",
          marginTop: 64,
          height: "100%",
          width: "100%",
        }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>home</Breadcrumb.Item>

          <Breadcrumb.Item>repository</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
          }}
        >
          <Paragraph>Приватные репозиторий</Paragraph>
          <Switch
            onChange={() => setPublicrep((prew) => prew?false:true)}
          />
          <br />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 50 }}>
            {data.map((item) => {
              if (item.private === false && publicrep) {
                return (
                  <div className="card_repo" style={{ width: "45%" }}>
                    <Card
                      style={{ marginTop: 16 }}
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Title level={5}>
                        Логин владельца:{item.owner.login}
                      </Title>
                      <Title level={5}>{item.name}</Title>
                      <Title level={5}>Тип:публичный</Title>
                      <Link href={item.clone_url}>Ссылка на репозиторий</Link>
                      <br />
                      <Link href={"/other_repo_user/" + item.full_name}>
                        Другие пользователи
                      </Link>
                    </Card>
                  </div>
                );
              } else if (item.private && !publicrep) {
                return (
                  <div className="card_repo" style={{ width: "45%" }}>
                    <Card
                      style={{ marginTop: 16 }}
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Title level={5}>
                        Логин владельца:{item.owner.login}
                      </Title>
                      <Title level={5}>{item.full_name}</Title>
                      <Title level={5}>Тип:публичный</Title>
                      <Link href={item.clone_url}>Ссылка на репозиторий</Link>
                      <br />
                      <Link href={"/other_repo_user/" + item.full_name}>
                        Другие пользователи
                      </Link>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Repo;
