import HTTP from "./HTTP";

class User extends HTTP {
  constructor({ entityUrl }) {
    super({ entityUrl });
  }

  async authorize({ login, password }) {
    try {
      let data = await this.send({
        method: "post",
        url: "/auth",
        data: {
          login,
          password,
        },
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
export default User;
