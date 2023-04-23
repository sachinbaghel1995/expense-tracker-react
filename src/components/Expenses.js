import React from 'react'
import { useRef } from 'react'
import classes from './Expenses.module.css'
import ExpenseContext from '../store/expense-context'
import { useContext } from 'react'
import ExpenseItem from './ExpenseItem'

const Expenses = (props) => {
    const expenseCtx=useContext(ExpenseContext)
    const amountRef = useRef();
    const typeRef = useRef();
    const descriptionRef = useRef()
    const addExpenseHandler=(event)=>{
        event.preventDefault()
        const expenses={
            amount:amountRef.current.value,
            description:descriptionRef.current.value,
            type:typeRef.current.value,
        }
expenseCtx.addExpense(expenses)

    
    }
    
  return (
    <div>
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
            <input type='number' min='0' step='10' ref={amountRef} required />
          </div>
          <div className={classes.description}>
            <label>Expense Description: </label>
            <textarea type='text' ref={descriptionRef} required />
          </div>
          <div className={classes.button}>
            <button type='submit'>Add Expense</button>
          </div>
        </form>
        <div>
        {expenseCtx.expenses.map((item) => (
        <li key={item.description}>
         {item.type}-
         {item.description}-
        {item.amount}
       
       
       </li>
      ))}
      </div>
    </div>
  )
}

export default Expenses