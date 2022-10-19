import type { NextPage } from "next";
import Navbuttons from 'components/Navbuttons'
import Layout from "components/Layout";

const RFC: NextPage = () => {
  
  return (
    <Layout>
        {/* Sending the page prop to the Navbuttons.tsx to get the active button  */}
        <Navbuttons page="RFC"/>
        RFC
    </Layout>
  );
};
  
export default RFC;
  