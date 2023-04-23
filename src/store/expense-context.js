import React, { useState } from 'react'

const ExpenseContext = React.createContext({
    expenses:[],
    addExpense:(item)=>{}
})
export const ExpenseContextProvider=(props)=>{
    const [expenses,setExpenses]=useState([])
    const addExpenseHandler=(item)=>{
setExpenses((prevExpense)=>{
    const updatedExpense=prevExpense.concat(item)
    return updatedExpense
})
    }
    const expensesContext={
expenses:expenses,
addExpense:addExpenseHandler
    }
    return(
        <ExpenseContext.Provider value={expensesContext}>{props.children}</ExpenseContext.Provider>
    )
}
export default ExpenseContext