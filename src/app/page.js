'use client'

import {NextUIProvider} from "@nextui-org/react";
import UserInfo from "./components/UserInfo";
export default function Home() {
  return (
    <NextUIProvider>
      <UserInfo/>
    </NextUIProvider>
  )
}
