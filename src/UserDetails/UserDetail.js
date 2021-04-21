import 'date-fns';
import React,{useEffect, useState} from 'react';
import {TextField, Grid, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {getUserById, editUser} from '../http-provider';

const useStyles = makeStyles((theme) => ({
    textField:{
        paddingBottom: '10px',
    },
    root: {
        flexGrow: 1,
        paddingLeft: "10px"
    },
}));

const UserDetail = (props) => {
    let id  = props.location.state.userId;
    const [userData, setUserData] = useState({
        "nombres": "",
        "email": "",
        "photoUrl": "",
        "altura": 0.0
    });
    // let { id } = useParams();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const classes = useStyles();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const editUserData = async(user, id) => {
        const success = await editUser(user, id);
        if(success === true){
            console.log("Modificación exitosa");
        }else{
            console.log("Modificación fallida");
        }
    }
    useEffect(async ()=>{
        let id  = props.location.state.userId;
        async function fetchData() {
            const user = await getUserById(id);
            setUserData({
                "nombres": user.nombres || "",
                "email": user.email || "",
                "photoUrl": user.photoUrl || "",
                "altura": user.altura || ""
            });
        }
        fetchData(id);
    }, [
        
    ])
    return (
        <>
            <h4 className = "bg-primary text-white text-center p-4">
                User Edit Page
            </h4>
            <div className={classes.root}>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            className={classes.textField} 
                            id="outlined-basic" 
                            label="Nombres" 
                            value = {userData.nombres}
                            variant="outlined"
                        />     
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            className={classes.textField} 
                            id="outlined-basic" 
                            label="Email"
                            value = {userData.email}
                            variant="outlined"
                        />    
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            className={classes.textField} 
                            id="outlined-basic" 
                            label="Estatura" 
                            onChange = {(e) => setUserData({...userData, altura: e.target.value})}
                            value = {userData.altura}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            lang = "es-ES"
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={()=>editUserData(userData, id)}>
                            Editar
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default UserDetail;