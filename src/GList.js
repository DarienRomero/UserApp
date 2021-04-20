import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState, useEffect} from 'react';
import UserRow from './UserRow';
import {getUser} from './http-provider';
import AddUser from './AddUser';
import { useHistory } from 'react-router-dom';


const GList = () => {
    
    const [searchValue, setSearchValue] = useState("");
    const [usersList, setUsersList] = useState([]);
    let timer;
    const history = useHistory();
    const loadUsers = async(filterName) => {
        const users = await getUser(filterName);
        return users;
    }
    useEffect(async ()=>{
        async function fetchData() {
            const users = await loadUsers("");
            setUsersList(users);
        }
        fetchData();
    }, [
        
    ])
    // loadUsers();
    const handleOnChange = async (e) => {
        setSearchValue(e.target.value);
        if(timer) clearTimeout(timer);
        timer = setTimeout( async () =>{
            const users = await loadUsers(e.target.value);
            setUsersList(users);
        }, 1000);
    }
    const onItemSelected = (userId) => {
        console.log(userId);
        // handleNavigation();
        history.push(`/detail/${userId}`, { userId: userId });
    }
    const handleNavigation = () => history.push('/home');

    return (
        <>
            <h4 className = "bg-primary text-white text-center p-4">
                Users
            </h4>
            <div>
                <div className="my-1">
                    <input
                        type="text"
                        className="form-control"
                        value={searchValue}
                        onChange={handleOnChange}
                    />
                </div>
            </div>
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user) => <UserRow key={user.uid} id = {user.uid} email={user.email} onItemSelected={onItemSelected}/>)}
                </tbody>
            </table>
            <AddUser
                onAdd = {async(email) => {
                    console.log(email);
                    const users = await loadUsers("");
                    setUsersList(users);
                }}
            />
        </>
    );
}

export default GList;