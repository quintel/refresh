import Color from 'color';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { color, space, fontFamily, transition } from '@/styles/theme';

export const Container = styled.header`
  align-items: center;
  background: ${Color(color.primary(6)).desaturate(0.2).toString()}
    linear-gradient(to bottom, rgb(255 255 255 / 15%), transparent);
  color: ${Color(color.white).fade(0.2).toString()};
  display: flex;
  justify-content: space-between;
  padding: ${space(10)} ${space(16)};
`;

export const LogoPlaceholder = styled.div`
  align-items: center;
  background: rgb(255 255 255 / 10%);
  display: inline-flex;
  font-family: ${fontFamily.monospace};
  height: 37px;
  justify-content: space-around;
  text-transform: uppercase;
  width: 300px;
`;

export const Buttons = styled.div`
  align-items: center;
  display: flex;

  & > * {
    margin-left: ${space(12)};
  }
`;

/**
 * A version of the header link which has a filled semi-transparent background.
 */
const headerLinkFill = css`
  background: ${Color(color.white).fade(0.9).toString()};
  border-radius: 9999px;
  display: inline-block;
  padding: ${space(6)} ${space(14)};

  ${transition.default(['background', 'color'])}

  &:hover, &[aria-expanded="true"] {
    background: rgb(255 255 255 / 20%);
  }
`;

/**
 * A version of the header link which has an outlined border.
 */
const headerLinkOutline = css`
  border-radius: 9999px;
  box-shadow: inset 0 0 0 2px ${Color(color.white).fade(0.9).toString()};
  display: inline-block;
  padding: ${space(6)} ${space(14)};

  ${transition.default(['border', 'color'])}

  &:hover, &[aria-expanded="true"] {
    box-shadow: inset 0 0 0 2px ${Color(color.white).fade(0.8).toString()};
  }
`;

export const HeaderLink = styled.button<{ variant?: 'fill' | 'outline' }>`
  color: ${Color(color.white).fade(0.2).toString()};
  display: inline-block;
  font-weight: 500;
  padding: ${space(6)} ${space(8)};

  ${transition.default('color')}

  ${({ variant }) => variant === 'fill' && headerLinkFill}
  ${({ variant }) => variant === 'outline' && headerLinkOutline}

  &:hover, &[aria-expanded="true"] {
    color: ${color.white};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const GroupedHeaderLinks = styled.div`
  display: inline-flex;

  ${HeaderLink} {
    padding: ${space(6)} ${space(14)};

    &:first-of-type {
      border-radius: 9999px 0 0 9999px;
      padding-right: ${space(12)};
    }

    &:last-of-type {
      border-radius: 0 9999px 9999px 0;
      padding-left: ${space(12)};
    }
  }

  ${HeaderLink} + ${HeaderLink} {
    margin-left: 1px;
  }
`;
