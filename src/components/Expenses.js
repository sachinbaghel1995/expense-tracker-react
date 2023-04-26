import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Expenses.module.css";
import ExpenseItems from "./ExpenseItems";
import { expenseAction } from "../store/expenseSlice";
import { Fragment } from "react";

const Expenses = () => {
  

  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);


  const email = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = email.replace(/[@.]/g, "");
 

  const addExpenseHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `https://expense-tracker-26afb-default-rtdb.firebaseio.com//${emailUrl}expenses.json`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: amountRef.current.value,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        const newData = {
          amount: amountRef.current.value,
          type: typeRef.current.value,
          description: descriptionRef.current.value,
        };
        dispatch(
          expenseAction.addExpense({
            expenses: [newData],
            totalAmount: newData.amount,
          })
        );
        amountRef.current.value = "";
        typeRef.current.value = "";
        descriptionRef.current.value = "";
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // showing expenses when page is refreshed
  useEffect(() => {
    const getItems = async () => {
      if (expenseList.length === 0) {
        try {
          const res = await fetch(
            `https://expense-tracker-26afb-default-rtdb.firebaseio.com//${emailUrl}expenses.json`
          );

          const data = await res.json();
          if (res.ok) {
            let retrievedData = [];
            let totalAmount = 0;

            for (let key in data) {
              retrievedData.push({ id: key, ...data[key] });
              totalAmount = Number(totalAmount) + Number(data[key].amount);
            }
            dispatch(
              expenseAction.addExpense({
                expenses: retrievedData,
                totalAmount: totalAmount,
              })
            );
          } else {
            throw data.error;
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    getItems();
  }, [emailUrl, dispatch, expenseList.length]);

  // editing the expense
  const edit = (item) => {
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== item.id
    );
    amountRef.current.value = item.amount;
    typeRef.current.value = item.type;
    descriptionRef.current.value = item.description;

    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
  };

  // deleting the expense
  const deleted = (item) => {
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== item.id
    );
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
  };

  //mapping the expense
  const newExpenseList = expenseList.map((item) => (
    <ExpenseItems
      item={item}
      key={item.id}
      edit={edit}
      deleted={deleted}
      emailUrl={emailUrl}
    />
  ));

  // creating the csv file to download

  // dark mode handler

  

  //returning the component
  return (
    <>
      <form className={classes.form} onSubmit={addExpenseHandler}>
        <div className={classes.type}>
          <label>Expense Category: </label>
          <select ref={typeRef} required>
            <option>Food</option>
            <option>OTT</option>
            <option>Games</option>
            <option>Movies</option>
            <option>Groceries</option>
          </select>
        </div>
        <div className={classes.amount}>
          <label>Expense Amount: </label>
          <input type="number" min="0" step="10" ref={amountRef} required />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type="text" ref={descriptionRef} required />
        </div>
        <div className={classes.button}>
          <button type="submit">Add Expense</button>
        </div>
      </form>
      {expenseList.length > 0 && (
        <div className={classes.items}>
          <div className={classes.title}>
            <span className={classes.titletype}>Type</span>
            <span className={classes.titleamount}>Amount</span>
            <span className={classes.titledescription}>Description</span>
          </div>
          {newExpenseList}
          <div className={classes.total}>Total = Rs.{totalAmount}</div>
        </div>
      )}
    </>
  );
};
export default Expenses;
