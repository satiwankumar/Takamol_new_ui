import {
  CLEAR,
  LOADING,
  NOTLOADING,
  SAVEUSER,
  TOKEN,
  PCREQUESTID,
  LANGDIR,
  ROLE,
} from '../action-types/actionsConstants';

import {
  initialState,
  userInitialState,
  loadingInitialState,
  pcRequestIdInitialState,
  langDir,
  role,
} from './initialState';

const reducer = (state: string = initialState, action: actionType): string => {
  switch (action.type) {
    case TOKEN:
      state = action.payload;
      return state;
    case CLEAR:
      state = initialState;
      return state;
    default:
      return state;
  }
};

export const saveUserReducer = (state: User | null = userInitialState, action: saveUser): User | null => {
  switch (action.type) {
    case SAVEUSER:
      state = action.payload;
      return state;
    case CLEAR:
      state = userInitialState;
      return state;
    default:
      return state;
  }
};

export const loadingReducer = (state: boolean = loadingInitialState, action: loadingType): boolean => {
  switch (action.type) {
    case LOADING:
      state = true;
      return state;
    case NOTLOADING:
      state = false;
      return state;
    case CLEAR:
      state = loadingInitialState;
      return state;
    default:
      return state;
  }
};

export const pcRequestIdReducer = (
  state: number | null = pcRequestIdInitialState,
  action: pcRequestId,
): number | null => {
  switch (action.type) {
    case PCREQUESTID:
      state = action.payload;
      return state;

    default:
      return state;
  }
};

export const langReducer = (state: string = langDir, action: langDirAction): string => {
  switch (action.type) {
    case LANGDIR:
      state = action.payload;
      return state;

    default:
      return state;
  }
};

export const roleReducer = (state: string | null = role, action: any): string | null => {
  switch (action.type) {
    case ROLE:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default reducer;
