import Link from 'next/link';
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

const Navbuttons = (props: any) => {

    return(<div>
        {React.Children.toArray(
        links.map((lnk)=>
            <ButtonGroup isAttached>
                <Button _hover={{ bg: '#ddeaf7' }} bg={lnk.name === props.page ? "#ddeaf7" : "" } >
                    <Link href={lnk.href}>{lnk.name}</Link>
                </Button>
            </ButtonGroup>
        ))}
    </div>)
}

export default Navbuttons;