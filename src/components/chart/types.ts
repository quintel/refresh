/**
 * Configuration for drawing an axis.
 */
export type AxisConfig = {
  /**
   * Optional data to be used when drawing the axis. Typically used when the chart uses a ScaleBand
   * or ScalePoint scale.
   */
  data?: string[];
};

/**
 * AnnotationConfig allows drawing extra markers or lines on the chart, corresponding to a value.
 */
export type AnnotationConfig = {
  /**
   * The color to be used when drawing the annotation in the chart.
   **/
  color: string;
  /**
   * A unique name which identifies the annotation.
   */
  name: string;
  /**
   * Indicates whether the annotation should be drawn on top of a stack, and if so which one.
   */
  stack?: boolean | string;
  /**
   * Sets how to draw the annotation on the chart.
   */
  type: 'target-line';
  /**
   * Sets the y-axis value at which the annotation will be drawn.
   */
  value: YValue;
  /**
   * Sets the x-axis value at which the annotation will be drawn.
   */
  x: XValue;
};

/**
 * Type which defines the data required to configure a standard chart. Custom chart types may
 * implement a different interface.
 */
export type ChartConfig = {
  /**
   * Optional annotations and their configuration.
   */
  annotations?: AnnotationConfig[];
  /**
   * Define the data to be drawn on the chart, and their configuration.
   */
  series: SeriesConfig[];
  /**
   * Settings for drawing the x-axis (horizontal)/
   */
  xAxis: AxisConfig;
};

/**
 * SeriesConfig defines a series of data within a chart.
 */
export type SeriesConfig = {
  /**
   * The color to be used when drawing the series in the chart.
   **/
  color: string;
  /**
   * A unique name which identifies the series.
   */
  name: string;
  /**
   * Indicates whether the series belongs to a data stack (in which all series belonging to the
   * stack appear on top of each other). If the chart has multiple stacks - for example, grouped
   * stacked bar charts - the stack may be a string.
   */
  stack?: boolean | string;
  /**
   * The values for the series.
   */
  value: number[];
};
/**
 * Series are converted into "tables" where each value on the x-axis corresponds to an object
 * containing key-value pairs of each series and its value at that point on the x-axis.
 *
 * The `key` matches the value of the x-axis.
 *
 * @example
 *   { key: 'Future', coal: 10, gas: 20, wind: 15, solar: 15 };
 */
export type TablePoint = Record<string, YValue> & { key: XValue };

/**
 * Permitted types for values drawn against the x-axis.
 */
type XValue = number | string;

/**
 * Permitted types for values drawn against the y-axis.
 */
type YValue = number;
