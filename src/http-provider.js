const baseURL = "https://evolbit-api.herokuapp.com/";
const loginEndpoint = "api/auth/login";
const getUserEndpoint = "api/usuarios";

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