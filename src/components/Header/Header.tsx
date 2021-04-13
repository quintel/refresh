import { Buttons, Container, GroupedHeaderLinks, HeaderLink, LogoPlaceholder } from './styles';
import LanguageMenu from './LanguageMenu';
import UserMenu from './UserMenu';

interface HeaderProps {
  /**
   * Key of the current locale.
   */
  locale: React.ComponentProps<typeof LanguageMenu>['selected'];
  /**
   * Temporary user object schema.
   * @todo Remove or replace with a model.
   */
  user?: React.ComponentProps<typeof UserMenu>['user'];
}

export default function Header({ locale, user }: HeaderProps): React.ReactElement {
  return (
    <Container>
      <LogoPlaceholder>Logo</LogoPlaceholder>
      <Buttons>
        <HeaderLink>Feedback</HeaderLink>
        <LanguageMenu selected={locale} />
        {user ? (
          <GroupedHeaderLinks>
            <HeaderLink as="button" variant="fill">
              My scenarios
            </HeaderLink>
            <UserMenu user={user} />
          </GroupedHeaderLinks>
        ) : (
          <>
            <HeaderLink variant="outline">Sign up</HeaderLink>
            <HeaderLink variant="fill">Log in</HeaderLink>
          </>
        )}
      </Buttons>
    </Container>
  );
}
