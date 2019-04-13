import {darken, lighten} from 'polished';
import {fonts} from '../src/lib/typography';

// '#de4d44',
// '#ff842a',
// '#fc766a',
// '#c83e74',
// '#8d9440',
// '#2e5d9f',
// '#e7b7cf',

const brand = {
  primary: '#de4d44',
  secondary: '#EEF4F2',
};

const colors = {
  primary_light: `${lighten (0.55, brand.primary)}`,
  gray: '#D3D3D3',
  black: '#000',
  white: '#fff',
  bg_color: '#fafafa',
  body_color: '#222426',
  link_color: brand.primary,
  link_color_hover: `${darken (0.07, brand.primary)}`,
  red: '#E75248',
  green: '#17A974',
};

const theme = {
  colors,
  fonts,
  brand,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '2rem',
    vertical: '3rem',
  },
  transition: {
    ease: 'all 200ms ease',
  },
};

export default theme;
