import React, { Component } from "react";
import Image from "../images/boatlogo.png";
import Add from '../images/add-circle-outline (1).svg'

export default class SmallSidebar extends Component {


  state = {
    newServer: "",
    newServerId: 0,
  }
  
  logOut = (event) => {
    event.preventDefault();
    this.props.loadLogOut();
    // console.log(this.props.history)
  };

  serverName = (event) => {
    this.setState({
      newServer: event.target.value
    })
  }

  createServer = (event) => {
    event.preventDefault();
    let url = "http://localhost:3000/servers"
    let newServer = this.state.newServer
    let userId = localStorage.getItem("userId")

    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: newServer, user_id: userId, joined: true}),
    };

    fetch(url, reqObj)
    .then(resp => resp.json())
    .then(newServer => 
    this.setState({
      newServerId: newServer.id
    })
    )

    let memberurl = "http://localhost:3000/members"
    let newServerId = this.state.newServerId
    
    let obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_id: userId, server_id: newServerId, admin: true }),
    };

    fetch(memberurl, obj)
    .then(resp => resp.json())
    .then( memberRel => console.log(memberRel))
    
    
  }
  
  render() {
    return (
      <div className="flex flex-row w-24 h-full bg-gray-900">
        <nav class="justify-between flex flex-col">
          <div class="mt-10">
            {/* Home-Button */}
            <div className="home-img">
              <a href="http://localhost:3001/loggedIn">
                <img src={Image} class="rounded-full w-10 h-10 mb-3 mx-auto" />
              </a>
            </div>
            {/* Profile Pic */}
            <div className="profilePic">
              <a href="#">
                <img
                  src={this.props.currentUser.image}
                  class="rounded-full w-10 h-10 mb-3 mx-auto"
                />
              </a>
            </div>
            {/* Server Names */}
            <div class="bg-blue-800 text-white">
              {this.props.currentUser.members ? this.props.currentUser.members.map((serverUserIsMemberOf) => (
                <div class="mt-5">
                  <ul>
                    <li
                      onClick={(event) => this.props.selectServer(event)}
                      value={serverUserIsMemberOf.server.id}
                    >
                      {serverUserIsMemberOf.server.name}
                    </li>
                  </ul>
                </div>
              )) : <h1> Create a Server!</h1> }
            </div>
          </div>
          {/* Create Server Button */}
          {/* When i Comment out this form my logo and profile pic load but they wont with the form uncommented */}
          <div className="create-server"> 
          <form onSubmit={(event) => this.createServer(event)}>
          <div>
                <input
                  onChange={(event) => this.serverName(event)}
                  value={this.state.newServer}
                  class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="server"
                  name="server"
                  placeholder="New Servers"
                />
              </div>
          
          <div className="mb-50 create-server">
            <button type="submit" >
              <img src={Add} className="w-10 h-10 mx-auto mb-3"/>
            </button>
          </div>
          </form>
          </div>
          {/* LogOut Button */}
          <div className="mb-5">
            <button
              onClick={(event) => this.logOut(event)}
              type="click"
              class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              LogOut
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
