export interface IBeeTextArea {
    // ID e nome do campo (útil para formulários e acessibilidade)
    id?: string;
  
    // Texto que aparece dentro da área de texto quando está vazia
    placeholder?: string;
  
    // Valor inicial do campo de texto
    defaultValue?: string;
  
    // Função chamada sempre que o conteúdo do campo muda
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
    // Número de linhas (altura) da área de texto
    rows?: number;
  
    // Rótulo visível acima da área de texto
    label?: string;

    // valor atual do input ( basicamente ta sendo usado pra puxar o que o usuário salvo previamente em "x" campo)
    value?: any;
  }