import type { NextPage } from "next";
import Navbuttons from 'components/Navbuttons'
import Layout from "components/Layout";

const Draft: NextPage = () => {
  
  return (
    <Layout>
        <Navbuttons page="Drafts"/>
        Draft
    </Layout>
  );
};
  
export default Draft;
  