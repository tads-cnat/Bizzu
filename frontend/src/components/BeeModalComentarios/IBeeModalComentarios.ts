import type { BeePostProps } from "../BeePost/IBeePost";

export interface IBeeModalComentarios {
  isOpen: boolean
  onClose: () => void
  post: BeePostProps
  onComentarioAdicionado?: () => void
}
