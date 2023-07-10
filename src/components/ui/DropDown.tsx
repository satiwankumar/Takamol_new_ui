import * as React from 'react';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Button } from '@takamol/qiwa-design-system/components';
import { Menu, MenuItem } from '@mui/material';
import { useNavigation } from 'react-router-dom';

import { useLocale } from 'src/app/translations/hooks/useLocale';

export interface DropdownDataProps {
  id: number;
  buttons: any;
  handleClickOpen: (id: number) => void;
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    // '& .MuiButton-root.MuiButton-containedPrimary': {
    //     backgroundColor: '#148287'
    // },
  },
  verticon: {
    background: '#ecf5f5',
    color: '#148287',
    width: '40px !important',
    height: '40px !important',
    borderRadius: '50%',
    padding: '6px',
  },
  iconMr: {
    marginLeft: '10px',
    marginRight: '10px',
  },
}));

function DropDown(props: DropdownDataProps) {
  const { buttons } = props;
  const classes = useStyles();
  const history = useHistory();
  const { t, locale } = useLocale();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button id="basic-button" color="primary" variant="outlined" onClick={handleClick}>
        <span className="icon__subclass">{/* <QIcon name="options" /> */}</span>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {buttons?.length > 0 &&
          buttons.map((item: any, index: number) => (
            <MenuItem key={index} onClick={() => history.push(item?.link)}>
              <RemoveRedEyeRoundedIcon className={classes.iconMr} />
              {t(item?.title)}{' '}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default DropDown;
