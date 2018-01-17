import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}

	updatedUser(e) {
		this.setState({username: e.target.value});
	}

	updatedPass(e) {
		this.setState({password: e.target.value});

	}

	signUpClicked() {
		// TODO: make sure that the inputs are escaped
		//create a firebase user
		//make sure there is no user name with the same username that is signing up
		const auth = firebase.auth();
		auth.createUserWithEmailAndPassword(this.state.username, this.state.password)
		.then((user)=>{
			this.props.signedUp(user.uid, user.email);
		})
		.catch((err)=> {
			console.log('error signing up!', err);
		})
	}

	render() {
		return (
			<div className="ui form" method="post" action="/">
				<h1 style ={{color: 'white'}}>SIGN UP</h1>
			  <div className="field">
			    <label style={{'color': 'white'}}>Username:</label>
			    <input type="text" name="userName" placeholder="enter username" onChange={this.updatedUser.bind(this)}></input>
			  </div>
			  <div className="field">
			    <label style={{'color': 'white'}}>Password:</label>
			    <input type="password" name="pass" placeholder="enter password" onChange={this.updatedPass.bind(this)}></input>
			  </div>
			 	<p><Link to="/login">Log In?</Link></p>
			  <button className="ui olive button" onClick={this.signUpClicked.bind(this)}>Sign Up</button>
			</div>
		)			
	}
}

export default SignUp;
