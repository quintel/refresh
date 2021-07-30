import { LegendWrapper, LegendItem, LegendItemVariant } from './styles';
import type { AllOrNone } from '@/helpers/types';

/**
 * Type for the legend items
 */
type LegendItemProps = {
  color: string;
  hidden?: boolean;
  name: string;
  style?: LegendItemVariant;
};

type LegendEvents = {
  onItemClick: (name: string) => void;
  onItemMouseOut: (name: string) => void;
  onItemMouseOver: (name: string) => void;
};

/**
 * A legend (and legend item) must either specify no events or all the click and mouse events.
 */
type LegendProps = { items: LegendItemProps[] } & AllOrNone<LegendEvents>;

export default function Legend({
  items,
  onItemClick,
  onItemMouseOut,
  onItemMouseOver,
}: LegendProps): React.ReactElement {
  const interactive = !!onItemClick;

  return (
    <LegendWrapper>
      {items.map(({ name, color, hidden, style = 'box' }) => {
        const onClick = onItemClick
          ? () => {
              onItemClick(name);
            }
          : undefined;

        const onMouseOver = onItemMouseOver
          ? () => {
              onItemMouseOver(name);
            }
          : undefined;

        const onMouseOut = onItemMouseOut
          ? () => {
              onItemMouseOut(name);
            }
          : undefined;

        return (
          <LegendItem
            as={!interactive ? 'span' : undefined}
            hidden={hidden}
            interactive={interactive}
            key={name}
            onBlur={onMouseOut}
            onClick={onClick}
            onFocus={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            style={{ '--series-color': color }}
            type={interactive ? 'button' : undefined}
            variant={style}
          >
            {name}
          </LegendItem>
        );
      })}
    </LegendWrapper>
  );
}
