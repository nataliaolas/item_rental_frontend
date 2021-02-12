import { createSelector } from "reselect";

const nameFiltersSelectorModel = (state) => state.nameFilters;

export const nameFiltersSelector = createSelector(
  nameFiltersSelectorModel,
  (state) =>
    state
);
