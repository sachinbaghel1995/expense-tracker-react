import React from 'react'
import classes from './ExpenseItem.module.css'

const ExpenseItem = (props) => {
    const editHandler = async() => {
        try{
          const res = await fetch(`https://expense-tracker-26afb-default-rtdb.firebaseio.com/${props.userEmail}expenses/${props.item.id}.json`,{
              method: 'DELETE'
          })
    
          if(res.ok) {
            //   props.edit(props.item);
            console.log('edit')
          }
        }
        catch(err) {
          console.log(err.message)
        }
      }
    
      const deleteHandler = async() => {
        try{
          const res = await fetch(`https://expense-tracker-26afb-default-rtdb.firebaseio.com/${props.userEmail}expenses/${props.item.id}.json`,{
            method: 'DELETE'
          })
    
          if(res.ok) {
            console.log('deleted successfully');
            
          }
        }
        catch(err) {
          console.log(err.message)
        }
      }
  return (
    <div className={classes.item}>
    <span className={classes.type}>{props.item.type}</span>
   <span className={classes.amount}>Rs. {props.item.amount}</span>
   <span className={classes.description}>{props.item.description}</span>
   <button onClick={deleteHandler}>delete</button>
   <button onClick={editHandler}>edit</button>
   
 </div>
  )
}

export default ExpenseItem