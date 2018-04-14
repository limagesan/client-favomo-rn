class Api {
  constructor() {}

  get() {
    return fetch("https://api-server-favomo.herokuapp.com/api/users/")
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default Api;
