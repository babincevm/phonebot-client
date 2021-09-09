import Api from "@/api";
const User = Api.User;

export default {
  async authorize({ commit }, userLoginData) {
    console.log(User);
    let data = await User.authorize(userLoginData);
    console.log(data);
    commit("setUserData", data);
  },
};
