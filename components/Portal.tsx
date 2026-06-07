import { createPortal } from 'react-dom';
import useIsMounted from '@/hooks/useIsMounted';

export default function Portal({
  children,
  disabled = false,
  container = undefined,
}) {
  const mounted = useIsMounted();

  if (!disabled && mounted) {
    return createPortal(children, container ?? document.body);
  }

  return children;
}
