import styled from '@emotion/styled';

import { color, fontFamily, fontSize } from '@/styles/theme';

const Placeholder = styled.div`
  background: rgb(0 0 0 / 10%);
  border-radius: 4px;
  color: ${color.secondary};
  display: inline-block;
  font-family: ${fontFamily.monospace};
  font-size: ${fontSize('xs')};
  height: 17px;
  line-height: 18px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  width: 24px;
`;

/**
 * Temporary until we have a proper "dataset" model of some kind.
 */
function normalizeRegionCode(code: string) {
  const lower = code.toLowerCase();

  if (lower === 'netherlands') {
    return 'nl';
  }

  return code;
}

export default function RegionFlagIcon({ regionCode }: { regionCode: string }): React.ReactElement {
  return <Placeholder aria-hidden="true">{normalizeRegionCode(regionCode)}</Placeholder>;
}
