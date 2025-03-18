export const SPACING = {
  xs: '0.5rem',  // 2px
  sm: '1rem',    // 4px
  md: '1.5rem',  // 6px
  lg: '2rem',    // 8px
  xl: '3rem',    // 12px
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
  wide: 1536,
} as const;

export const TRANSITIONS = {
  DEFAULT: 'all 150ms ease-in-out',
  SCALE: 'transform 150ms ease-in-out',
  OPACITY: 'opacity 150ms ease-in-out',
} as const;

export const STATUS_COLORS = {
  active: 'emerald',
  recent: 'blue',
  shared: 'purple',
  template: 'orange',
  archived: 'gray',
} as const;

export const GRID_LAYOUTS = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  wide: 4,
} as const; 