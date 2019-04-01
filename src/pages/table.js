import React from "react"
// import { Link } from "gatsby"
import Table from "../components/table"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TablePage = () => (
  <Layout>
    <SEO title="Table Page" />
    <h1>Lastest 500 row</h1>
    <Table>
      
    </Table>
  </Layout>
)

export default TablePage
