import React,{Component} from "react";

export default class Athentification extends Component{
    state={
        activelogin:false,
        activesignup:true
    }

    toogleSinUp=()=>{
        const {activesignup}=this.state;
        this.setState({activesignup:!activesignup});
        const {activelogin}=this.state;
        this.setState({activelogin:!activelogin});
    }

    toogleLogin=()=>{
        const {activesignup}=this.state;
        this.setState({activesignup:!activesignup});
        const {activelogin}=this.state;
        this.setState({activelogin:!activelogin});
    }

    SignUp=(e)=>{
        e.preventDefault();
    }

    Login=(e)=>{
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">

                <form className={this.state.activesignup ? "SignUp active-SignUp" : "SignUp inactive-SignUp"} onSubmit={this.SignUp}>
                    <h3>Sign Up</h3>
                    <div className="user-Box">
                        <input type="text" name="username" required />
                        <label htmlFor="username">User Name :</label>
                    </div>
                    <div className="user-Box">
                        <input type="text" name="email" required />
                        <label htmlFor="email">Email :</label>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="password" required />
                        <label htmlFor="password">Password :</label>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="confirm" required />
                        <label htmlFor="confirm">Confirmer Password :</label>
                    </div>
                    <div className="btns">
                        <button type="submit" className="btnLogin" onClick={this.toogleSinUp} >Login</button>
                        <button type="submit" className="btnSub" >Sign Up</button>
                    </div>
                </form>
                
                <form className={this.state.activelogin ? "Login active-Login" : "Login inactive-Login"} onSubmit={this.Login}>
                    <h3>Login</h3>
                    <div className="user-Box">
                        <input type="text" name="lemail" required />
                        <label htmlFor="lemail">Email :</label>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="lpassword" required/>
                        <label htmlFor="lpassword">Password :</label>
                    </div>
                    <div className="btns">
                        <button type="submit" className="btnBack" onClick={this.toogleLogin} >Sign Up</button>
                        <button type="submit" className="btnSub" >Login</button>
                    </div>
                </form>

            </div>
        )
    }
}