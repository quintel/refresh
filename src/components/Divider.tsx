import styled from '@emotion/styled';

const StyledDivider = styled.hr`
  border-width: 0px 0px 1px;
  border-top-style: initial;
  border-right-style: initial;
  border-left-style: initial;
  border-image: initial;
  border-bottom-style: solid;
  border-color: inherit;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.2;
`;

export default function Divider(): React.ReactElement {
  return <StyledDivider aria-orientation="horizontal" />;
}
