import axios from "axios";

class HTTP {
  _jwt = null;
  _entityUrl = "";

  constructor({ entityUrl }) {
    this._entityUrl = entityUrl;
    this._axios = axios.create({
      baseURL: `${process.env.VUE_APP_BASE_API_URL}${entityUrl}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      responseType: "json",
      responseEncoding: "utf8",
    });
  }

  set jwt(value) {
    this._jwt = value;
  }

  async send({ method = "get", url = "/", data = {} }) {
    let response = await this._axios.request({
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
