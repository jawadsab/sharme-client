import { REGISTER, LOGIN } from '../constants';
import { request } from '../api';

export const register = (formData) => {
  return request({
    url: '/api/auth/register',
    method: 'POST',
    data: formData,
  });
};
