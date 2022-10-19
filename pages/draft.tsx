import type { NextPage } from "next";
import Navbuttons from 'components/Navbuttons'
import Layout from "components/Layout";

const Draft: NextPage = () => {
  
  return (
    <Layout>
        {/* Sending the page prop to the Navbuttons.tsx to get the active button  */}
        <Navbuttons page="Drafts"/>
        Draft
    </Layout>
  );
};
  
export default Draft;
  