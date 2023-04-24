import React from 'react'
import { useRef ,useEffect} from 'react'
import classes from './Expenses.module.css'
import ExpenseContext from '../store/expense-context'
import { useContext } from 'react'
import ExpenseItem from './ExpenseItem'


const Expenses = (props) => {
    let userEmail;
  if (localStorage.getItem('tokenId')) {
    userEmail = JSON.parse(localStorage.getItem('tokenId')).email;
    userEmail = userEmail.replace(/[@.]/g, '');
  }
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
        fetch(
            'https://expense-tracker-26afb-default-rtdb.firebaseio.com/undefinedexpenses.json',
            {
              method: 'POST',
              body: JSON.stringify(expenses),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          amountRef.current.value = '';
          descriptionRef.current.value = '';
          typeRef.current.value = ''
          expenseCtx.addExpense(expenses)
        }
          useEffect(() => {
            const getItems = async () => {
             
                try {
                  const res = await fetch(
                    `https://expense-tracker-26afb-default-rtdb.firebaseio.com/${userEmail}undefinedexpenses.json`
                  );
        
                  const data = await res.json();
                  if (res.ok) {
                    let retrievedData = [];
                    
        
                    for (let key in data) {
                      retrievedData.push({ id: key, ...data[key] });
                      
                    }
                  
                  } else {
                    throw data.error;
                  }
                } catch (err) {
                  console.log(err.message);
                }
              }
            
            getItems();
          })
    

    
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