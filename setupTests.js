import '@testing-library/jest-dom/extend-expect';

// https://github.com/framer/motion/issues/204#issuecomment-669094118
// https://github.com/jsdom/jsdom/issues/1330
if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}
