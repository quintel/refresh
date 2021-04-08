// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    // Custom properties for Sidebar.
    '--bar-width'?: string;
    // Custom properties for Disclosure.
    '--panel-height'?: string;
  }
}
