import "./Login.scss";
import { useState, useEffect } from "react";
import { useLogin } from "../../features/auth/hooks/useLogin/useLogin";
import logo from "../../assets/images/shared/logo_with_text.svg";

import { Link } from "react-router-dom";
import { loginCopy } from "../../constants/loginCopy";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

import toast from "react-hot-toast";

const Login = () => {
  const { handleLogin, loading } = useLogin();

  const [email, setEmail] = useState({
    content: "",
    error: "",
  });
  const [password, setPassword] = useState({
    content: "",
    error: "",
  });

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({ ...email, error: "", content: e.target.value });
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, error: "", content: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.content || !password.content) {
      !email.content
        ? setEmail({ ...email, error: "Required" })
        : setPassword({ ...password, error: "Required" });

      return;
    }

    handleLogin({ email: email.content, password: password.content });
  };

  useEffect(() => {
    toast("Hi! Login with \nEmail: adedeji@lendsqr.com, \nPassword: test123", {
      id: "welcome-toast",
      duration: 7000,
    });
  }, []);

  return (
    <main className="login">
      {/* Left Banner Section */}
      <section className="login__banner" aria-hidden="true">
        <header className="login__logo">
          <img src={logo} alt="Company_Logo" />
        </header>

        <figure className="login__image-container">
          <div
            className="login__image"
            role="img"
            aria-label="Welcome illustration"
          ></div>
        </figure>
      </section>

      {/* Right Form Section */}
      <section className="login__form" aria-label="Login form section">
        <header className="login__logo-absolute">
          <img src={logo} alt="Company Logo" />
        </header>
        <div className="login__form-wrapper">
          <header className="login__header">
            <h1 className="login__title">{loginCopy.title}</h1>
            <p className="login__subtitle">{loginCopy.subtitle}</p>
          </header>

          <form
            onSubmit={onSubmit}
            className="login__form-body"
            aria-labelledby="login-title"
          >
            <div className="login__input-group">
              <Input
                name="email"
                type="email"
                value={email.content}
                onChange={handleInputEmail}
                placeholder={loginCopy.fields.email.placeholder}
                required
                error={email.error}
              />
            </div>

            <div className="login__input-group">
              <Input
                name="password"
                type="password"
                value={password.content}
                onChange={handleInputPassword}
                placeholder={loginCopy.fields.password.placeholder}
                required
                error={password.error}
              />
            </div>

            <Link to="">{loginCopy.forgotPasswordText}</Link>
            <Button type="submit" disabled={loading}>
              {loading ? loginCopy.button.loading : loginCopy.button.label}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
