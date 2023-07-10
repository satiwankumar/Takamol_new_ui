import { Fort } from '@mui/icons-material';

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

export function setJWTToken(payload: string): actionType {
  return {
    type: TOKEN,
    payload,
  };
}

export function saveUserObject(user: User): saveUser {
  return {
    type: SAVEUSER,
    payload: user,
  };
}

export function saveRoleObject(role: string): any {
  return {
    type: ROLE,
    payload: role,
  };
}

export function clearStore(): clear {
  return {
    type: CLEAR,
  };
}

export function setLoading(): loadingType {
  return {
    type: LOADING,
  };
}

export function setNotLoading(): loadingType {
  return {
    type: NOTLOADING,
  };
}

export function savaPcRequestId(id: number): pcRequestId {
  return {
    type: PCREQUESTID,
    payload: id,
  };
}

export function handleLangDirChange(dir: string): langDirAction {
  return {
    type: LANGDIR,
    payload: dir,
  };
}
