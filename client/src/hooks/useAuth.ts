export default function useAuth() {
  function getUsername() {
    const userName = localStorage.getItem("dashboardUsername");

    if (userName) return userName;
    return null;
  }

  function setUsername(username: string) {
    localStorage.setItem("dashboardUsername", username);
  }

  return { getUsername, setUsername };
}
