import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

/**
 * A specialized version of Visx's ParentSize which does not render children when the width or
 * height are zero.
 */
export default function ParentSizeConditional({
  children,
  ...rest
}: React.ComponentProps<typeof ParentSize>): React.ReactElement {
  return (
    <ParentSize {...rest}>
      {(size) => (size.height === 0 || size.width === 0 ? undefined : children(size))}
    </ParentSize>
  );
}
