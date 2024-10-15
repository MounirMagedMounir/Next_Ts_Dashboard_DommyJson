
import { getTokenLocalStorge, setTokenLocalStorge } from '@/data/local/webData';
import { User } from '@/models/userModel';

import { getTokenCookies, setTokenCookies } from './cookies';

export const checkUserLocalStorge=()=>{

      const user = getTokenLocalStorge();
  if(user){
return true
  }
  else{
    return false
  }
}



export  function  checkUser() {
  const userCookie =getTokenCookies()
  if (userCookie && userCookie !== '') {
return true
  } else {
  return false
  }

}


export const logInUser = async (user: any) : Promise<User | Error | undefined>  => {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.Email,
        password: user.Password,

      }),
    })
    if (res.status == 200) {
      const resJson = await res.json();
      if (resJson) {
        setTokenLocalStorge(resJson.token);
        setTokenCookies(resJson.token);
        return resJson
      } else {
        return Error( "some thing went wrong "+res.status); 
      }
    }
  }
  catch (e: any) {
    throw new Error('some error' + e.toString());
  }
};
