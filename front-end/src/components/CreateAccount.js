// React imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Col from 'react-bootstrap/Col';

// CSS imports
import './CreateAccount.css'

// JWT imports
import jwt_decode from 'jwt-decode';

// Script imports
import buildPath from '../scripts/buildPath';

// Misc. imports
// const passwordHash = require('password-hash');

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
			if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+$/.test(email.value))
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
			const response = await fetch(buildPath('registerUser'),
				{
					method : 'POST',
					body : JSON.stringify(apiPayload),
					headers : {'Content-Type': 'application/json'}}); 

			var responseJson = await JSON.parse(await response.text());

			// decrtipt the jwt
			responseJson = jwt_decode(responseJson);

			// Check if register failed
			if (!responseJson.success)
			{
				setMessage(responseJson.error);
				return;
			}
			else
			{
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
		<div class = "container-fluid">
		<div className="register-dialog">
			<div>
				<h1 className="dialog-headers">Create Account</h1>
			</div>
			<br />
			<div className="form-div">
				<Form>
					<Form.Row>
					<Col lg={8}>
						<Form.Label className="form-label">Username</Form.Label>
						<Form.Control required type="text" className="register-text-input" placeholder="Username" id="username" ref={(c)=> username = c} />
					</Col>

					<Col md={4}>
						<Form.Label className="form-label">First Name</Form.Label>
						<Form.Control required type="text" className="register-text-input" placeholder="Firstname" id="firstname" ref={(c) => firstname = c} />
					</Col>
					</Form.Row>


					<Form.Row >
					<Col lg={8}>
						<Form.Label className="form-label">Email</Form.Label>
						<Form.Control required type="text" className="register-text-input" placeholder="Email"  id="email" ref={(c) => email = c} />
						<br />
					</Col>
					
					<Col md={4}>
						<Form.Label className="form-label">Last Name</Form.Label>
						<Form.Control type="text" className="register-text-input" placeholder="Lastname" id="lastname" ref={(c) => lastname = c} />
					</Col>
					</Form.Row>


					<Form.Row>
					<Col md={6}>
						<Form.Label className="form-label">Password</Form.Label>
						<Form.Control required type="password" className="register-text-input" placeholder="Password" id="password" ref={(c) => password = c} />
					</Col>

					<Col md={6}>
						<Form.Label className="form-label">Confirm Password</Form.Label>
						<Form.Control required type="password" className="register-text-input" placeholder="Confirm Password" id="confirmPassword" ref={(c) => confirmPassword = c} />
					</Col>
					</Form.Row>


					<br />
					<br />
					<br />
					<div className="submit-div">
						<Form.Label className="form-label">Unit System</Form.Label>
						<br />
						<BootstrapSwitchButton className="measurement-switch" onstyle="primary" offstyle="primary" width={100} checked={true} onlabel="Metric" offlabel="Imperial" onChange={changeMeasurementSystem} />
						<br />
						<br />
						<Button variant="primary" size="lg" onClick={doCreation}>Create Account</Button>
					</div>
				</Form>
			</div>

				<br />
				<div className="returnLogIn">
				<Link className="returnLogIn" to="/">Return to Login</Link>
				<br />
				<span className="error-message">{message}</span>
				</div>
		</div>
		</div>
	);
}

export default Register;

