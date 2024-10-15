
import { setCookie, getCookie,deleteCookie  } from 'cookies-next';

export const getTokenCookies=()=>{

 
    const userCookie = getCookie('token');
return userCookie
    }

export const setTokenCookies = ( token: string) => {

    try {
        const userToken = setCookie('token', `${token}`, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        return   userToken
    } catch (error) {
  
    }
  }

  
export const deleteTokenCookies = () => {
    try {
        const deleteduser = deleteCookie('token');
        return deleteduser
    } catch (error: any) {

    }
       
}

  