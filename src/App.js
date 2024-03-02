import { Main, Profile,Repo,OtherUserRepo } from "./pages";
import { HeaderApp } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Layout,message} from 'antd'
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
          <Route path="/other_repo_user/:name/:repo_name" element={<OtherUserRepo messageApi={messageApi} />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
