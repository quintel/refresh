import styled from '@emotion/styled';
import { VisuallyHidden } from '@reach/visually-hidden';
import ReactMarkdown from 'react-markdown';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/disclosure';
import { color, space, rounded } from '@/styles/theme';

const DescriptionBox = styled.div`
  background: ${color.gray(1)};
  padding: ${space(20)};
  border-radius: ${rounded()};
  margin-top: ${space(16)};

  p {
    margin-bottom: ${space(16)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

interface SliderDescriptionProps {
  children: React.ComponentProps<typeof ReactMarkdown>['children'];
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
}

export default function SliderDescription({
  children,
  toggleButtonRef,
}: SliderDescriptionProps): React.ReactElement {
  return (
    <Disclosure>
      <VisuallyHidden>
        <DisclosureButton ref={toggleButtonRef} as="button">
          Show description
        </DisclosureButton>
      </VisuallyHidden>
      <DisclosurePanel>
        <DescriptionBox>
          <ReactMarkdown>{children}</ReactMarkdown>
        </DescriptionBox>
      </DisclosurePanel>
    </Disclosure>
  );
}
