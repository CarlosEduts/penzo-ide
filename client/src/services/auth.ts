import api from '@/utils/axios';
import Cookies from 'js-cookie';

export async function login(email: string, password: string) {
  const res = await api.post('/login', { email: email, password: password });
  Cookies.set('token', res.data.token, {
    secure: true,
    sameSite: 'strict',
  });
  return res.data;
}

export async function register(name: string, email: string, password: string) {
  const res = await api.post('/register', { name, email, password });
  return res.data;
}

export function logout() {
  Cookies.remove('token');
}
