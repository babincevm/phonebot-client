import User from "./User";

const UserApi = new User({ entityUrl: "/user" });

export default {
  User: UserApi,
};
