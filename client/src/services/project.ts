import api from '@/utils/axios';

export const createProject = async (data: {
  name: string;
  codeHtml: string;
  codeCss: string;
  codeJs: string;
  isPublic: boolean;
}) => {
  const res = await api.post('/projects/create', data);
  return res.data;
};

export const getMyProjects = async () => {
  const res = await api.get('/projects/my');
  return res.data;
};

export const getPublicProjects = async () => {
  const res = await api.get('/projects/public');
  return res.data;
};

export const getProjectById = async (id: string) => {
  const res = await api.get(`/projects/id/${id}`);
  return res.data;
};

export const updateProject = async (id: string, data: { name?: string; isPublic?: boolean }) => {
  const res = await api.put(`/projects/id/${id}`, data);
  return res.data;
};

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/projects/id/${id}`);
  return res.data;
};
