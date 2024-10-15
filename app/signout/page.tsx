"use client";

import { deleteTokenLocalStorge } from "@/data/local/webData";
import { deleteTokenCookies } from "@/helper/cookies";
import { useRouter } from "next/navigation";

export default function signout() {
  const router = useRouter();

  deleteTokenCookies();
  deleteTokenLocalStorge();
  router.push("/");
  router.replace("/");
}
