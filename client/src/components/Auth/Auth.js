import React, { useState } from 'react';
//raccourci creation component : rafce
import useStyles from './styles';
import Input from './Input';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Auth = () => {
	const classes = useStyles();
	const [isSignup, setIsSignup] = useState(false);

	const handleSubmit = (e) => {};

	const handleChange = (e) => {};

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
								<Input name="first name" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="last name" label="Last Name" handleChange={handleChange} half />
							</>
						)}
						<Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
