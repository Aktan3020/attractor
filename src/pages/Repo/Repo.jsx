import React from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Layout, Breadcrumb, Card, Typography, Switch } from "antd";
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
      setData(repos.items);
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
            {data.map((item,index) => {
              if (item.private === false && publicrep) {
                return (
                  <div className="card_repo" style={{ width: "45%" }} key={index}>
                    <Card
                      style={{ marginTop: 16 }}
                    >
                      <Title level={5}>
                        Логин владельца:{item.owner.login}
                      </Title>
                      <Title level={5}>Имя репозитория:{item.name}</Title>
                      <Title level={5}>Тип:публичный</Title>
                      <Link href={item.clone_url}>Ссылка на репозиторий</Link>
                     
                    </Card>
                  </div>
                );
              } else if (item.private && !publicrep) {
                return (
                  <div className="card_repo" style={{ width: "45%" }} key={index}>
                    <Card
                      style={{ marginTop: 16 }}
                    >
                      <Title level={5}>
                        Логин владельца:{item.owner.login}
                      </Title>
                      <Title level={5}>{item.name}</Title>
                      <Title level={5}>Тип:Приватный</Title>
                      <Link href={item.clone_url}>Ссылка на репозиторий</Link>
                      
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
