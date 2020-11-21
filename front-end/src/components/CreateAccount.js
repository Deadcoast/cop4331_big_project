// React imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// CSS imports
import './CreateAccount.css'

// Misc. imports
// const passwordHash = require('password-hash');

// environment variables
const PORT = (process.env.PORT || 5000);

function Register()
{
	var username = '';
	var password = '';
	var firstname = '';
	var lastname = '';
	var email = '';
	var confirmPassword = '';

	const [message, setMessage] = useState('');
	const [metric, setMetric] = useState(true);


	const doCreation = async event =>
	{
		// integrity check username
		if (username.value === '')
		{
			setMessage('Username is required');
			return;
		}

		// integrity check password
		if (password.value === '')
		{
			setMessage('Password is required');
			return;
		}

		// integrity check confirmPassword
		if (confirmPassword.value === '')
		{
			setMessage('Please confirm your password');
			return;
		}

		// ensure both password entries match
		if (password.value !== confirmPassword.value)
		{
			setMessage('Passwords do not match');
			return;
		}

		// integrity check firstname
		if (firstname.value === '')
		{
			setMessage('Firstname required');
		}

		// integrity check email
		if (email.value === '')
		{
			setMessage('Email required');
			return;
		}
		else
		{
			// use regex to see if email is valid
			if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(email.value))
			{
				setMessage('Email not valid');
				return;
			}
		}

		event.preventDefault();

		var apiPayload = {
			username : username.value,
			password : password.value,
			email : email.value,
			firstname : firstname.value,
			lastname : lastname.value,
			usesMetric : metric
		}

		// Call the register endpont and process data
		try
		{
			const response = await fetch('http://localhost:' + PORT + '/api/registerUser',
				{
					method : 'POST',
					body : JSON.stringify(apiPayload),
					headers : {'Content-Type': 'application/json'}}); 

			var responseJson = await JSON.parse(await response.text());

			console.log(responseJson);

			// Check if register failed
			if (responseJson.success === false)
			{
				setMessage(responseJson.error);
			}
			else
			{
				var userInfo = {
					userID : responseJson._id,
					email : responseJson.email,
					firstname : responseJson.firstname,
					lastname : responseJson.lastname,
					usesMetric : responseJson.usesMetric,
					favoriteRecipes : responseJson.favoriteRecipes
				};

				localStorage.setItem('user_data', JSON.stringify(userInfo));

				setMessage('Registration successful. Please check your email.');
			}
		}
		catch (e)
		{
			alert(e.toString());
			return;
		}
	}

	const changeMeasurementSystem = () =>
	{
		setMetric(!metric);
	}

	return (
		<div className="register-dialog">
			<h1 className="dialog-header">Create Account</h1>
			<div>
				<form className="register-form">
					<input className="register-text-input" type="text" id="username" placeholder="Username"   ref={(c) => username = c} />
					<input className="register-text-input" type="text" id="firstname" placeholder="Firstname"  ref={(c) => firstname = c}/>
					<input className="register-text-input" type="text" id="lastname" placeholder="Lastname"  ref={(c) => lastname = c}/>
					<input className="register-text-input" type="text" id="email" placeholder="Email"  ref={(c) => email = c}/>
					<input className="register-text-input" type="password" id="password" placeholder="Password"   ref={(c) => password = c} />
					<input className="register-text-input" type="password" id="password" placeholder="Confirm Password"   ref={(c) => confirmPassword = c} />
				</form>
			</div>
			<div className="measurement-switch-div">
				<div>
					<label className="form-label">Metric</label>
					<label className="switch">
						<input type="checkbox" onClick={ changeMeasurementSystem } />
						<span className="slider round" />
					</label>
					<label className="form-label">Imperial</label>
				</div>
			</div>
			<br />
			<label className="error-message">{message}</label>
			<div className="registerButton">
					<input className="buttons" type="submit" id="loginButton" value="Create Account" onClick={ doCreation } />
			</div>
			<br />
			<Link to="/">{ "Return to Login" }</Link>
		</div>
	);
}

export default Register;
