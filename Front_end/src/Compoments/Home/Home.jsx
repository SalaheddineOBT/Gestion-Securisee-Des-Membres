import React, { Component } from "react";
import axios from "axios";

const Axios=axios.create({
    baseURL:"http://localhost/Back%20end/Operations/"
});

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    state={
        active:false,
        user:[]
    }

    componentDidMount(){
        
        document.title="Page d'accueil";
        
    }

    listing=async()=>{
        await Axios.get("Listing.php").then(res=>{

        }).catch(e=>{
            console.log(e);
        });
    }



    render() {
        return (
            <div>
                
            </div>
        )
    }
}