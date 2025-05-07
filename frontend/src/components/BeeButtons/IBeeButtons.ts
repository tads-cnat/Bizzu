// BeeButton.props.ts
import { ReactNode } from 'react';
// Aqui é onde ficam as variantes, então se você precisar criar um novo botão ou a variante de um botão existente, crie uma tag/nome para esse botão aqui
export type BeeButtonVariantes = 'primaria' | 'secundaria' | 'negativo' | 'aviso' | 'neutro';
// Aqui são os tamanhos pré-determinados dos botões, não está sendo usado pois da para aumentar ou diminuir usando tailwind, 
// mas ele existe e está ai para se modificar caso precise
export type BeeButtonTamanhos = 'pequeno' | 'medio' | 'grande';

// Aqui é o props/Interface dos botões, onde ficam todas as coisas possíveis para se fazer com os botões, então caso você precise de algo
// específico que não existe nos botões, adicione ele ao props (lembrando de adicionar uma interrogação ao final do atributo, para que ela não seja
// obrigatória em todos os)

export interface BeeButtonProps {
  // Texto do botão
  label?: string;
  // Ícone do botão
  icone?: ReactNode;
  // Função do botão
  onClick?: () => void;
  // para botões carregando, a implementação está aqui mas não necessariamente precisa ser utilizado
  estaCarregando?: boolean;
  // Variantes prontas
  variante?: BeeButtonVariantes;
  // Tamanhos prontos do botão
  tamanho?: BeeButtonTamanhos;
  // Classes tailwind
  className?: string;
  // Href do botão
  href?: string;
  // Se o botão vai estar desabilitado
  desabilitado?: boolean;
  // Para botões sem classes
  classesDefault?: boolean;
}
