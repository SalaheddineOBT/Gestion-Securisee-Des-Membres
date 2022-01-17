import React,{Component,Fragment,createRef} from "react";
import sha256 from "sha256";
import Liste from "./Liste";
import img from "./../../images/port.PNG";

export default class Home extends Component{

    constructor(props){
        super(props);
        this.inputName=createRef();
        this.inputEmail=createRef();
        this.inputPassword=createRef();
        this.inputConfirm=createRef();
        this.inputfile=createRef();
    }

    state={
        cot:false,
        eroor:'',
        successs:'',
        iser:false,
        issuc:false,
        active:false,
        files:null,
        users:[],
        sett:false,
        user:{
            id:0,
            username:'',
            email:'',
            password:'',
            confirm:''
        },
        uu:{
            username:'',
            email:'',
            new:'',
            password:'',
            confirm:''
        },
        user1:{},
        f:false,
    };

    fileOnchange=event=>{
        var r=new FileReader();
        r.onload=(e)=>{
            this.setState({files:e.target.result});
        }

        r.readAsDataURL(event.target.files[0]);
        // this.setState({img:this.inputfile.current.currentSrc});
        
    }

    inChange=e=>{
        const {name,value}=e.target;
        const {uu}=this.state;
        this.setState({uu,[name]:value});
    }

    tttt=()=>{
        const {sett}=this.state;
        this.setState({sett:!sett});
    }

    toogleset=()=>{
        this.toogleC();
        this.tttt();
    }

    toogleEsS=(met,val,is)=>{
        if(met==="error"){
            this.setState({eroor:val,iser:is});
        }else{
            this.setState({successs:val,issuc:is});
        }
    }

    toogleC=()=>{
        const {cot}=this.state;
        this.setState({cot:!cot});
    }

    componentDidMount(){
        this.listing();
        document.title="Home Page";
    };

    listing=async ()=>{
        await fetch('http://localhost/Crud%20API%20PHP/Operations/Listing.php')
        .then(res=>{
            return res.json();
        }).then(data=>{
            // this.setState({users:data.data});
            this.setState({users:data.data});
        }).catch(e=>{
            console.log(e);
        });
    };

    OnChanging=()=>{
        const i={
            username:this.inputName.current.value,
            email:this.inputEmail.current.value,
            password:this.inputPassword.current.value,
            confirm:this.inputConfirm.current.value
        }
        this.setState({user:i});
    }

    Onsub=(e)=>{
        e.preventDefault();
    };

