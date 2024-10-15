import { User } from "@/models/userModel";
import {  setTokenLocalStorge } from "../local/webData";
import { setTokenCookies } from "@/helper/cookies";


export async function getUserByID(id: number) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    if (res.status == 200) {
      const user: User = await res.json();
      return user;

    } else {
      throw new Error('some error');
    }

  } catch (e: any) {
    throw new Error('some error');
  }


}

export async function getUserByToken(id: number) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    if (res.status == 200) {
      const user = await res.json();
      return user.token;

    } else {
      throw new Error('some error');
    }

  } catch (e: any) {
    throw new Error('some error');
  }


}




export const addNewUser = async (user: any) => {
  try {
    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        password: user.Password,
      }),
    })
    if (res.status == 200) {
      const resJson = await res.json();
      if (resJson) {
        setTokenLocalStorge(resJson.token);
        return "Done"
      } else {
        return res.status
      }
    }
  }
  catch (e: any) {
    throw new Error('some error');
  }
};


export const updateUserName = (userId: any, value: any) => {

  fetch(`https://dummyjson.com/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fristname: { value }
    })
  })
    .then(res => res.json())
    .then(console.log);
}

export const updateUserEmail = (userId: any, value: any) => {

  fetch(`https://dummyjson.com/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: { value }
    })
  })
    .then(res => res.json())
    .then(console.log);
}

export const getUsers = () => { }