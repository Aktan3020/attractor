import React from "react";
import classes from "./profile.module.css";
import api from "../../api/api";
import { Spin, Layout, Breadcrumb, Image, Button } from "antd";
import { Typography, message } from "antd";
import { useNavigate ,redirect } from "react-router-dom";
const { Title, Paragraph, Link } = Typography;

const { Content } = Layout;
const Profile = ({ messageApi }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [editData, setEditData] = React.useState({});
  const navigate = useNavigate();
  React.useEffect(() => {
    (async () => {
      const data = await api.getUserProfile();
      if (localStorage.getItem("access_token") == null) {
        messageApi.open({
          type: "error",
          content: "Вы не зарегистрированы ",
        });
        navigate("/")
      }
      setData(data);
      setLoading(false);
      console.log(data);
      setEditData({
        name: data.name,
        email: data.email,
        blog: data.blog,
        twitter_username: data.twitter_username,
        company: data.company,
        location: data.location,
        hireable: data.hireable,
        bio: data.bio,
      });
    })();
  }, []);

  console.log(editData);

  const saveEditData = (target, value) => {
    console.log(value);
    const newObj = { ...editData };
    newObj[target] = value;
    console.log("obj", newObj);
    setEditData(newObj);
    console.log(editData, "///");
  };

  if (loading) {
    return <Spin style={{ margin: "50px auto", display: "block" }} />;
  }
  return (
    <div className={classes.profile}>
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
          <Breadcrumb.Item>profile</Breadcrumb.Item>

        </Breadcrumb>

        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Title level={3}>Ваш логин:</Title>
            <Paragraph copyable={{ text: data.login }}>{data.login}</Paragraph>
            <Title level={3}>Ваше имя:</Title>
            <Paragraph
              copyable={{ text: editData.name }}
              editable={{ onChange: (val) => saveEditData("name", val) }}
            >
              {editData.name ? editData.name : "отсутствует"}
            </Paragraph>
            <Title level={3}>Ваш email:</Title>
            <Paragraph copyable={{ text: data.email }}>
              {data.email ? data.email : "отсутсвует"}
            </Paragraph>
            <Title level={3}>Ваша комания:</Title>
            <Paragraph
              copyable={{ text: editData.company }}
              editable={{ onChange: (val) => saveEditData("company", val) }}
            >
              {editData.company ? editData.company : "отсутсвует"}
            </Paragraph>
            <Title level={3}>Ваше местоположение:</Title>
            <Paragraph
              copyable={{ text: editData.location }}
              editable={{ onChange: (val) => saveEditData("location", val) }}
            >
              {editData.location ? editData.location : "отсутсвует"}
            </Paragraph>
            <Title level={3}>Ваше био:</Title>
            <Paragraph
              copyable={{ text: editData.bio }}
              editable={{ onChange: (val) => saveEditData("bio", val) }}
            >
              {editData.bio ? editData.bio : "отсутсвует"}
            </Paragraph>
            <Link href={data.html_url} target="_blank">
              Ссылка на Профиль
            </Link>
            <hr style={{ margin: "10px 0" }} />
            <Button onClick={() => api.changeUserProfile(editData)} style={{width:'400px',height:'60px'}}>
              Сохранить изменения!
            </Button>
            <p>Осторожно! Ваши данные github изменяться</p>
          </div>
          <div>
            <Title level={1}>Ваш Автар:</Title>
            <Image width={400} src={data.avatar_url} />
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Profile;
