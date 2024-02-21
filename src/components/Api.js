export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "d918969b-47fa-4f72-8138-61be6ab55840",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // function to update user info
  fetchDataForRender() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
