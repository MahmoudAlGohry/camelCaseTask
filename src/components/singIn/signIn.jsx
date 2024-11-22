import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./singIn.module.css";

function SignIn({ handleSignIn }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <main className={style.parentCon}>
        <section className={style.formParent}>
          <h1 className="text-8xl font-semibold">Sign In</h1>
          <form className="w-full" onSubmit={handleSignIn}>
            <div className="grid gap-4 grid-cols-1 w-full ">
              <div>
                <label htmlFor="userName" className={style.formLabel}>
                  User Name
                </label>
                <input type="text" name="userName" id="userName" placeholder="mahmoud12" className={style.formInput} />
              </div>
              <div>
                <label htmlFor="password" className={style.formLabel}>
                  Password
                </label>
                <input type="password" name="password" id="password" placeholder="******" className={style.formInput} />
              </div>
              <button type="submit" className={style.formBtn}>
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
}

export default SignIn;
