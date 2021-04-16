import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Card, Container, Input, CardContent, Typography, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {login} from './http-provider';


const useStyles = makeStyles((theme) => ({
    column:{
        display: 'flex',
        flexDirection: 'column'
    },
    textField:{
        paddingBottom: '10px',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    fieldTitle: {
        fontWeight: '600',
        fontFamily : 'Arial',
        paddingBottom: '15px',
    },
    button: {
        height: '50px'
    },
    cardStyle: {
        paddingTop: '10%'
    }
}));

const Login = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory();
    const handleNavigation = () => history.replace('/home');

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleOnPressed = async () => {
        if(!email.includes("@")){
            console.log("Error");
            setEmailError(true);
            return;
        }
        if(password.length < 6){
            console.log("Error");
            setPasswordError(true);
            return;
        }
        const token = await login(email, password);
        console.log(token);
        if(token){
            handleNavigation();
        }else{
            alert("Error al iniciar sesión")
        }
    }
    return (
        <Container maxWidth="sm" className={classes.cardStyle}>
            <Card>
                <CardContent >
                    <Typography className={classes.title} variant = "h4">
                        Sign in
                    </Typography>
                    <form noValidate autoComplete="off">
                        <div className={classes.column}>
                            <Typography variant = "h5" className={classes.fieldTitle}>
                                Email Address
                            </Typography>
                            <TextField 
                                type="email"
                                error = {emailError}
                                value = {email}
                                onClick = {(e) => {setEmailError(false)}}
                                className={classes.textField} 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                onChange = {changeEmail}
                            />
                            <Typography variant = "h5" className={classes.fieldTitle}>
                                Password
                            </Typography>
                            <TextField 
                                type="password"
                                error = {passwordError}
                                value = {password}
                                className={classes.textField} 
                                id="outlined-basic" 
                                label="Password" 
                                onClick = {(e) => {setPasswordError(false)}}
                                variant="outlined"
                                onChange = {changePassword}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={checked}
                                    onChange={() => {setChecked(!checked)}}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                            />
                            <Button 
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick = {handleOnPressed}
                            >
                                Primary
                            </Button>
                            {/* <Link to="/home">
                                
                            </Link> */}
                        </div>
                        
                    </form>
                </CardContent> 
            </Card>
        </Container>
    );
}

export default Login;