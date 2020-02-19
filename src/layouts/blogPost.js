import React from 'react'
import Layout from '.'
import styled from 'styled-components'
import Moment from 'react-moment'

import { Twitter, Facebook } from 'react-social-sharing'

import { graphql } from 'gatsby'

const StyledBlog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* align-items: center; */
`

const StyledMDX = styled.div`
  /* width: 640px; */
  min-width: 550px;
  max-width: 768px;
  padding: 0;
  margin-bottom: 3rem;
  a {
    color: ${({ theme }) => theme.colors.link};
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`

const PostHeader = styled.div`
  font-size: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 550px;
  max-width: 768px;
  padding: 8rem 0;
`

const PostMetaData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.grey6};
  width: 100%;
`

const PostTitle = styled.h1`
  font-family: 'Inter';
  font-size: 4rem;
  font-weight: 800 !important;
  margin-bottom: 2rem;
  /* text-align: center; */
`

const PostAuthor = styled.p`
  margin: 0;
`

const PostDate = styled(Moment)`
  margin: 0;
`

const Blog = ({ pageContext, path, children }) => {
  return (
    <Layout path={path}>
      <StyledBlog id="blog-header">
        <PostHeader>
          <PostTitle>{pageContext.frontmatter.title}</PostTitle>
          <PostMetaData>
            <PostAuthor>{pageContext.frontmatter.author}</PostAuthor> {' — '}
            <PostDate parse="YYYY-MM-DD" format="MMMM Do, YYYY">
              {pageContext.frontmatter.date}
            </PostDate>
          </PostMetaData>
          <div>
            <Twitter
              style={{ padding: '0.5em 0.5em' }}
              solid
              small
              message={pageContext.frontmatter.title}
              link={'https://uniswap.org' + path}
            />
            <Facebook
              style={{ padding: '0.5em 0.5em' }}
              solid
              small
              link="http://sharingbuttons.io"
            />
          </div>
        </PostHeader>
        <StyledMDX>{children}</StyledMDX>
      </StyledBlog>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt(pruneLength: 250)
      frontmatter {
        date(formatString: "dddd DD MMMM YYYY")
        title
      }
      fields {
        slug
        readingTime {
          text
        }
      }
    }
  }
`
