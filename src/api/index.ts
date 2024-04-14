import axios from "axios";

// const base_url = "http://localhost:8000/api/";
const base_url = "https://real-estate-backend-tawny.vercel.app/api/";

// Register
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post(`${base_url}auth/register/`, {
      username,
      email,
      password,
    });
    if (res.status === 201) {
      return "OK";
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.log(error);
    return "Registration failed";
  }
};

// Login
export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(
      `${base_url}auth/login/`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      return res;
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    console.log(error);
    return "Login failed";
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await axios.post(`${base_url}auth/logout/`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return "OK";
    } else {
      throw new Error("Logout Failed");
    }
  } catch (error) {
    console.log(error);
    return "Logout Failed";
  }
};
