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

  async getProfile() {
    // https://jsonplaceholder.typicode.com/users/1
    try {
      let data = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await data.json();
    } catch (e) {
      console.log(e);
    }
  }
}

export default User;
