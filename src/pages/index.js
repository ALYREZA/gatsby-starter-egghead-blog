import React from 'react';
import {graphql} from 'gatsby';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Container from 'components/Container';
import {rhythm} from '../lib/typography';
import theme from '../../config/theme';

const PostTitle = styled.h2 `margin-bottom: ${rhythm(0.3)}; transition: ${theme.transition.ease}; :hover {color : $ {theme.brand.primary};
  transition : $ {theme.transition.ease};
}`;
const Description = styled.p ` margin-bottom: 10px; display: inline-block; `;
export default function Index({
  data: {
    site,
    allMdx
  }
}) {
  return (
    <Layout
      site={site}
      headerColor={theme.colors.white}
      headerBg={theme.brand.primary}>
      <Container css={css ` padding-bottom: 0; `}>
        {allMdx
          .edges
          .map(({node: post}) => (
            <div
              key={post.id}
              css={css ` margin-bottom: 40px; direction: rtl; text-align: right; `}>
              <Link to={post.frontmatter.slug} aria-label={`View ${post.frontmatter.title}`}>
                <PostTitle>{post.frontmatter.title}</PostTitle>
              </Link>
              <Description>
                {post.excerpt}{' '}
                <Link to={post.frontmatter.slug} aria-label={`View ${post.frontmatter.title}`}>
                  متن کامل ←
                </Link>
              </Description>
              <span/>
            </div>
          ))}
        <Link to="/blog" aria-label="Visit blog page" className="button-secondary">
          دیدن همه‌ی مطلب‌ها
        </Link>
        <hr/>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql `query {site {
    ...site siteMetadata {
      title
    }
  }
  allMdx(limit : 5 sort : {
    fields: [frontmatter___date],
    order: DESC
  }
  filter : {
    frontmatter: {
      published: {
        ne: false
      }
    }
  }) {
    edges {
      node {
        excerpt(pruneLength : 190)
        id
        fields {title slug date}
        parent {
          ...on File {
            sourceInstanceName
          }
        }
        frontmatter {
          title date(formatString : "MMMM DD, YYYY") description banner {
            childImageSharp {
              fluid(maxWidth: 720,maxHeight: 530, traceSVG: {color: "#de4d44"}) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          slug keywords
        }
      }
    }
  }
}`;
