const px = {
  xs: '440px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export default {
  xs: `@media (min-width: ${px['xs']})`,
  sm: `@media (min-width: ${px['sm']})`,
  md: `@media (min-width: ${px['md']})`,
  lg: `@media (min-width: ${px['lg']})`,
  xl: `@media (min-width: ${px['xl']})`,
  px,
};
