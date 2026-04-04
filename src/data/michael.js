// Michael's data - imported from JSON, avatar URL added at runtime
import data from './michael-data.json';

export const michael = {
  ...data,
  avatar: import.meta.env.BASE_URL + 'michael-avatar.png',
};
