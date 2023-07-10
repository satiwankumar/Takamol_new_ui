import moment from 'moment';

export class CommonUtils {
  public static isMobile() {
    if (window.outerWidth < 768) {
      //if(window.outerWidth < 821){
      return true;
    } else {
      return false;
    }
  }
}

// make function definition

export const CONVERTSTATUS = (status: any) => {
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: any, d: any) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()));
  return titleCase(status.toLowerCase());
};

export const addMinutesToDate = (date: Date, minutes: number) => {
  const expiryTime = new Date(date.getTime() + minutes * 60000);
  expiryTime.setSeconds(expiryTime.getSeconds() - 10);
  return expiryTime;
};

export const getTimeDifferenceInMinutes = (date2: Date, date1: Date) => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime()); // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  return diffInMinutes;
};

export const E2A = (s: any, lang: any) => {
  if (lang == 'ar') {
    return s.replace(/\d/g, (d: any) => '٠١٢٣٤٥٦٧٨٩'[d]);
  }
  if (lang == 'en') {
    return s.replace(/\d/g, (d: any) => '0123456789'[d]);
  }
};
export const base64toBlob = (data: string) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  const out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: 'application/pdf' });
};

export const GetCurrentDate = () => {
  const today = new Date().toISOString().slice(0, 16);
  return today;
};

export const fileValidation = (files: any) => {
  const allowedformats = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'application/pdf'];
  if (!allowedformats.includes(files.type)) {
    Error('Only PDFs and Images are valid.');
    return false;
  } else {
    return true;
  }
};

export function convertToDate(milliseconds: any, lang: any): string {
  if (milliseconds) {
    let language = lang;
    if (language == 'ar') {
      language = 'ar-SA';
    }
    if (language == 'en') {
      language = 'en';
    }

    const dateString = new Date(milliseconds).toLocaleDateString(language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return dateString;
  } else {
    return '-';
  }
}

export function convertToDateWithoutTimeStamp(milliseconds: any, lang: any): string {
  if (milliseconds) {
    let language = lang;
    if (language == 'ar') {
      language = 'ar-SA';
    }
    if (language == 'en') {
      language = 'en';
    }

    const dateString = new Date(milliseconds).toLocaleDateString(language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return dateString;
  } else {
    return '-';
  }
}

export const QIWA_ROLES = ['ohs-admin', 'ohs-representative'];

export const Roles = ['SUPERVISIOR', 'INSPECTOR', 'VERIFIER'];
export const AdminStatus = ['DRAFT', 'PUBLISHED', 'ARCHEIVED'];

export function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (<string>reader.result).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

// function checkPath(pathname:any, array:any) {
//   var pathname = pathname.split('/');
//   var pathname = pathname[1];
//   var array = array.map(function(item:any) {
//     return item.split('/')[1];
//   });
//   var result = array.filter(function(item:any) {
//     return item === pathname;
//   });
//   return result.length > 0;
// }

export function nomalizeDate(date: any) {
  const finaldate = date.replace(/\//g, '-');

  // return moment(finaldate).format('YYYY-MM-DD');
  return finaldate;
}

export function addParameterToURL(url: string, param: any) {
  url += (url.split('?')[1] ? '&' : '?') + param;
  return url;
}

export function toCamel(s: string) {
  return s.replace(/([-_][a-z])/gi, ($1: string) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}
