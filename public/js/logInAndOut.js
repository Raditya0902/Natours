const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err);
  }
};

const loginForm = document.querySelector(".form--login");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //console.log(email, password);
    login(email, password);
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") location.reload(true);
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};

const logoutBtn = document.querySelector(".nav__el--logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
