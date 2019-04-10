import React from 'react'
import css from '@emotion/css';

export default() => (
  <div css={css `flex: 1; flex-direction: column`}>
    <div>
      <h1>Not Found</h1>
      <img
        alt="got, shame, 404, not found"
        css={css `height: 400px`}
        src="images/shame-404.webp"/>
    </div>
  </div>
)
