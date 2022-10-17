import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
    Button,
    ButtonGroup,
  } from "@chakra-ui/react";

const links = [
    {name:'All',href:'/'},
    {name:'Drafts',href:'/draft'},
    {name:'RFC',href:'/rfc'},
    {name:'Accepted',href:'/accepted'},
];

const NavBar = () =>{
    const router = useRouter();

    return(<div>
        {React.Children.toArray(
        links.map((lnk)=>
            <ButtonGroup isAttached>
                <Button isActive className={router.pathname == lnk.href ? "Active" : ""} >
                    <Link href={lnk.href}>{lnk.name}</Link>
                </Button>
            </ButtonGroup>
        ))}
    </div>)
}

export default NavBar;