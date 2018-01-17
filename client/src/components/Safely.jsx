import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class Safely extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addUserBool: false,
			saved: this.props.saved,
			fullName: '',
			number: '',
			selectedNumbers: [],
			message: ''
		}
	}

	addUser() {
		this.setState({addUserBool: !this.state.addUserBool});
	}

	saveNumber() {
		// TODO: Make sure that each phone number that is being saved is unique.
		//save to database the name and phone of the added user associated with logged in user
		axios.post('/saveNumber', {
	    name: this.state.fullName,
	    phoneNumber: this.state.number,
	    uid: this.props.uid
		})
	  .then((response) => {
	  	//Show updated state the user
			axios.get('/getSaved', {
		    params: {
		      uid: this.props.uid
		    }
		  })
		  .then( (response) => {
	    		this.setState({addUserBool: !this.state.addUserBool, saved: response.data});		    	 
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}

	updatedFullName(e) {
		this.setState({fullName: e.target.value});
	}

	updatedNumber(e) {
		this.setState({number: e.target.value});

	}

	checkBoxClicked(e) {
		console.log('checkBoxClicked', e.target.value, e.target.name);
		console.log(e.target.checked);
		if (e.target.checked) {
			//add
			this.state.selectedNumbers.push(e.target.value);
		} else {
			//remove (TODO: change data structure to be something else, removing from array is expenssive) 
			//get the index, and remove it from array
			var index = this.state.selectedNumbers.indexOf(e.target.value);
			this.state.selectedNumbers.splice(index, 1);
		}
	}

	send() {
		//TODO: make sure the message is not empty
		//go through the selectedNumbers and send to all the numbers, the message with Twilio
		axios.post('/sendMessage', {
	    message: this.state.message,
	    numbers: this.state.selectedNumbers,
	    email: this.props.email
		})
	  .then((response) => {
	  	console.log('successfully send to contacts');
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}

	selectAll() {
		//check all the items and add all of them to selectedNumbers
		var boxes = document.getElementsByName('checkboxes');
		for (var i = 0; i < boxes.length; i++) {
			if (!boxes[i].checked) {
				this.state.selectedNumbers.push(boxes[i].value);
				boxes[i].checked = true;
			}
		}
	}

	inputChanged(e) {
		this.setState({message: e.target.value});
	}

	//if not logged, route to login page,
	//if logged in, route to home page.
	render() {
		var addUser;
		if (this.state.addUserBool) {
		addUser = (
		<div className="popUp">
			<div className="ui form" method="post" action="/">
			  <div className="field">
			    <label style={{'color': 'white'}}>Full Name</label>
			    <input type="text" name="fullName" placeholder="Full Name" onChange={this.updatedFullName.bind(this)}></input>
			  </div>
			  <div className="field">
			    <label style={{'color': 'white'}}>Phone Number</label>
			    <input type="text" name="phoneNumber" placeholder="(000) 000-0000" onChange={this.updatedNumber.bind(this)}></input>
			  </div>
			  <button className="ui olive button" onClick={this.saveNumber.bind(this)}>Save</button>
			</div>
		</div>
		)
		}

		return (
			<div >
				<div className= "wrapper">
					<h1 style={{'color': '#A9CF4A'}}>Hello {this.props.email} <i className="talk outline icon" style={{'display': 'inline'}}></i></h1>
					<p style={{'color': '#FFFFFF'}}> The intent of this App is to quickly send a message to a group of people that you save beforehand. You might say, this already exists, we can just send a group text message on our phones instead! Yep you are right in that you can send a group message, however, this app will in the future, get your current location instantly. 
					The idea is that you don't have to explain why you are contacting everyone. You will only contact your loved ones from this app if you are in danger and you need immediate help, and speaking on the phone/searching for people in your contacts to send the message to is not an option!
					The app will have an option for you to save your login so that you won't have to login everytime. You will automatically be logged in whenever you enter it.
					 When you need help, you open the app, and mass send your location (automatically finds your location)/short message (if you want) to all the people who care about your well being.
					 In case, one of your loved onces might be away from their phone, at a critical time, you have the option to send it to as many people as you want, to increase your chance of getting immediate help.  
					</p>
				</div>
				<hr/>
				<br/>
				<br/>
			
				<i className="big link inverted olive add user icon" title="Add a user" onClick={this.addUser.bind(this)}></i>
				{addUser}
				<Table saved={this.state.saved} checkBoxClicked={this.checkBoxClicked.bind(this)}></Table>

				<div className="ui form">
				  <div className="field">
				    <input placeholder= "Enter your location, emergency text to send to your network..." type="text" onChange={this.inputChanged.bind(this)}/>
				  </div>
				</div>
				<button className="ui olive button" onClick={this.selectAll.bind(this)}>Select All</button>
				<button className="ui olive button" onClick={this.send.bind(this)}>Send</button>
			</div>
		)
	}
}

export default Safely;
