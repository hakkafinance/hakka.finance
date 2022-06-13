const colorsLinear = [
  '#D9FbE3',
  '#B5F8CE',
  '#8CEB89',
  '#6AD7A8',
  '#3EBD93',
  '#2DA287',
  '#1F887A',
  '#136D6A',
  '#0B555A',
].reduce((target, curr, i) => {
  return { ...target, [`primary-${i}00`]: curr };
}, {} as { [key: string]: string });

export default {
  breakpoints: ['576px', '1560px', '1680px', '1900px'],
  colors: {
    background: '#fff',
    white_green: '#f7fbfc',
    primary: '#639',
    secondary: '#ff6347',
    main_green: '#3ebd93',
    dark_green: '#0b555a',
    black: '#253e47',
    black_grey: '#52666d',
    green: '#2da287',
    light_green: '#dae1e3',
    text_grey: '#929EA3',
    active_green: '#ebf0f2',
    'neutral-100': '#F7FBFC',
    'neutral-200': '#EBF0F2',
    'neutral-300': '#DAE1E3',
    'neutral-600': '#52666D',
    'neutral-900': '#253E47',
    ...colorsLinear
  },
  background_linears: {
    backgroundImage: 'linear-gradient(to right, #6ad7c1, #8cebb9)',
  },
  fonts: {
    // body: 'system-ui, sans-serif',
    // heading: 'system-ui, sans-serif',
    // monospace: 'Menlo, monospace'
    // body: 'Open Sans, sans-serif',
    body: 'Open Sans, system-ui',
    heading: 'Georgia, serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    semi: 600,
    heading: 700,
    bold: 700,
  },
  // lineHeights: {
  //   body: 1.5,
  //   heading: 1.125
  // },
  lineHeights: [1.5, '24px', '32px', '60px'],
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 80, 164, 256, 512],
  styles: {
    root: {
      overflow: 'hidden',
      fontFamily: 'body',
      fontWeights: {
        semi: 'body',
        bold: 'bold',
      },
      p: {
        lineHeight: [1, 1, 2, 2],
      },
    },
  },
};

/* description :
  fontSize 14px ---> responsive [0,1,2,3]
  fontSize 16px ---> responsive [1,2,3,5]
  fontSize 18px ---> responsive [2,3,4,5]
  fontSize 20px ---> responsive [3,4,5,6]
  fontSize 24px ---> responsive [4,5,6,6]
  fontSize 32px ---> responsive [5,6,7,7]
  fontSize 48px ---> responsive [6,7,8,8]
*/
