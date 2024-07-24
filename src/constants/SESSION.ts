export const SESSION = {
  /**
   * Relative time from now in seconds when to expire the session.
   * @note Keep this lower than the actual token life time.
   */
  LIFE_TIME: 53000,
} as const;
