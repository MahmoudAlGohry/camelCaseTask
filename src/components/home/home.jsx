import { Link } from "react-router-dom";
import style from "./home.module.css";
import logo from "../../assets/logo.png";

export default function Home({ isLoggedIn }) {
  return (
    <>
      <main className={style.homeContainer}>
        <img src={logo} alt="logo" className="max-w-24" />
        <p className="text-2xl">Welcome to Tasky Wallet App - Your Personal Finance Companion!</p>
        <p className="text-2xl w-1/2 text-center">With Tasky Wallet, managing your money has never been easier. Whether you're adding funds, withdrawing, or tracking your transactions,we've got you covered. Our app allows you to create a personalized wallet</p>
        {isLoggedIn ? (
          <Link to="/dashboard">
            <button type="button" className={style.dashBoardBtn}>
              Dashboard
            </button>
          </Link>
        ) : (<Link to="/sign-in">
          <button type="button" className={style.SignInBtn}>
            Get Started
          </button>
        </Link>)}

      </main>
    </>
  );
}
