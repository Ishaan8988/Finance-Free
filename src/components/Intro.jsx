import { UserPlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import illustration from "../assets/illustration.jpg"
import { Form } from 'react-router-dom'

const Intro = () => {
  return (
    <div className='intro'>
        <div>
            <h1>
                Take Control of <span className='accent'>Your Money</span>
            </h1>
            <p>
                Peronal budgeting is the secret to financial freedom.
                Start budgeting and saving today. 
            </p>
            <Form
             method="post"
            >
                <input type="text" name="userName" required 
                placeholder='What is your name?' aria-label='Your Name' autoComplete='given-name'></input>
                <input  type='hidden' name="_action" value="newUser"  />
                <button type='submit' className='btn btn--dark'>
                    <span>Create Account</span>
                    <UserPlusIcon width={20}/>
                </button>
            </Form>

        </div>
        <img src={illustration} alt="Person with money" width={600}></img>
    </div>
  )
}

export default Intro