import Link from 'next/link';
import React from 'react';
import {
  Button,
  ButtonGroup,
} from "@chakra-ui/react";


//Created an array of objects containing the names of the pages and href so that it can be dynamically pulled from the Button component in JSX
const links = [
  {name:'All',href:'/'},
  {name:'Drafts',href:'/draft'},
  {name:'RFC',href:'/rfc'},
  {name:'Accepted',href:'/accepted'},
];

const Navbuttons = (props: any) => {

    return(<div>
        {/* React.Children.toArray is a code i added to get rid of a error in console regarding keys in map function  */}
        {React.Children.toArray(
        links.map((lnk)=>
            <ButtonGroup isAttached>
                {/* Active button - Usage of props in order to get the page selected and setting the background color */}
                <Button _hover={{ bg: '#ddeaf7' }} bg={lnk.name === props.page ? "#ddeaf7" : "" } >
                    {/* Taking href and name from the array of objects above - links  */}
                    <Link href={lnk.href}>{lnk.name}</Link>
                </Button>
            </ButtonGroup>
        ))}
    </div>)
}

export default Navbuttons;