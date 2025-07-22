export interface FiltrosPostagem {
  tecnologias: number[]
  cursos: number[]
  periodos: number[]
}

export interface IBeeModalFiltros {
  isOpen: boolean
  onClose: () => void
  onAplicarFiltros: (filtros: FiltrosPostagem) => void
  filtrosAtuais?: FiltrosPostagem | null
}
