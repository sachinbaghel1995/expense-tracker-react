import React from 'react'
import classes from './ExpenseItem.module.css'

const ExpenseItem = (props) => {
  return (
    <div className={classes.item}>
    <span className={classes.type}>{props.item.type}</span>
   <span className={classes.amount}>Rs. {props.item.amount}</span>
   <span className={classes.description}>{props.item.description}</span>
   
 </div>
  )
}

export default ExpenseItem