import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class Login extends React.Component {
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

	logInClicked() {
		const auth = firebase.auth();
		auth.signInWithEmailAndPassword(this.state.username, this.state.password)
		.then((user)=>{
			this.props.loggedIn(user.uid, user.email);
		})
		.catch((err)=> {
			alert("Please try again!");
		})
		
	}

	render() {
		return (
			<div className="ui form" method="post" action="/">
				<h1 style ={{color: 'white'}}>LOG IN</h1>
			  <div className="field">
			    <label style={{'color': 'white'}}>Username:</label>
			    <input type="text" name="userName" placeholder="enter username" onChange={this.updatedUser.bind(this)}></input>
			  </div>
			  <div className="field">
			    <label style={{'color': 'white'}}>Password:</label>
			    <input type="password" name="pass" placeholder="enter password" onChange={this.updatedPass.bind(this)}></input>
			  </div>
			  <p><Link to="/signup">Sign up?</Link></p>
			  <button className="ui olive button" onClick={this.logInClicked.bind(this)}>Log In</button>
			</div>
			)
	}
}

export default Login;
