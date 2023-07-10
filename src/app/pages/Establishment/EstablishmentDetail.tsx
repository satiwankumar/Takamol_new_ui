import React, { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  InputLabel,
} from '@mui/material';
import { Button, Checkbox } from '@takamol/qiwa-design-system/components';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import BoxWrapper from '../../../components/ui/BoxWrapper';
import { useLocale } from 'src/app/translations/hooks/useLocale';

const useStyles = makeStyles((theme: any) => ({
  contentWrapper: {
    margin: '0 auto!important',
    width: '80%',
    '@media (max-width: 820px)': {
      width: '95%',
    },
  },
  heading: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  h4head: {
    marginBottom: '4px!important',
    fontSize: '2.3rem!important',
  },
  phead: {
    marginBottom: '4px!important',
    fontSize: '1.2rem!important',
  },
  inputfield: { marginBottom: '30px' },
  input: { width: '100%' },
  companyResprentDetails: { marginBottom: '50px' },
  companyDetailhead: {
    marginBottom: '10px!important',
    fontSize: '1.4rem!important',
  },
  companyDetails: { marginBottom: '50px' },
  companyAddress: { marginBottom: '50px' },
  socialMediaLinks: { marginBottom: '20px' },
  tick: { textAlign: 'center' },
  btn: {
    marginTop: '50px!important',
    padding: '10px 20px!important',
    width: '250px',
    '@media (max-width: 820px)': {
      width: '100%',
    },
  },
  btn2: {
    marginRight: '16px!important',
    marginLeft: '10px!important',
    marginTop: '50px!important',
    padding: '10px 20px!important',
    width: '250px',
    '@media (max-width: 820px)': {
      width: '100%',
      marginRight: '0 !important',
      marginLeft: '0 !important',
    },
  },
  inputlabel: {
    fontSize: '0.9rem!important',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: '400',
  },
  formchecklabel: { fontSize: '2rem!important' },
}));

function EstablishmentDetails(props: any) {
  const { t } = useLocale();
  const classes = useStyles();
  const [terms, setTerms] = useState<boolean>(false);

  return (
    <Container>
      <BoxWrapper>
        <div className={classes.contentWrapper}>
          <div className={classes.heading}>
            <Typography variant="h4" dir="ltr" className={classes.h4head}>
              {t('Fillinthecompanydetails')}
            </Typography>
            <Typography variant="body1" dir="ltr" className={classes.phead}>
              {t('Completethemissingestablishment')}
            </Typography>
          </div>

          <div className={classes.companyResprentDetails}>
            <Typography variant="h5" className={classes.companyDetailhead}>
              {t('CompanyRepresentativeDetails')}
            </Typography>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder={t('John')}
                value={'userName'}
                variant="outlined"
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('CompanyRepresentativename')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder={t('example@gmail.com')}
                value={'email'}
                variant="outlined"
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Emailaddress')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="966+"
                value={'phoneNumber'}
                variant="outlined"
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Phonenumber')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField className={classes.input} id="outlined-basic" placeholder="966+" variant="outlined" disabled />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Additionalphonenumber')}
              </Typography>
            </div>
          </div>

          <div className={classes.companyDetails}>
            <Typography variant="h5" className={classes.companyDetailhead}>
              {t('CompanyDetails')}
            </Typography>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="اسم الشركة"
                variant="outlined"
                value={'ompany[0].companyNameEnglish'}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('CompanynameinEnglish')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="e.g. Arabic Vegan"
                variant="outlined"
                value={'company[0].companyNameArabic'}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('CompanynameinArabic')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="e.g. 0987435464+"
                variant="outlined"
                value={'company[0].taxNumber'}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Taxnumber')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="e.g. Providing services+"
                variant="outlined"
                value={`company[0].economicActivity
                      .economicActivity`}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Economicactivity')}
              </Typography>
            </div>
            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="966+"
                variant="outlined"
                value={'company[0].phoneNumber'}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Phonenumber')}
              </Typography>
            </div>
          </div>

          <div className={classes.companyAddress}>
            <Typography variant="h5" className={classes.companyDetailhead}>
              {t('CompanyAddress')}
            </Typography>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="Riyadh 45"
                variant="outlined"
                value={''}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Region')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="Riyadh 45"
                variant="outlined"
                value={'sdfsdfsd'}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('City')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="Riyadh 45"
                variant="outlined"
                value={`ompany[0].establishmentAddress
                      .district`}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('District')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField
                className={classes.input}
                id="outlined-basic"
                placeholder="Riyadh 45"
                variant="outlined"
                value={`ompany[0].establishmentAddress
                      .street`}
                disabled
              />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Street')}
              </Typography>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399557.22548428!2d39.073276221428664!3d21.50150850284162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1655391439191!5m2!1sen!2s"
            width="100%"
            height="300"
            title="map"
          ></iframe>

          <div className={classes.socialMediaLinks}>
            <Typography variant="h5" className={classes.companyDetailhead}>
              {t('SocialMediaLinks')}
            </Typography>

            <div className={classes.inputfield}>
              <TextField className={classes.input} id="outlined-basic" placeholder="Linkedin link" variant="outlined" />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Linkedin')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField className={classes.input} id="outlined-basic" placeholder="Twitter link" variant="outlined" />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Twitter')}
              </Typography>
            </div>

            <div className={classes.inputfield}>
              <TextField className={classes.input} id="outlined-basic" placeholder="Facebook link" variant="outlined" />
              <Typography variant="body1" className={classes.inputlabel}>
                {t('Facebook')}
              </Typography>
            </div>
          </div>

          <div className={classes.tick}>
            <FormGroup>
              <FormControlLabel
                className={classes.formchecklabel}
                control={
                  <Checkbox defaultChecked onChange={() => setTerms(!terms)} required color="primary" size="small" />
                }
                label={t('IaccepttheTermsandConditions')}
              />
            </FormGroup>
            <Button
              variant="outlined"
              size="large"
              className={classes.btn2}
              // onClick={props.handleBack}
            >
              {t('Goback')}
            </Button>
            <Button
              variant="contained"
              size="large"
              className={classes.btn}
              // onClick={props.handleStep}
              disabled={terms}
            >
              {t('Continue')}
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </Container>
  );
}

export default EstablishmentDetails;
