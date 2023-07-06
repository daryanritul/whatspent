import React, { useState } from 'react'
import sty from './Authentication.module.scss'

import logoLg from '../../assets/logo-full.svg'

const Authentication = () => {
    const [authSwitch, setAuthSwitch] = useState(false);
  return (
    <div className={sty.app}>
        <div className={sty.auth}>
            <div className={sty.logo}>
                <img src={logoLg} alt="" />
            </div>
            <div className={sty.switch}>
                <div className={authSwitch && sty.active}
                onClick={() => setAuthSwitch(!authSwitch)}
                >
                    Login
                </div>
                <div className={!authSwitch && sty.active}
                    onClick={() => setAuthSwitch(!authSwitch)}
                >
                   Register
                </div>
            </div>
            <div className={sty.subtitle}>
               {authSwitch ? <div>Create your new Account.</div>:  <div>Enter your details to Login</div>  }
            </div>
            <form action="">
                <div className={sty.inputBox}>
                <label htmlFor="">Email</label>
                <input type="email" 
                placeholder='Email Address'
                />
                </div>
                <div className={sty.inputBox}>
                <label htmlFor="">Password</label>
                <input type="password" 
                placeholder='Password'
                />
                </div>
                {authSwitch && 
                <div className={sty.inputBox}>
                <label htmlFor="">Password</label>
                <input type="password" 
                placeholder='Confirm Password'
                />
                </div>
                }
                <button>
                    {authSwitch ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Authentication