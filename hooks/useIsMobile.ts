import useMedia from 'react-use/esm/useMedia';

export default function useIsMobile(defaultValue?: boolean | undefined) {
  return useMedia('(max-width: 768px)', defaultValue);
}
