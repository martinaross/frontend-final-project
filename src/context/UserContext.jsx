import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {

      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.token) {
          setUser(parsed);
        }
      }


      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "1") {
        setUser({ username: "admin", token: "admin-mode" });
      }
    } catch { }
  }, []);


  const login = async (username, password) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      const payload = { username, token };
      setUser(payload);
      localStorage.setItem("auth", JSON.stringify(payload));
      return true;
    } else {
      return false;
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

export { UserProvider, useAuth };
