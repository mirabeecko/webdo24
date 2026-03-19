import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function Tag({ children, className, icon }: TagProps) {
  return (
    <span className={cn('tag', className)}>
      {icon && icon}
      {children}
    </span>
  );
}
