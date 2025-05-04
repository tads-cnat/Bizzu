// BeeButton.props.ts
import { ReactNode } from 'react';

export type BeeButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'neutral';
export type BeeButtonSize = 'sm' | 'md' | 'lg';

export interface BeeButtonProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  variant?: BeeButtonVariant;
  size?: BeeButtonSize;
  className?: string;
  href?: string;
  disabled?: boolean;
}
