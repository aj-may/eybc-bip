import { useRouter } from "next/router";
import Link from "next/link";


const Navigate = ()=>{

    const router = useRouter();

    function handleClick(e){
        e.preventDefault();
        let elem = e.target;
        router.push(elem.getAttribute('href'));
    }

    const hrefArr = [
        { text: "All", href: "/" },
        { text: "New Proposal", href: "/new" },
      ];

      hrefArr.map(el=>{
        console.log("element from "+el);
      })

    return(
        <div>
            
            <a href="/new" onClick={handleClick}>
                All
            </a>
        </div>
    )
}

export default Navigate;