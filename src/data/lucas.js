// Lucas's data - imported from JSON, avatar URL added at runtime
import data from './lucas-data.json';

export const lucas = {
  ...data,
  avatar: import.meta.env.BASE_URL + 'lucas-avatar.png',
};