    OnSubmited=async(e)=>{
        e.preventDefault();
        const {user}=this.state;
        if(user.password.length < 8){
            this.setState({err:"Password Must Be at least 8 characters !"});
        }else if(user.password!==user.confirm){
            this.setState({err:"Confirm Password Is Incorrect !"});
        }else{
            await fetch("http://localhost/Crud%20API%20PHP/Operations/Create.php",{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    username:user.username,
                    email:user.email,
                    password:sha256.x2(user.confirm),
                    img:this.inputfile.current.currentSrc
                })
            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(data.success){
                    // alert(data.Message);
                    this.listing();
                    this.setState({err:""});
                    this.setState({user:{
                        username:'',
                        email:'',
                        password:'',
                        confirm:''
                    }});
                    this.inputName.current.value="";
                    this.inputEmail.current.value="";
                    this.inputPassword.current.value="";
                    this.inputConfirm.current.value="";
                    this.toogleEsS("not error","Utilisateur Ajouter Avec Success .",true);
                    this.toogleEsS("error","",false);
                    this.toogle();

                }else{
                    this.toogleEsS("not error","",false);
                    this.toogleEsS("error",data.Message,true);
            }

            }).catch(e=>{
                console.log(e);
            });
        }
    }

    toogle=()=>{
        const {active}=this.state;
        this.setState({active:!active});
        this.inputName.current.value="";
        this.inputEmail.current.value="";
        this.inputPassword.current.value="";
        this.inputConfirm.current.value="";
        this.setState({files:''});
    }

    Read=async (id,v)=>{
        if(id && Number.isInteger(id)){
            await fetch(`http://localhost/Crud%20API%20PHP/Operations/Read.php?id=${id}`).then(res=>{
                return res.json();
            }).then(data=>{
                if(data.success){
                    this.setState({user1:data.data});
                    this.setState({f:v});
                }else{
                    alert(data.Message);
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    }

    toogleF=()=>{
        this.setState({f:false});
    }

    logout=()=>{
        this.props.logout();
        this.toogleC();
    }

    render(){

        const {id}=this.props;

        const lister=this.state.users.map((u,i)=>{
            return(
                <Fragment key={i}>
                    <Liste users={u} id={id} Read={this.Read} logined={this.props.logined} index={i} listing={this.listing} too={this.toogleEsS} />
                </Fragment>
            )
        });

        return(
            <>
                <div className={this.state.sett ? "userinfor" : "UserInfoDes"}>
                    <form>
                        <h1>Info User Connecté </h1>
                        <div className="conttt">
                            <div className="inputs">
                                <div className="user-Box">
                                    <input type="text" name="email" defaultValue={this.state.uu.email} required onChange={this.inChange} />
                                    <label htmlFor="email">Adresses Email *</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div className="user-Box">
                                    <input type="password" name="Curent" defaultValue={this.state.uu.new} required onChange={this.inChange} />
                                    <label htmlFor="Curent">Curent Passowrd *</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="user-Box">
                                    <input type="password" name="password" defaultValue={this.state.uu.password} required onChange={this.inChange} />
                                    <label htmlFor="password">New Passowrd *</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="user-Box">
                                    <input type="password" name="confirm" defaultValue={this.state.uu.confirm} required onChange={this.inChange} />
                                    <label htmlFor="confirm">Confirme Passowrd *</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="cont5">
                                <div className="img" >
                                    <img src={img} alt="Image" />
                                    <input type="file" name="image" />
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="user-Box">
                                    <input type="text" name="id" defaultValue={this.state.uu.id} required onChange={this.inChange} />
                                    <label htmlFor="id">User Identifiant *</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="user-Box">
                                    <input type="text" name="username" defaultValue={this.state.uu.username} required onChange={this.inChange} />
                                    <label htmlFor="username">User Name *</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="btn">
                            <button type="submit" >Edite Profile</button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.tttt} class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </form>
                </div>

                <div className={(this.state.active) ? "active" : "Create"}>
                    <form onSubmit={this.OnSubmited} className="form">
                        <h1>Create New User</h1>
                        <div className="img" >
                            <img src={this.state.files ? this.state.files : img} ref={this.inputfile} alt="Image" />
                            <input type="file" name="image" onChange={this.fileOnchange} />
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="user-Box">
                            <input type="text" name="username" ref={this.inputName} defaultValue={this.state.user.username} required onChange={this.OnChanging} />
                            <label htmlFor="username">User Name *</label>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="user-Box">
                            <input type="text" name="email" ref={this.inputEmail} defaultValue={this.state.user.email} required onChange={this.OnChanging} />
                            <label htmlFor="email">Email *</label>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <div className="user-Box">
                            <input type="password" name="password" ref={this.inputPassword} defaultValue={this.state.user.password} required onChange={this.OnChanging} />
                            <label htmlFor="password">Passowrd *</label>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="user-Box">
                            <input type="password" name="confirm" ref={this.inputConfirm} defaultValue={this.state.user.confirm} required onChange={this.OnChanging} />
                            <label htmlFor="confirm">Confirme Passowrd *</label>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        {/* {this.state.err ? (<span className="error">{this.state.err}</span>) : null} */}
                        <div className="btn">
                            <button type="submit" >ADD NEW</button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.toogle} class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </form>
                </div>
                
                <div className="HomePage">
                    <nav>
                        <h1>Members Information</h1>
                        
                        <div className="conten">
                            <h2>username</h2>
                            <div className="img" onClick={this.toogleC}>
                                <img src={img} alt="Image" />
                            </div>
                        </div>
                        <div className={this.state.cot ? 'cont1act' : "cont1"}>
                            <div className="box" onClick={this.toogleset}>
                                <a href="#" >Settings</a>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="box" onClick={this.logout}>
                                <a href="#">Logout</a>
                                <svg xmlns="http://www.w3.org/2000/svg"class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </nav>
                    <div className="cont">
                        <div className="toping">
                            <div className="btn" onClick={this.toogle}>
                                <button className="btni" type="submit" >Create New</button>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            </div>
                            <h1></h1>
                        </div>
                        <form className="befortbl" onSubmit={this.Onsub}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lister}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>

                <div className={this.state.f ? "information" : "informaleft"}>
                    <div className="containn">
                        <h1>User Information</h1>
                        <ul>
                            {/* <li><span className="in">ID : </span>{this.state.user1.ID} </li>
                            <li><span className="in">User Name : </span> {this.state.user1.UserName}</li>
                            <li><span className="in">Email : </span>{this.state.user1.Email} </li>
                            <li><span className="in">Create in : </span> {this.state.user1.created}</li> */}
                            {/* <li><img src={"data:image/png;charset=utf8;base64,"+this.state.user1.Photo} /></li> */}
                        </ul>
                        <button onClick={this.toogleF}>Close</button>
                    </div>
                </div>

                <div className={this.state.iser ? "activeErr" : "errorsd"}>
                    <div className="cont">
                        <span className="titl">{this.state.eroor}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>this.toogleEsS("error","",false)} class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className={this.state.issuc ? "activeSuc" : "successd"}>
                    <div className="cont">
                        <span className="titl">{this.state.successs}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>this.toogleEsS("not error","",false)} class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

            </>
        )
    }
}