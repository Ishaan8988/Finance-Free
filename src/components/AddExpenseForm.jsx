import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useFetcher } from 'react-router-dom'

 const AddExpenseForm = ({budgets}) => {
  const fetcher =useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(()=>{
    if(!isSubmitting){
      formRef.current.reset()  //clearform
      focusRef.current.focus() //resetfocus
    }
  }, [isSubmitting])

  return (
    <div className='form-wrapper'>
        <h2 className='h3'> Add new {" "}<span  className='accent' >{budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
            </span> {" "} Expense
        </h2>
        <fetcher.Form method="post" className='grid-sm' ref={formRef}>
            <div className='expense-inputs'>
                <div className="grid-sm">
                    <label htmlFor='newExpense'>Expense Name</label>
                    <input type="text" name="newExpense" id="newExpense" placeholder='e.g., Coffee' ref={focusRef} required></input>
                </div>
                <div className="grid-sm">
                    <label htmlFor='newExpenseAmount'>Amount</label>
                    <input type="number" step="0.01" inputMode='decimal' name="newExpenseAmount" id="newExpenseAmount" placeholder='e.g., 3.50'  required></input>
                </div>
            </div>
            <div className="grid-xs" hidden={budgets.length === 1}>
                <label htmlFor='newExpenseBudget'>Budget Category</label>
                <select name="newExpenseBudget" id="newExpenseBudget" required>
                    {
                        budgets.sort((a,b) => a.createdAt - b.createdAt)
                        .map((budgets) => <option key="budget.id" value={budgets.id}>{budgets.name}</option>)
                    }
                </select>
            </div>
            <input type="hidden" name='_action' value="createExpense"></input>
            <button
              disabled={isSubmitting}
              type="submit"
              className='btn btn--dark'
              >
                {
                  isSubmitting ? <span>Submitting</span> : (
                    <>
                      <span>Add Expense</span>
                      <PlusCircleIcon width={20}/>
                    </>
                  )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm
