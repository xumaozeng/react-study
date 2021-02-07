// 模拟登录接口
const LoginService = {
  login(userInfo) {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        if (userInfo.name === "xiaoxu") {
          reslove({ id: 123, name: "xiaoxu" });
        } else {
          reject({ err: { msg: "用户名或密码错误" } });
        }
      }, 1000);
    });
  },
  // 获取更多的信息
  getMoreUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.id === 123) {
          resolve({ ...userInfo, score: "100" });
        } else {
          reject({ msg: "获取详细信息错误" });
        }
      }, 1000);
    });
  }
};

export default LoginService;
