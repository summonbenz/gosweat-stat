import React from "react"
// import { Link } from "gatsby"
import { Chart } from "react-charts"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"


const lineChart = (
  <div
    style={{
      width: "400px",
      height: "300px"
    }}
  >
    <Chart
      data={[
        {
          label: "Series 1",
          data: [[0, 1], [1, 2], [2, 4], [2, 2], [4, 7]]
        },
        {
          label: "Series 2",
          data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
      ]}
      axes={[
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
    />
  </div>
);

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Coming Soon...</h1>
    {/* <div >
      { lineChart }
    </div> */}
  </Layout>
)

export default IndexPage
