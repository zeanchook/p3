import debug from "debug";
// import { useNavigate } from "react-router-dom";
import { login } from "../../utilities/users-service";

const log = debug("mern:components:LoginForm");

export default function LoginForm({ setUser,setLoginState }) {
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    log("data: %o", data);
    const { email, password } = data;
    const user = await login(email, password);
    console.log("user")
    setUser(user);
  };

  return (
    <><form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>

        <label>
          Email:
          <input name="email" />
        </label>
        <br />

        <label>
          Password:
          <input name="password" />
        </label>
        <br />
        <button>Login</button>
      </fieldset>
    {/* eslint-disable-next-line react/no-unescaped-entities */}
    </form>Or don't have an account<button onClick={()=> setLoginState("signup")}>Signup</button></>
  );
}
