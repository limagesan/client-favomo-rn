class Api {
  get() {
    return fetch('https://api-server-favomo.herokuapp.com/api/users/')
      .then(response => response.json())
      .then(responseJson => responseJson)
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Api;
