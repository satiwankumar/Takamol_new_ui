import React, { useState, useEffect, useMemo } from 'react';
import { Box, QiwaTable, QIcon, Select, Button, Dialog, TextField } from '@takamol/qiwa-react-library';
//import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Typography, FormControl, MenuItem, Container } from '@mui/material';

import BoxWrapper from 'src/components/ui/BoxWrapper';
import { useLocale } from 'src/hooks/useLocale/useLocale';
import { PostRequestProxy, PostRequest } from '../../Axios/axios';
import { GETQIWAUSERSBYID, GETROLES, REGISTERUSER } from '../../utils/common/endpoint';
// import '../../../public/css/establishment.css';
import Success from '../../components/Modal.Success';

export const AddUsersForm = (props: any) => {
  const { t } = useLocale();
  useEffect(() => {
    getRoles();
  }, []);

  const getUserInformationWithId = async (e: any) => {
    if (e.target.value.length == 10) {
      const headers = {
        'Content-Type': 'application/json',
        'X-IBM-Client-Secret': '4e2b5e46d09fec6775177730e3b44aaf',
        'X-IBM-Client-Id': '514c55d8eb39044a69c1e9ab434ff616',
      };
      const data = JSON.stringify({
        GetUserInformationRq: {
          Header: {
            TransactionId: '4344444444444444444444444444333333',
            ChannelId: 'Qiwa',
            SessionId: '212',
            RequestTime: '2019-10-10 00:00:00.555',
            MWRequestTime: '2019-10-10 00:00:00.555',
            ServiceCode: 'GUI00001',
            DebugFlag: '1',
          },
          Body: {
            IdNo: e.target.value,
          },
        },
      });

      await axios
        .post(GETQIWAUSERSBYID, data, {
          headers: headers,
        })
        .then((response) => {
          if (response.status == 200) {
            if (response?.data?.GetUserInformationRs?.Body?.Status.StatusId == 1) {
              setUserOption(response?.data?.GetUserInformationRs?.Body.Name + '( ' + e.target.value + ' )');
              setUser({
                firstName: response?.data?.GetUserInformationRs?.Body.Name,
                uuid: response?.data?.GetUserInformationRs?.Body.UserId,
                phoneNumber: response?.data?.GetUserInformationRs?.Body.MobileNumber,
                userName: response?.data?.GetUserInformationRs?.Body.IdNo,
                email: response?.data?.GetUserInformationRs?.Body.Email,
                userPassword: 'ashdkjh2j394jha',
                userStatus: 'ACTIVE',
                establishmentId: 0,
              });
            }
          }
        });
    } else {
      setUserOption('');
      setUser([]);
    }
  };
  async function getRoles() {
    const result = await PostRequestProxy('GetAllRoles', null);

    if (result?.data?.GetAllRoles?.Header?.ResponseStatus?.Code == '000') {
      const temp: any = [];
      result?.data?.GetAllRoles?.Body.forEach((role: any, index: any) => {
        if (role.roleId != 1) {
          const roles = {
            label: role.role,
            value: role.roleId,
          };
          temp.push(roles);
        }
      });
      getUserRole(temp);
    }
  }
  async function registerUser(user: any) {
    const url = `/${REGISTERUSER}`;
    const result = await PostRequest(url, user);
    if (result?.status === 200 || result?.status === 201) {
      setOpen(!open);
      setUser({
        firstName: '',
        lastName: '',
        userPassword: '',
        phoneNumber: '',
        userName: '',
        email: '',
        role: {
          roleId: '',
        },
        userStatus: 'ACTIVE',
        establishmentId: '',
      });
      Success('User Registered Successfully');
      props.getUsers();
    }
  }
  const [open, setOpen] = useState(false);
  const [userName, setUserOption] = useState<any>('');
  const [role, getUserRole] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [selectedRole, setRole] = useState<any>();
  const toggleClose = (e: any) => {
    setOpen(!open);
  };
  const [user, setUser] = useState<any>({
    userName: '',
    firstName: '',
    userPassword: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userStatus: 'ACTIVE',
    role: {
      roleId: 0,
    },
    establishmentId: 0,
  });
  const handleRoleOnChange = (e: any) => {
    setUser({
      ...user,
      role: {
        roleId: e.value,
      },
    });
  };
  const handleSubmitUser = () => {
    registerUser(user);
  };

  return (
    <div>
      <Container className="esb-container-2" style={{ marginTop: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <>
              <div className="innerContainer">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {t('Users')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} justifyItems={'center'} margin="auto" display="flex" flexDirection={'row-reverse'}>
                    <Button color="primary" onClick={toggleClose}>
                      Add User{' '}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </>
          </Grid>
        </Grid>
      </Container>
      <Dialog title={'Add User'} isOpen={open} isFooter={false} onClose={toggleClose}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth size="small">
            <TextField
              css={{}}
              placeholder="Search User by NationalId"
              fullWidth={true}
              onKeyPress={(e) => getUserInformationWithId(e)}
            />
          </FormControl>
          <FormControl fullWidth size="small">
            <TextField value={userName} fullWidth={true} disabled css={{ display: 'none' }} />
          </FormControl>
          <FormControl fullWidth size="small">
            <Select options={role} onChange={(e: any) => handleRoleOnChange(e)} placeholder={'Select a role'}></Select>
          </FormControl>
          <FormControl fullWidth size="small" className="btndivflx">
            <Button variant="contained" color="primary" onClick={handleSubmitUser} className="22">
              {t('Submit')}
            </Button>
          </FormControl>
        </Box>
      </Dialog>
    </div>
  );
};
