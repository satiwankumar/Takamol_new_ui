import axios from 'axios';

import { addMinutesToDate, getTimeDifferenceInMinutes } from 'src/utils/common/utils';
// import { setLoading, setNotLoading } from 'src/store/actions';
// import store from 'src/store/myStore';
export const axiosObject = axios.create();
export const BASEURLFiles = 'https://internal-occupational-health-and-safety-api.qiwa.info/api/v1';
export const BASEURLFile = 'https://internal-occupational-health-and-safety-api.qiwa.info/api/v1/files';
export const BASE_URL_JPROXY = 'https://qiwa-java-proxy.qiwa.info/qiwa/layer/proxy';

//  Javaproxt middleware implementation
export const PostRequestProxy = async (apiController: string, bodyHeader: any): Promise<any> => {
  // const expiryTime = new Date(JSON.parse(localStorage.getItem('expiryDate') || ''));
  // const now = new Date();
  // const difference = getTimeDifferenceInMinutes(now, expiryTime);
  // if (now.getTime() > expiryTime.getTime() || difference < 3) {
  //   try {
  //     const res = await contextRequest();
  //   } catch (e) {
  //     location.reload();
  //   }
  // }
  const customHeader = {
    [apiController]: {
      Header: {
        TransactionId: Date.now() + Math.floor(Math.random() * 3600) + 1,
        ChannelId: 'Qiwa',
        SessionId: '342343423',
        RequestTime: '34234234',
        MWRequestTime: '234234234',
        ServiceCode: '002',
        DebugFlag: 0,
        UserInfo: 'OSH',
      },
      Body: bodyHeader,
    },
  };

  return axiosObject
    .post<string, string>(`${BASE_URL_JPROXY}`, customHeader)
    .then((res) => res)
    .catch((err) => console.log(err));
};
const contextRequest = async () => {
  const res = await axios({
    method: 'get',
    url: 'https://api.qiwa.info/context',
    withCredentials: true,
  });
  localStorage.setItem('expiryDate', JSON.stringify(addMinutesToDate(new Date(), 5)));
  return res;
};

//there are changes
export const PostRequestProxyWithLoader = (
  apiController: string,
  bodyHeader: any,
  handleProgress: any,
  index: any,
): Promise<any> => {
  const customHeader = {
    [apiController]: {
      Header: {
        TransactionId: Date.now(),
        ChannelId: 'Qiwa',
        SessionId: '342343423',
        RequestTime: '34234234',
        MWRequestTime: '234234234',
        ServiceCode: '002',
        DebugFlag: 0,
        UserInfo: 'OSH',
      },

      Body: bodyHeader,
    },
  };

  return axiosObject
    .post<string, string>(`${BASE_URL_JPROXY}`, customHeader, {
      onUploadProgress: (data: any) => {
        //
        //Set the progress value to show the progress bar
        handleProgress((data.loaded / data.total) * 100, index);
      },
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};
export const GetRequest = (URL: string): Promise<any> => {
  return axiosObject.get(`${BASEURLFiles}${URL}`).then((res) => {
    return res;
  });
};

export const PostRequest = (URL: string, body: any): Promise<any> => {
  return axiosObject
    .post<string, string>(`${BASEURLFiles}${URL}`, body)
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const PutRequest = (URL: string, id: any, body: any): Promise<any> => {
  return axiosObject.put(`${BASEURLFiles}${URL}` + `/${id}`, body).then((res) => res);
};

export const DeleteRequest = (URL: string, id: any): Promise<any> => {
  return axiosObject.delete(`${BASEURLFiles}${URL}` + `/${id}`).then((res) => res);
};

export const PatchRequest = (URL: string, body: any) => {
  return axiosObject
    .patch(`${BASEURLFiles}${URL}`, body)
    .then((res) => res)
    .catch((err) => console.log(err));
};

axiosObject.interceptors.request.use(
  function (config: any) {
    // if (
    //   !config.url
    //     .toString()
    //     .includes(`${process.env.REACT_APP_BASE_URL}/${AUTH_USER}`)
    // ) {

    //   config.headers.Authorization = `Bearer ${store.getState().token}`;

    // }
    // store.dispatch(setLoading());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosObject.interceptors.response.use(
  function (config: any) {
    // store.dispatch(setNotLoading());

    return config;
  },
  function (error) {
    // store.dispatch(setNotLoading());
    return Promise.reject(error);
  },
);
