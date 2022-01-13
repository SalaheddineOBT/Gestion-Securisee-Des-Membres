import React, { Component, Fragment } from "react";
import List from "./Liste";
import axios from "axios";

const Axios=axios.create({
    baseURL:"http://localhost/Back%20end/Operations/"
});

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    state={
        users:[],
        error:'',
        succe:''
    }

    componentDidMount(){
        this.listing();
        document.title="Page d'accueil";
    }

    err=(val,type)=>{
        if(type){
            this.setState({succe:val});
        }else{
            this.setState({error:val});
        }
    }

    listing=async()=>{
        await Axios.get("Listing.php").then(res=>{
            if(res.data.success){
                this.setState({users:res.data.data});
            }
        }).catch(e=>{
            console.log(e);
        });
    }

    onSub=(e)=>{
        e.preventDefault();   
    }



    render() {
        const {id}=this.props;
        const lister=this.state.users.map((u,i)=>{
            return(
                <Fragment key={i}>
                    <List users={u} id={id} logined={this.props.logined} err={this.err} index={i} listing={this.listing} />
                </Fragment>
            )
        });

        return (
            <div className="HomePage">
                <nav>
                    <span className="tit">
                        <h1>
                            user Connecté :
                            <span className="h">
                                {this.props.v}
                            </span>
                        </h1>
                        <button type="submit" title="Déconnecté" className="logout" onClick={()=>this.props.logout()}>LogOut</button>
                    </span>
                </nav>
                <div className="cont">
                    <div className="toping">
                        <h1>
                            Members Informations :
                        </h1>
                        <button type="submit" title="Ajouter User" className="btni">Create New</button>
                    </div>
                    <form className="befortbl" onSubmit={this.onSub}>
                        <table border="1">
                            <thead className="stiky">
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
                <div className="ero">
                    <div className="cont">
                        {this.state.error}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                
                <div className="suc">
                    <div className="cont">
                        {this.state.succe}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                
            </div>
        )
    }
}