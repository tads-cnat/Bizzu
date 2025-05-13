import { ReactNode } from 'react';

interface BeeSidebarItem {
  // Texto que será exibido no item do menu
  label: string;
  // Ícone que acompanha o label (opcional)
  icon?: ReactNode;
  // Função chamada ao clicar no item (opcional)
  onClick?: () => void;
  // Imagem associada ao item (opcional)
  image?: string;
  // Subitens do menu (opcional, para menus dropdown)
  children?: BeeSidebarItem[];
}

export interface IBeeSidebarProps {
  // Nome do usuário exibido na sidebar
  userName: string;
  // Cargo ou função do usuário (opcional, padrão: "Ver Perfil")
  userRole?: string;
  // URL da imagem de perfil do usuário
  userImage: string;
  // Lista de itens do menu lateral
  items: BeeSidebarItem[];
}
