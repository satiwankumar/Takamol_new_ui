type actionType = {
  type: string;
  payload: string;
};
type saveUser = {
  type: string;
  payload: User;
};

type clear = {
  type: string;
};

type loadingType = {
  type: string;
};

type pcRequestId = {
  type: number;
  payload: number;
};

type langDirAction = {
  type: string;
  payload: string;
};
