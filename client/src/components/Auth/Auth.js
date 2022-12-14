import React, { useState, useEffect } from 'react';
//raccourci creation component : rafce
import useStyles from './styles';
import Input from './Input';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const clientId = '403949062269-ir93v9kqb3jko4ag27kcu12bqnvs5b19.apps.googleusercontent.com';
	const [isSignup, setIsSignup] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState(initialState);

	useEffect(() => {
		gapi.load('client:auth2', () => {
			gapi.auth2.init({ clientId: clientId });
		});
	}, []);

	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	const googleSuccess = async (res) => {
		console.log(res);

		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token } });

			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	const googleError = (res) => {
		console.log(res);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
						)}
						<Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
						{isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{isSignup ? 'Sign up' : 'Sign in'}
					</Button>
					<GoogleLogin
						clientId="403949062269-ir93v9kqb3jko4ag27kcu12bqnvs5b19.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleError}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
