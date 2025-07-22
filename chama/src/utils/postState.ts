import { create } from 'zustand';

interface PostState {
  titulo: string;
  excerto: string;
  imagemPost: string;
  autor: string;
  slug: string;
  empresa?: string;
  telefone?: string;
  whatsapp?: string;
  site?: string;
  setPostData: (data: Partial<PostState>) => void;
}

export const usePostStore = create<PostState>((set) => ({
  titulo: '',
  excerto: '',
  imagemPost: '',
  autor: '',
  slug: '',
  empresa: undefined,
  telefone: undefined,
  whatsapp: undefined,
  site: undefined,
  setPostData: (data) => set(data),
}));
