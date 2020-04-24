

const login = () => {
  const email = $("#email").val();
  const password = $("#psw").val();

  const data = {
    email: email,
    password: password
  }

  axios.post('https://oud-zerobase.me/api/v1/users/login', data)
    .then(res => {
      localStorage.setItem("token", res.headers['x-auth-token']);
      location.href = 'index.html';
    })
    .catch(err => {
      if (err.response)
        $("#error").text(err.response.data.message);
    });
};

$(() => {
  $("#login-btn").click(() => {
    login();
  });

  $(document).on('keypress', function (e) {
    if (e.which == 13) {
      login();
    }
  });
});