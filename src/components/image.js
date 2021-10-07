/**
 * This component loads all images from the images folder,
 * then you only need to import this component and use it like this:
 * <Image fileName="xxx.jpg" alt="" />
 * No need to do a graphql query for each image.
 */

import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Picture = ({ fileName, alt = '', style }) => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 600) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const fluid = allImageSharp.nodes.find(n => n.fluid.originalName === fileName)
    .fluid

  return (
    <figure>
      <Img fluid={fluid} alt={alt} style={style} />
    </figure>
  )
}

const Image = styled(Picture)`
  height: 338px;
  border-radius: 15px;
  opacity: 1 !important;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 59%,
    rgba(0, 0, 0, 0.65) 100%
  );
`

export default Image
