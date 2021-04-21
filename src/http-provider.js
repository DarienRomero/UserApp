const baseURL = "https://evolbit-api.herokuapp.com/";
const loginEndpoint = "api/auth/login";
const getUserEndpoint = "api/usuarios";
const editUserEndpoint = "api/usuarios/edit";
const getUserByIdEndpoint = "api/usuarios/detail";

export const login = async (email, password) => {
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        const resp = await fetch(baseURL + loginEndpoint, requestOptions);
        console.log(resp);
        const body = await resp.text();
        console.log(body);
        if(resp.status === 200){
            return body;
        }else{
            return null;
        }
    }catch(e){
        return null;
    }
    
}
export const getUser = async(filterName = "") => {
    try{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        
          const resp = await fetch(baseURL + getUserEndpoint + "/" + filterName , requestOptions);
          const text = await resp.text();
          const {usuarios} = JSON.parse(text);
          return usuarios;
    }catch(e){
        return [];
    }
}
export const editUser = async(user, uid) => {
    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": uid,
            "altura": user.altura,
            "nombres": user.nombres,
            "photoUrl": user.photoUrl
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const resp = await fetch(baseURL + editUserEndpoint, requestOptions);

        console.log(resp.status);
        
        if(resp.status === 200 ){
            return true;
        }
        return false;
    }catch(e){
        console.log(e);
        return false;
    }
}
export const getUserById = async(id) => {
    try{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        
          const resp = await fetch(baseURL + getUserByIdEndpoint + "/" + id , requestOptions);
          const text = await resp.text();
          const usuario = JSON.parse(text);
          return usuario;
    }catch(e){
        return [];
    }
}
export const createUser = async (email, password) => {
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        const resp = await fetch(baseURL + getUserEndpoint, requestOptions);
        const body = await resp.text();
        const usuario = JSON.parse(body);
        if(resp.status === 200){
            return usuario;
        }else{
            return null;
        }
    }catch(e){
        return null;
    }
    
}