import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import HomeTimelineContainer from './components/HomeTimelineContainer'

const App = () => {
	const [isLoggedIn, renderLogin] = useState(false);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleLoginDisplay = () => {
		renderLogin(!isLoggedIn);
	}

	useEffect(() => {
		fetch('/auth/login/success')
			.then(resp => resp.json())
			.then(({ success, user }) => {
				renderLogin(success);
				setUser(user);
			});
	})
  return (
    <div className="App d-flex flex-column justify-contenter-center">
      <AppNavbar isLoggedIn={isLoggedIn} handleUpdate={handleLoginDisplay}  />
      { isLoggedIn ? <HomeTimelineContainer user={user} /> : <h1 className="text-center">No Tweets Available, Please Log In!</h1>}
    </div>
  );
}

export default App;
