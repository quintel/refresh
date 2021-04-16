// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors

import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    // Play/Sidebar
    '--bar-width'?: string;

    // Dialog
    '--dialog-width'?: string;

    // Custom properties for Disclosure.
    '--panel-height'?: string;
  }
}
