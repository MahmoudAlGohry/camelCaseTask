import React, { useState, useEffect } from "react";
import Loading from "../Loading/loading";
import style from "./dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newAmount, setNewAmount] = useState(0);
  const [showGamificationModal, setShowGamificationModal] = useState(false);
  const [progress, setProgress] = useState({ milestone100: 0, milestone500: 0, milestone1000: 0 });

  // get current user from localStorage 
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setTransactions(parsedUser.transactions || []);
      updateProgress(parsedUser.totalAdded || parsedUser.balance);
    }
  }, []);

  // Update progress for gamification 
  const updateProgress = (totalAdded) => {
    const milestone100 = Math.max(Math.min((totalAdded / 100) * 100, 100), 0);
    const milestone500 = Math.max(Math.min(((totalAdded - 100) / 400) * 100, 100), 0);
    const milestone1000 = Math.max(Math.min(((totalAdded - 500) / 500) * 100, 100), 0);
    setProgress({ milestone100, milestone500, milestone1000 });
  };

  // Handle add funds
  const handleAddFunds = () => {
    if (user) {
      const newTransaction = {
        type: "add",
        amount: amount,
        date: new Date().toLocaleString(),
        timestamp: new Date().getTime(),
      };
      let updatedBalance = user.balance + amount;
      let totalAdded = (user.totalAdded || 0) + amount;
      let bonusMessage = "";

      // Gamification rewards
      if (user.bonusRewards?.includes(100) !== true && totalAdded >= 100) {
        updatedBalance += 5;
        totalAdded += 5;
        bonusMessage = "Congratulations! You've earned a $5 bonus for reaching $100 in your wallet.";
        user.bonusRewards = [...(user.bonusRewards || []), 100];
      } else if (user.bonusRewards?.includes(500) !== true && totalAdded >= 500) {
        updatedBalance += 20;
        totalAdded += 20;
        bonusMessage = "Congratulations! You've earned a $20 bonus for reaching $500 in your wallet.";
        user.bonusRewards = [...(user.bonusRewards || []), 500];
      } else if (user.bonusRewards?.includes(1000) !== true && totalAdded >= 1000) {
        updatedBalance += 50;
        totalAdded += 50;
        bonusMessage = "Congratulations! You've earned a $50 bonus for reaching $1000 in your wallet.";
        user.bonusRewards = [...(user.bonusRewards || []), 1000];
      }

      const updatedUser = {
        ...user,
        balance: updatedBalance,
        totalAdded: totalAdded,
        transactions: [...transactions, newTransaction],
      };
      setUser(updatedUser);
      setTransactions(updatedUser.transactions);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      updateProgress(totalAdded);

      if (bonusMessage) {
        toast.success(bonusMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    setAmount(0);
  };

  // Handle withdraw funds
  const handleWithdrawFunds = () => {
    if (user && amount <= user.balance) {
      const newTransaction = {
        type: "withdraw",
        amount: amount,
        date: new Date().toLocaleString(),
        timestamp: new Date().getTime(),
      };
      const updatedUser = {
        ...user,
        balance: user.balance - amount,
        transactions: [...transactions, newTransaction],
      };
      setUser(updatedUser);
      setTransactions(updatedUser.transactions);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
    setAmount(0);
  };

  // Handle edit transaction
  const handleEditTransaction = (index) => {
    const transaction = transactions[index];
    const currentTime = new Date().getTime();
    if (currentTime - transaction.timestamp <= 5 * 60 * 1000) {
      // Open modal to edit transaction
      setEditIndex(index);
      setNewAmount(transaction.amount);
      setShowModal(true);
    } else {
      toast.warn("You can only edit transactions within 5 minutes", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Handle save edited transaction
  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedTransactions = [...transactions];
      const transaction = updatedTransactions[editIndex];
      const parsedNewAmount = parseFloat(newAmount);

      // Update transaction
      updatedTransactions[editIndex] = {
        ...transaction,
        amount: parsedNewAmount,
        date: new Date().toLocaleString(),
      };

      // Calculate new balance
      let newBalance = user.balance;
      if (transaction.type === "add") {
        newBalance = user.balance - transaction.amount + parsedNewAmount;
      } else if (transaction.type === "withdraw") {
        newBalance = user.balance + transaction.amount - parsedNewAmount;
      }

      const updatedUser = {
        ...user,
        balance: newBalance,
        transactions: updatedTransactions,
      };
      setUser(updatedUser);
      setTransactions(updatedUser.transactions);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setShowModal(false);
      setEditIndex(null);
    }
  };

  return (
    <>
      {user ? (
        <>
          <main className="grid grid-cols-3 w-full ">
            {/* side section gamification */}
            <section className={`${style.sideSection} max-h-96`}>
              <h3 className={style.secTitleText}>Gamification</h3>
              <div className="flex flex-col items-center justify-center align-middle gap-8">
                {/* progress bar 1 */}
                <div className="flex flex-row items-center justify-center align-middle gap-2 w-full">
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="bg-green-600 text-md font-medium text-green-100 text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${progress.milestone100}%` }}
                    >
                      {progress.milestone100.toFixed(0)}%
                    </div>
                  </div>
                  <p className="text-2xl text-green-500">5$</p>
                </div>
                {/* progress bar 2 */}
                <div className="flex flex-row items-center justify-center align-middle gap-2 w-full">
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="bg-green-600 text-md font-medium text-green-100 text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${progress.milestone500}%` }}
                    >
                      {progress.milestone500.toFixed(0)}%
                    </div>
                  </div>
                  <p className="text-2xl text-green-500">20$</p>
                </div>
                {/* progress bar 3 */}
                <div className="flex flex-row items-center justify-center align-middle gap-2 w-full">
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="bg-green-600 text-md font-medium text-green-100 text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${progress.milestone1000}%` }}
                    >
                      {progress.milestone1000.toFixed(0)}%
                    </div>
                  </div>
                  <p className="text-2xl text-green-500">50$</p>
                </div>
                {/* btn model details */}
                <button
                  className="ml-4 text-white bg-blue-400 hover:bg-blue-700 dark:bg-blue-500 font-semibold text-base rounded-lg px-5 py-2.5 text-center mb-5"
                  onClick={() => setShowGamificationModal(true)}
                >
                  Show Rewards Details
                </button>
              </div>
            </section>
            {/* main section balance */}
            <section className={`${style.sideSection} max-h-96`}>
              <h1 className={style.secTitleText}>Welcome, {user.name}!</h1>
              <p className="text-3xl text-center">Balance: {+user.balance.toFixed(2)} $</p>
              <div className="flex flex-col items-center mt-4 mb-4">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter amount"
                  className={style.amountInput}
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                />
                <div className="mt-4 flex flex-row gap-4">
                  <button
                    className="text-white bg-green-400 hover:bg-green-700 dark:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleAddFunds}
                  >
                    Add Funds
                  </button>

                  <button
                    type="button"
                    className={`${amount > user.balance ? style.disAcvtiveBtn : style.activeBtn}`}
                    onClick={handleWithdrawFunds}
                    disabled={amount > user.balance}
                  >
                    Withdraw Funds
                  </button>
                </div>
              </div>
            </section>
            {/* side section transactions */}
            <section className={style.sideSection}>
              <h3 className={style.secTitleText}>Transactions</h3>
              <ul className="space-y-4">
                {transactions.map((transaction, index) => (
                  <li key={index} className="flex items-center justify-between p-2 rounded-lg">
                    {transaction.type === "add" ? (
                      <div className="flex items-center text-green-500">
                        <span>+${transaction.amount.toFixed(2)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <span>-${transaction.amount.toFixed(2)}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-400">{transaction.date}</span>

                    <button
                      className="ml-4 text-white bg-yellow-400 hover:bg-yellow-700 dark:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleEditTransaction(index)}
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </main>

          {/* Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-[#333333] p-6 rounded-lg w-1/3 shadow-lg flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(+e.target.value)}
                  className={style.amountInput}
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gamification Modal */}
          {showGamificationModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-[#333333] p-6 rounded-lg w-1/3 shadow-lg">
                <h2 className="text-3xl text-center font-bold mb-4">Gamification Rewards</h2>
                <div className="text-left">
                  <ul className="list-disc pl-5">
                    <li className="mb-2">Add $100 to the wallet: reward $5 bonus funds (One-time reward per Account).</li>
                    <li className="mb-2">Add $500 to the wallet: reward $20 bonus funds (One-time reward per Account).</li>
                    <li className="mb-2">Add $1000 to the wallet: reward $50 bonus funds (One-time reward per Account).</li>
                  </ul>
                  <p className="mb-2 text-red-700 text-md font-semibold">
                    <span className="text-xl font-bold">Caution:</span> Each reward is given only once, and rewards must be claimed in order. Even if you add $1,000 in one transaction, you will need to unlock each reward step-by-step.
                  </p>
                  <p className="mt-4 text-sm text-gray-400">Note: Each reward can only be claimed once per Account.</p>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowGamificationModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}

      <ToastContainer />
    </>
  );
}

export default Dashboard;
