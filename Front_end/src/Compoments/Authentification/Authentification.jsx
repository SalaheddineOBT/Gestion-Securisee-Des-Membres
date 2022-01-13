import React,{Component,createRef} from "react";
import axios from "axios";
import sha256 from "sha256";

const Axios=axios.create({
    baseURL:"http://localhost/Back%20end/Operations/"
});

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

    componentDidMount(){
        document.title="Authentification Page";
    };

    state={
        showPass:false,
        hide:false,
        show:true,
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
        },
        errorL:'',
        errorR:''
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

    ShowPass=()=>{
        this.setState({hide:true,show:false});
        this.setState({showPass:true});
    }
    HidePass=()=>{
        this.setState({hide:false,show:true});
        this.setState({showPass:false});
    }

    h=()=>{
        this.setState({errorL:'',errorR:''})
    }

    SignUp=async (e)=>{
        e.preventDefault();
        if(this.inputConfirm.current.value && this.inputPassword.current.value && this.inputName.current.value && this.inputEmail.current.value){
            if(this.inputConfirm.current.value === this.inputPassword.current.value){
                await Axios.post("Register.php",{
                    username:this.inputName.current.value,
                    email:this.inputEmail.current.value,
                    password:sha256.x2(this.inputConfirm.current.value)
                }).then(res=>{
                    if(res.data.success){
                        // console.log(res.data.Message);
                    }else{
                        this.setState({errorR:res.data.Message});
                    }
                }).catch(e=>{
                    console.log(e);
                });
            }else{
                this.setState({errorR:"Confirm Password Incorrect !"});
            }
        }
    }

    Login=async (e)=>{
        e.preventDefault();
        if(this.inputEmailL.current.value && this.inputPasswordL.current.value){
            await Axios.post("Login.php",{
                email:this.inputEmailL.current.value,
                password:sha256.x2(this.inputPasswordL.current.value)
            }).then(res=>{
                if(res.data.success){
                    this.props.logined(true,res.data.data.ID,res.data.data.UserName)
                }else{
                    this.setState({errorR:res.data.Message});
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    }

    render(){
        return(
            <div className="container">

                <form className={this.state.activesignup ? "SignUp active-SignUp" : "SignUp inactive-SignUp"} onSubmit={this.SignUp}>
                    <h1>Regsiter</h1>
                    <div className="user-Box">
                        <input type="text" name="username"  ref={this.inputName} required />
                        <label htmlFor="username">User Name *</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="user-Box">
                        <input type="text" name="email"  ref={this.inputEmail} required />
                        <label htmlFor="email">Email *</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="password"  ref={this.inputPassword} required />
                        <label htmlFor="password">Password *</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="user-Box">
                        <input type="password" name="confirm"  ref={this.inputConfirm} required />
                        <label htmlFor="confirm">Confirmer Password *</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="submit-btn">
                        <input type="submit" value="Sign up" />
                    </div>
                    <div className="signup">
                        Already have account ? <a href="#" onClick={this.toogleSinUp}>sign in </a>
                    </div>
                </form>
                
                <form className={this.state.activelogin ? "Login active-Login" : "Login inactive-Login"} onSubmit={this.Login}>
                    <h1>Login</h1>
                    <div className="user-Box">
                        <input type="text" name="lemail"  ref={this.inputEmailL} required />
                        <label htmlFor="lemail">Email *</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="user-Box">
                        <input type={this.state.showPass ? "text" : "password"} name="lpassword" ref={this.inputPasswordL} required/>
                        <label htmlFor="lpassword">Password *</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.HidePass} class={this.state.show ? "h-5 w-5 hide" :"h-5 w-5 show"} viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.ShowPass} class={this.state.hide ? "h-5 w-5 hide" :"h-5 w-5 show"} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="fogot">
                        <a href="#">Forgot Password ?</a>
                    </div>
                    <div className="submit-btn">
                        <input type="submit" value="Sign in" />
                    </div>
                    <div className="signup">
                        don't have account ? <a href="#" onClick={this.toogleLogin}>sign up</a>
                    </div>
                </form>
                {
                    this.state.errorR 
                    ?
                    <div className={this.state.errorR || this.state.errorL ? "eroorActive" : "errors"}>
                        {this.state.errorR || this.state.errorL}
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.h} class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    : 
                    null
                }

            </div>
        )
    }
}