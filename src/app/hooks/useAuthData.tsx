import { useAuth } from '@takamol/react-qiwa-core';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteProps, useNavigate } from 'react-router-dom';
import { PostRequestProxy, PostRequest } from 'src/Axios/axios';
import { storage } from 'src/services/storage';
import { saveRoleObject, saveUserObject } from 'src/store/actions';
import { addMinutesToDate, toCamel } from 'src/utils/common/utils';

export default function useAuthData() {
  const storeUser = useSelector((state: any) => state.user);
  const role = useSelector((state: any) => state.role);
  const { user, session, company: companyFromHook, authStatus } = useAuth();
  let company: any;

  const history = useNavigate();
  const dispatch = useDispatch();

  console.log('useAuth()', useAuth());

  //   useEffect(() => {
  //     if (!isLoadingAuth) {
  //       localStorage.setItem('expiryDate', JSON.stringify(addMinutesToDate(new Date(), 5)));
  //       syncData();
  //     }
  //   }, [isLoadingAuth]);

  //   useEffect(() => {
  //     !isLoadingAuth && !isAuthorized && localStorage.removeItem('qiwaCompany');
  //   }, [isAuthorized, isLoadingAuth]);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem('qiwaCompany') &&
  //     companyFromHook?.id !== JSON.parse(localStorage.getItem('qiwaCompany') as string).id
  //   ) {
  //     localStorage.removeItem('qiwaCompany');
  //   }
  // }, [companyFromHook]);

  const syncData = async () => {
    if (companyFromHook != null) {
      company = await getCompany();

      const res = await saveEstablishmentIfNotExists(user, company);
    } else if (session?.user != undefined) {
      getUserData(session?.user);
    }
  };

  const getCompany = async () => {
    const companyStr = localStorage.getItem('qiwaCompany');
    if (companyStr) {
      return JSON.parse(companyStr);
    }
    const res = await axios({
      url: `https://api.qiwa.info/context/company`,
      withCredentials: true,
      method: 'GET',
    });
    const relevantData = {
      ...res.data.data.attributes,
      nitaqEconomicActivityId: res.data.included[2].attributes['economic-activity-id'],
    };
    const company = Object.keys(relevantData).reduce((prevVal: any, key: any) => {
      prevVal[toCamel(key)] = relevantData[key];
      return prevVal;
    }, {});
    localStorage.setItem('qiwaCompany', JSON.stringify(company));
    return company;
  };

  const getUserData = async (id: any) => {
    const body = {
      uuid: id,
    };
    const result = await PostRequestProxy('GetUserByUUId', body);
    console.log('result', result);
    // const result = await GetRequest(`/user/uuid/${id}`);
    if (result?.data?.GetUserByUUId?.Header?.ResponseStatus?.Code == '000') {
      storage.setItem('user', result?.data?.GetUserByUUId?.Body);
      storage.setItem('role', result?.data?.GetUserByUUId?.Body?.role);
      dispatch(saveUserObject(result?.data?.GetUserByUUId?.Body));
      dispatch(saveRoleObject(result?.data?.GetUserByUUId?.Body?.role));
    }
  };
  const saveEstablishmentIfNotExists = async (user: any, company: any) => {
    //hardecoded nitaqat id please change to API.
    const payload = {
      user: {
        uuid: user.id,
        userName: user.personalNumber,
        firstName: user.name,
      },
      establishment: {
        companyNameArabic: company.establishmentName,
        companyNameEnglish: company.establishmentName,
        companyId: company.id,
        establishmentNo: company?.number,
        economicActivity: {
          id: company.nitaqEconomicActivityId,
        },
      },
    };
    const result = await PostRequestProxy('SaveEstablishmentIfNotExist', payload);
    // const result = await GetRequest(`/user/uuid/${id}`);
    if (result?.data?.SaveEstablishmentIfNotExist?.Header?.ResponseStatus?.Code == '000') {
      // const result = await PostRequest(`/saveEstablishmentIfNotExist`, payload);
      // if (result.status == 200) {
      storage.setItem('establishment', JSON.stringify(result?.data?.SaveEstablishmentIfNotExist?.Body?.establishment));
      storage.setItem('role', result?.data?.SaveEstablishmentIfNotExist?.Body?.user?.role);
      dispatch(saveUserObject(result?.data?.SaveEstablishmentIfNotExist?.Body?.user));
      // dispatch(saveRoleObject(result?.data?.SaveEstablishmentIfNotExist?.Body?.user?.role));
    }
  };
}
