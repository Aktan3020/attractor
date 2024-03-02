import React from "react";
import { Breadcrumb, Layout, Typography, Spin,Card } from "antd";
import { useParams } from "react-router-dom";
import api from "../../api/api";
const { Content } = Layout;
const UserDetails = ({ messageApi }) => {
  const { user_name } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await api.getDefaultUserRepos(user_name);
        setData(data.items);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        messageApi.open({
            type:'error',
            text:'Произолша ошибка!'
        })
      }
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
          <Breadcrumb.Item>other_users</Breadcrumb.Item>
          <Breadcrumb.Item>user_detail</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
          }}
        >
          <Typography.Title level={4}>Login:{user_name}</Typography.Title>
          <div className="user_repos">
            {data.map((item,index) => {
              return (
                <Card
                  style={{ marginTop: 16 }}
                  key={index}
                >
                  <Typography.Title level={5}>Логин владельца:{item.owner.login}</Typography.Title>
                  <Typography.Title level={5}>Имя репозитория:{item.name}</Typography.Title>
                  <Typography.Title level={5}>Тип:публичный</Typography.Title>
                  <Typography.Link href={item.clone_url}>Ссылка на репозиторий</Typography.Link>
                  <br />
                  <Typography.Link href={item.owner.html_url}>Ссылка на владельца</Typography.Link>

                </Card>
              );
            })}
          </div>
        </div>
      </Content>
    </div>
  );
};

export default UserDetails;
