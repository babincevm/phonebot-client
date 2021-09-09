import axios from "axios";
class HTTP {
  jwt = null;
  entityUrl = "";

  constructor({ entityUrl }) {
    this.entityUrl = entityUrl;
    this.axios = axios.create({
      baseURL: `${process.env.VUE_APP_BASE_API_URL}${entityUrl}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      responseType: "json",
      responseEncoding: "utf8",
    });
  }

  set jwt(value) {
    this.jwt = value;
  }

  async send({ method = "get", url = "/", data = {} }) {
    let response = await this.axios.request({
      method,
      url,
      data,
      headers: {
        jwt: this.jwt,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.data.error_message ?? "");
    }

    return response.data;
  }
}
export default HTTP;
