export default function useAuth() {
  function getUsername() {
    const username = localStorage.getItem("dashboardUsername");

    if (username) return username;
    return null;
  }

  async function setUsername(username: string) {
    try {
      const response = await fetch("http://localhost:8080/auth/login-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (response.status === 200) {
        localStorage.setItem("dashboardUsername", username);
      } else {
        console.error("something went wrong logging in");
      }
    } catch (error) {
      console.error("something went wrong logging in");
    }
  }

  async function removeUsername() {
    const username = localStorage.getItem("dashboardUsername");

    try {
      const response = await fetch("http://localhost:8080/auth/logout-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (response.status === 200) {
        localStorage.removeItem("dashboardUsername");
      } else {
        console.error("something went wrong logging out");
      }
    } catch (error) {
      console.error("something went wrong logging out");
    }
  }

  return { getUsername, setUsername, removeUsername };
}
