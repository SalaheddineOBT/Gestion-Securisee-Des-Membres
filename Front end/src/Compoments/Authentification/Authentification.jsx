import React,{Component} from "react";

export default class Athentification extends Component{
    state={
        activelogin:true,
        activesignup:false
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
                    <input type="text" name="username" placeholder="UserName" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="password" name="confirm" placeholder="Confirmer Password" />
                    <div className="btns">
                        <button type="submit" className="btnLogin" onClick={this.toogleSinUp} >Login</button>
                        <button type="submit" className="btnSub" >Sign Up</button>
                    </div>
                </form>
                
                <form className={this.state.activelogin ? "Login active-Login" : "Login inactive-Login"} onSubmit={this.Login}>
                    <h3>Login</h3>
                    <input type="email" name="lemail" placeholder="Email" />
                    <input type="password" name="lpassword" placeholder="Password" />
                    <div className="btns">
                        <button type="submit" className="btnBack" onClick={this.toogleLogin} >Sign Up</button>
                        <button type="submit" className="btnSub" >Login</button>
                    </div>
                </form>

            </div>
        )
    }
}