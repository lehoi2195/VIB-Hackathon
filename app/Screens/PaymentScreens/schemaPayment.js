import * as yup from 'yup';
import {REGEX} from '@/Configs/Regex';

const text = 'Vui lòng nhập';

export const schema = yup.object().shape({
  // username: yup
  //   .string()
  //   .required(`${text} Họ và tên`)
  //   .min(5, 'Họ và tên phải trên 5 ký tự')
  //   .max(120),
  // email: yup
  //   .string()
  //   .required(`${text} Email`)
  //   .max(120)
  //   .matches(RegExp(REGEX.EMAIL), 'Email không hợp lệ. Vui lòng thử lại')
  //   .typeError(''),
  // password: yup
  //   .string()
  //   .required(`${text} mật khẩu`)
  //   .min(8, 'Mật khẩu phải trên 8 ký tự')
  //   .max(120),
});
