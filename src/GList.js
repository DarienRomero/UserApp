import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState, useEffect} from 'react';
import UserRow from './UserRow';
import {getUser} from './http-provider';

const GList = () => {

    const [searchValue, setSearchValue] = useState("");
    const [usersList, setUsersList] = useState([]);
    let timer;
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
    return (
        <>
            <h4 className = "bg-primary text-white text-center p-4">
                Task App
            </h4>
            <div className="my-1">
                <input
                    type="text"
                    className="form-control"
                    value={searchValue}
                    onChange={handleOnChange}
                />
            </div>
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user) => <UserRow key={user.uid} id = {user.uid} email={user.email}/>)}
                </tbody>
            </table>
        </>
    );
}

export default GList;