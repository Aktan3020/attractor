import React from "react";
import { Layout, Breadcrumb, Typography, Input, Card, Image,Spin } from "antd";
import api from "../../api/api";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Title, Paragraph } = Typography;

const { Search } = Input;
const OtherUsers = ({ messageApi }) => {
  const [searchValue, setSearchValue] = React.useState("Q");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (searchValue.trim() !== "") {
        setLoading(true);
        const data = await api.searchUsers(searchValue);
        setData(data.items);
        setLoading(false);
      } else {
        messageApi.open({
          type: "error",
          content: "Не корректные данные для поиска!",
        });
      }
    })();
  }, [searchValue]);
  const searchUsers = (e) => {
    setSearchValue(e.target.value);
  };
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
          <Breadcrumb.Item>otherUsers</Breadcrumb.Item>
        </Breadcrumb>

        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
          }}
        >
          <Search
            placeholder="input search loading with enterButton"
            enterButton
            loading={loading}
            onChange={searchUsers}
          />
          <br />
          <br />
          <div
            className="users"
            style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          >
            {!loading
              ? data.map((item,index) => {
                  return (
                    <Card
                    key={index}
                      title={"login:" + item.login}
                      extra={
                        <Link to={"/other_users/" + item.login}>More</Link>
                      }
                      style={{ width: 300 }}
                    >
                      <Image width={80} src={item.avatar_url} />
                    </Card>
                  );
                })
              :  <Spin style={{ margin: "50px auto", display: "block" }} />}
          </div>
        </div>
      </Content>
    </div>
  );
};

export default OtherUsers;
