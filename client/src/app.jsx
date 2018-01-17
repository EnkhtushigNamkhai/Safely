import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Safely from './components/Safely.jsx';
import SignUp from './components/SignUp.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			logged: false,
			saved: [{name: 'No saved users', phoneNumber: ''}],
			uid: '',
			email: ''
		}
	}

	loggedIn (uid, email) {
		console.log('here is what it should equal: ', uid);

		axios.get('/getSaved', {
	    params: {
	      uid: uid
	    }
	  })
	  .then( (response) => {
    	console.log('HERE IS RESPONSE: ', response.data);

    	if (response.data.length > 0) {
    		console.log('has saved numbers');
    		this.setState({uid: uid, logged: true, email: email, saved: response.data});
    		// this.setState({saved: response.data});
    	} else {
    		console.log('doesnt have saved numbers');
    	}
    	this.props.history.push('/');
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}

	signedUp (uid, email) {
		// console.log('user has signed up', uid, email);
		//get all contacts 
		this.setState({uid: uid, logged: true, email: email}, () => {
			console.log('set state here');
			this.props.history.push('/');
		});
		//redirect to the path /
		//set saved to the be list corresponding to the logged in user
		//same thing as logged?
	}

	render() {
	return (		
			<Switch>
				<Route path="/signup" render={props=> !this.state.logged && <SignUp signedUp={this.signedUp.bind(this)}/> }/>
		    <Route path="/login" render={props=> !this.state.logged && <Login loggedIn={this.loggedIn.bind(this)}/>}/>
		    <Route path="/" render={props=> this.state.logged ? <Safely uid={this.state.uid} email={this.state.email} saved={this.state.saved}/> : <Login loggedIn={this.loggedIn.bind(this)} />} />

				
			</Switch>
		)	
	}

}

export default withRouter(App);





