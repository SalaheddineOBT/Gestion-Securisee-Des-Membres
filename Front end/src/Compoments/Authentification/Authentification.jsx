import React,{Component} from "react";

export default class Athentification extends Component{
    render(){
        return(
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="SignUp">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign Up</label>
                        <input type="text" name="username" placeholder="UserName" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <input type="password" name="confirm" placeholder="Confirmer Password" required />
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className="Login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="lemail" placeholder="Email" required />
                        <input type="password" name="lpassword" placeholder="Password" required />
                        <button>Login</button>
                    </form>
                </div>

            </div>
        )
    }
}