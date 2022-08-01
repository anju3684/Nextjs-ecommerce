import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {  ReactNode } from 'react'
import NavBar from './NavBar'
import Notify from "./Notify"
type Props = { children: ReactNode }
const Layout: NextPage<Props> = ({ children }) => {
    return (
        <div className="container">
            <Notify/><NavBar />{children}</div>
    )
}

export default Layout
