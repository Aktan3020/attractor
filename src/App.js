import { Main, Profile,Repo,OtherUsers } from "./pages";
import { HeaderApp } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Layout,message} from 'antd'
import {UserDetails} from "./pages";
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <Router>  {contextHolder}
      <Layout>  
        <div style={{ height: "60px" }}>
          <HeaderApp />
        </div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile messageApi={messageApi} />} />
          <Route path="/repo" element={<Repo messageApi={messageApi} />} />
          <Route path="/other_users" element={<OtherUsers messageApi={messageApi} />} />
          <Route path="/other_users/:user_name" element={<UserDetails messageApi={messageApi} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
