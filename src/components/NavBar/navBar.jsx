import { Link } from "react-router-dom";
import style from "./navBar.module.css";

function NavBar({ isLoggedIn, handleSignOut }) {
  return (
    <>
      <nav className={style.parentCom}>
        <Link to="/">
          <p className={style.logoTitle}>Tasky Wallet</p>
        </Link>
        {isLoggedIn ? (
          <div>
            <Link to="/dashboard">
              <button className={style.dashBoardBtn}>Dashboard</button>
            </Link>
            <button className={style.SignOutBtn} onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <Link to="/sign-in">
            <button className={style.SignInBtn}>Sign in</button>
          </Link>
        )}


      </nav>
    </>
  );
}

export default NavBar;
