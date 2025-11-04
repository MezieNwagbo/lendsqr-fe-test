import "./Login.scss";
import logo from "../../assets/images/shared/logo_with_text.svg";

import { Link } from "react-router-dom";
import { loginCopy } from "../../constants/loginCopy";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const Login = () => {
  return (
    <main className="login">
      {/* Left Banner Section */}
      <section className="login__banner" aria-hidden="true">
        <header className="login__logo">
          <img src={logo} alt="Company Logo" />
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

          <form className="login__form-body" aria-labelledby="login-title">
            <div className="login__input-group">
              <Input
                name="email"
                type="email"
                placeholder={loginCopy.fields.email.placeholder}
                required
              />
            </div>

            <div className="login__input-group">
              <Input
                name="password"
                type="password"
                placeholder={loginCopy.fields.password.placeholder}
                required
              />
            </div>

            <Link to="">{loginCopy.forgotPasswordText}</Link>
            <Button type="submit">{loginCopy.buttonText}</Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
