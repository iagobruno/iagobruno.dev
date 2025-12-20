import useMedia from 'react-use/esm/useMedia';

export default function useIsMobile() {
  return useMedia('(max-width: 768px)');
}
