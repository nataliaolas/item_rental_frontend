import * as models from "../models/rootModels";
import { createSelector } from "reselect";

const statusFiltersSelectorModel = (state) => state.statusFilters;

export const statusFilterSelectroModel = createSelector(
    statusFiltersSelectorModel,
    (state) =>
        state
);