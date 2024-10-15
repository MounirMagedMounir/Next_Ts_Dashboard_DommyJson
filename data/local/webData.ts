import { NextResponse, NextRequest } from "next/server";

export const setTokenLocalStorge = (token: string) => {
  try {
    localStorage.setItem("user-Token", JSON.stringify(token));

  } catch (error) { return false }
}

export const getTokenLocalStorge = (): any => {
  try {
    const user = localStorage.getItem("user-Token");
    if (user) {

      return JSON.parse(user);
    }

  } catch (err) { }

  return []


}


export const deleteTokenLocalStorge = (): boolean => {

  try {
    localStorage.removeItem("user-Token");
    return true
  } catch (error) {
    return false
  }

}


