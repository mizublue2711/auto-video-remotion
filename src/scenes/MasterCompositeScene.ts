/**
 * ============================================================================
 * 🎨 MASTER THEME TOKENS
 * Design tokens and spatial palette for Scene composites
 * ============================================================================
 */

export const THEME_TOKENS = {
  background: {
    global: '#070D1E',
    ambientGlow: 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.15) 0%, rgba(7, 13, 30, 0.85) 60%, #070D1E 100%)',
    secondary: '#0C1E4A',
  },
  accent: {
    cyan: '#00E5FF',
    blue: '#0284C7',
    gold: '#F59E0B',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
  },
} as const;

export type ThemeTokens = typeof THEME_TOKENS;
