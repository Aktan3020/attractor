const clientId = "1768802caff5f6e9bf7e";

const getAccessToken = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const response = await fetch(
    "http://localhost:4000/access_token?code=" + code
  );
  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }
};
const getUserProfile = async () => {
  return getAccessToken().then(async () => {
    const response = await fetch("http://localhost:4000/userProfile", {
      method: "GET",
      headers: {
        Authorization: "token " + localStorage.getItem("access_token"),
      },
    });
    const data = await response.json();
    return data;
  });
};

const changeUserProfile = async (changeData) => {
  await fetch("https://api.github.com/user", {
    method: "PATCH",
    headers: {
      accept: "application/vnd.github.v3+json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    body: JSON.stringify(changeData),
  });
};
const loginForGitHub = async () => {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,repo,metadata  `
  );
};

const getUserRepos = async (name) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=user:`+name, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
  const data = await response.json();
  return data;
};
const getDefaultUserRepos = async (name) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=user:`+name);
  const data = await response.json();
  return data;
};

const searchUsers = async (searchValue) => {
 const response  =await fetch(`https://api.github.com/search/users?q=`+searchValue)
  const data =await response.json()
  return data
};

const api = {
  loginForGitHub,
  getAccessToken,
  getUserProfile,
  changeUserProfile,
  getUserRepos,
  searchUsers,
  getDefaultUserRepos
};

export default api;
