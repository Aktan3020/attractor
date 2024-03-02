import React from "react";
import {Layout,Breadcrumb} from 'antd'
import {useParams} from 'react-router-dom'
import api from "../../api/api";
const {Content} = Layout    
const OtherUserRepo = () => {
    const {name} = useParams()
    console.log(name);
    React.useEffect(()=>{
        const data = api.getContrabationsRepo(name)
        console.log(data);
    },[])
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
          <Breadcrumb.Item>OtherUserRepo</Breadcrumb.Item>
        </Breadcrumb>

        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
            display: "flex",
            justifyContent: "space-between",
          }}
        ></div>
      </Content>
    </div>
  );
};

export default OtherUserRepo;
