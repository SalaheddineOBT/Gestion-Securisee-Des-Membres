import React, { Component, createRef } from "react";
import axios from "axios";

const Axios=axios.create({
    baseURL:"http://localhost/Back%20end/Operations/"
});

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
        if(idd && Number.isInteger(idd)){
            await Axios.put("Update.php",{
                id:idd,
                username:this.inputUseName.current.value,
                email:this.inputemail.current.value,
            }).then(res=>{
                if(res.data.success){
                    
                }else{

                }
            }).catch(e=>{
                console.log(e);
            })
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
                        <button type="submit" className="btn">Editer</button>
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