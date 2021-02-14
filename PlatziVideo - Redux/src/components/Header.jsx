import React from "react";
import classNames from "classnames";
import gravatar from "../utils/gravatar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutRequest } from "../actions";

import "../assets/styles/components/header.scss";
import logo from "../assets/static/logo-platzi-video-BW2.png";
import userIcon from "../assets/static/user-icon.png";

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;
  const handleLogout = () => {
    props.LogoutRequest({});
  };
  const headerClass = classNames("header", {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {hasUser ? (
            <img src={gravatar(user.email)} alt={user.email} />
          ) : (
            <img src={userIcon} alt="" />
          )}

          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ? (
            <>
              <li>
                <a href="/">{user.name}</a>
              </li>
              <li>
                <a href="#logout" onClick={handleLogout}>
                  Cerrar Sesión
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  LogoutRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
