import {IPopulate} from "models/query.ts"
export const populate: IPopulate[] = [
  {
    path: 'rocket',
    select: {name: 1},
  },
  {
    path: 'launchpad',
    select: {full_name: 1},
  },
  {
    path: 'payloads',
    select: {
      customers: 1,
      manufacturers: 1,
      mass_kg: 1,
      name: 1,
      nationalities: 1,
      orbit: 1,
      type: 1,
    },
  },
  {
    path: 'ships',
    select: {
      active: 1,
      image: 1,
      launches: 1,
      name: 1,
      type: 1,
    },
  },
];
