// Centralized test data — single source of truth for user credentials
export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'wrong_user',
    password: 'wrong_password',
  },
} as const;