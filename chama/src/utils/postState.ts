import { create } from 'zustand';

interface PostState {
  titulo: string;
  excerto: string;
  imagemPost: string;
  autor: string;
  slug: string;
  setPostData: (data: Partial<PostState>) => void;
}

export const usePostStore = create<PostState>((set) => ({
  titulo: '',
  excerto: '',
  imagemPost: '',
  autor: '',
  slug: '',
  setPostData: (data) => set(data),
}));
