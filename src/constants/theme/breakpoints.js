// theme.js
const breakpoints = ['375px', '512px', '768px', '1024px', '1440px', '1920px'];

// Use bootstrap's strategy to avoid breakpoint overlap
const getLowerBound = breakpoint => `${parseFloat(breakpoint) + 0.02}px`;

// aliases
// min-width breakpoints should ALWAYS use fooLower variants
// max-width breakpoints should ALWAYS use foo variants
// This is to avoid breakpoints potentially overlapping (and cascading, which is unpredictable)
breakpoints.xs = breakpoints[0];
breakpoints.smLower = getLowerBound(breakpoints[0]);
breakpoints.sm = breakpoints[1];
breakpoints.mdLower = getLowerBound(breakpoints[1]);
breakpoints.md = breakpoints[2];
breakpoints.lgLower = getLowerBound(breakpoints[2]);
breakpoints.lg = breakpoints[3];
breakpoints.xlLower = getLowerBound(breakpoints[3]);
breakpoints.xl = breakpoints[4];
breakpoints.xxlLower = getLowerBound(breakpoints[4]);
breakpoints.xxl = breakpoints[5];

export default breakpoints;
