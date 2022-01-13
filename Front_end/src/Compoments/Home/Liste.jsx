import React, { Component, createRef } from "react";
import axios from "axios";

export default class List extends Component{

    constructor(props){
        super(props);
        this.inputemail=createRef();
        this.inputUseName=createRef();
    }

    state={
        updated:false
    }

    toogleUpdate=()=>{
        const {updated}=this.state;
        this.setState({updated:!updated});
    }

    Update=async(idd)=>{
        let name=this.inputUseName.current.value;
        let eml=this.inputemail.current.value
        if(idd && Number.isInteger(idd) && name && eml){
          await fetch("http://localhost/Crud%20API%20PHP/Operations/Update.php",{
              method:"PUT",
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify({id:idd,username:name,email:eml})
          }).then(res=>{
              return res.json();
          }).then(data=>{
            if(data.success){
                alert(data.Message);
                this.props.listing();
                this.toogleUpdate();
                this.props.err(data.Message,true);
            }else{
                this.props.err(data.Message,false);
            }
          }).catch(e=>{
              console.log(e);
          })
        }else{
            this.props.err("All fields are required !",false);
        }
    }

    render(){
        const {users,index}=this.props;
        const lister=()=>{
            return(
                <tr>
                    <td><img src="" alt="image" /></td>
                    <td>{users.UserName}</td>
                    <td>{users.Email}</td>
                    <td>
                        <button type="submit" className="btns" title="Read User">Read</button>
                        <button type="submit" className="btns" title="Update User" onClick={this.toogleUpdate}>Update</button>
                        <button type="submit" className="btns" title="Delete User">Deelete</button>
                    </td>
                </tr>
            )
        }

        const frm=()=>{
            return(
                <tr>
                    <td>
                        <img src="" alt="image" />
                    </td>
                    <td>
                        <input type="text" ref={this.inputUseName} name="username" defaultValue={users.UserName} required />
                    </td>
                    <td>
                        <input type="text" ref={this.inputemail} name="email" defaultValue={users.Email} required />
                    </td>
                    <td>
                        <button type="submit" className="btn" onClick={()=>this.Update(users.ID)}>Save</button>
                        <button type="submit" className="btn" onClick={this.toogleUpdate}>Cancel</button>
                    </td>
                </tr>
            )
        }

        return(
            <>
                {!this.state.updated ? lister() : frm()}
            </>
        )
    }
}