import React,{Component, createRef} from "react";
import img from "./../../images/port.PNG";

export default class Liste extends Component{
    constructor(props){
        super(props);
        this.inputUsername=createRef();
        this.inputEmail=createRef();
    };
    state={
        isUpdate:false,
        err:''
    };
    update=async (idd)=>{
        let name=this.inputUsername.current.value;
        let eml=this.inputEmail.current.value;
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(name && eml && idd){
            await fetch("http://localhost/Crud%20API%20PHP/Operations/Update.php",{
                method:"PUT",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({id:idd,username:name,email:eml})
            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(!emailRegex.test(eml)){
                    this.setState({err:"Email Forma Incorrect !"});
                }else{
                    this.setState({err:""});
                    if(data.success){
                        if(this.props.id===idd){
                            this.toogleUpdate();
                            this.props.listing();
                            alert(data.Message);
                            this.props.logined(true,idd,name);
                        }else{
                            this.toogleUpdate();
                            this.props.listing();
                            alert(data.Message);
                        }
                    }else{
                        alert(data.Message);
                    }
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    };
    delete=async (idd) =>{
        if(window.confirm("Are You Really Wante Delete This User ?")){
            await fetch("http://localhost/Crud%20API%20PHP/Operations/Delete.php",{
                method:"DELETE",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({id:idd})
            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(data.success){
                    if(this.props.id==idd){
                        this.props.logined(false,'','');
                        window.location.reload();
                    }else{
                        alert(data.Message);
                        this.props.listing();
                    }
                }else{
                    alert(data.Message);
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    };
    
    toogleUpdate=()=>{
        const {isUpdate}=this.state;
        this.setState({isUpdate:!isUpdate});
    };
    
    render(){
        const {users,index}=this.props;
        const lister=()=>{
            return(
                <tr>
                    <td>
                        <img src={users.Photo ? users.Photo : img} alt="Image" />
                    </td>
                    <td>{users.UserName}</td>
                    <td>{users.Email}</td>
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.toogleUpdate} title="Update User" className="btns" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" type="submit" onClick={()=>this.delete(parseInt(users.ID))} className="btns"  title="Deelete User" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>this.props.Read(parseInt(users.ID),true)} className="btns" title="Read User" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </td>
                </tr>
            )
        };
        const frm=()=>{
            return(
                <tr key={index}>
                    <td>
                        <input type="file" name="image" accept="image/*" />
                    </td>
                    <td>
                        <input type="text" ref={this.inputUsername} defaultValue={users.UserName} required />
                    </td>
                    <td>
                        <input type="email" ref={this.inputEmail} defaultValue={users.Email} required />
                    </td>
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>this.update(users.ID)} className="btns" title="Save" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  title="Cancel button" className="btns" viewBox="0 0 20 20" onClick={this.toogleUpdate} fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </td>
                </tr>
            )
        };
        return(
            <>
                {!this.state.isUpdate ? lister() : frm() }  
            </>
        )
    }
}