import { useEffect } from 'react';

const useTitle = (title: any) => {
   // @ts-expect-error
   useEffect(() => {
      const prevTitle = document.title;
      document.title = title;

      return () => (document.title = prevTitle);
   }, [title]);
};

export default useTitle;
