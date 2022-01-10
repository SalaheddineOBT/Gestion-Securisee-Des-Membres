import React,{Component,createRef} from "react";

export default class Athentification extends Component{

    constructor(props){
        super(props);
        this.inputName=createRef();
        this.inputEmail=createRef();
        this.inputPassword=createRef();
        this.inputConfirm=createRef();
        this.inputEmailL=createRef();
        this.inputPasswordL=createRef();
    }

    state={
        activelogin:false,
        activesignup:true,
        RegiterUser:{
            username:'',
            email:'',
            password:'',
            confirm:''
        },
        LoginUser:{
            email:'',
            password:''
        }
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
        alert(this.inputName.current.value);
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
                        <input type="text" name="username"  ref={this.inputName} required />
                        <label htmlFor="username">User Name :</label>
                    </div>
                    <div className="user-Box">
                        <input type="text" name="email"  ref={this.inputEmail} required />
                        <label htmlFor="email">Email :</label>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="password"  ref={this.inputPassword} required />
                        <label htmlFor="password">Password :</label>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="confirm"  ref={this.inputConfirm} required />
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
                        <input type="text" name="lemail"  ref={this.inputEmailL} required />
                        <label htmlFor="lemail">Email :</label>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="lpassword" ref={this.inputPasswordL} required/>
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