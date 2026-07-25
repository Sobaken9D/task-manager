// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

// // Выключаем крутилку (spinner) справа, оставляем только полосу
// NProgress.configure({ showSpinner: false, speed: 300 });
//
// export const TopLoader = () => {
//   const location = useLocation();
//
//   useEffect(() => {
//     // Запускаем полосу при смене роута
//     NProgress.start();
//
//     // И сразу завершаем её, так как компоненты рендерятся моментально
//     NProgress.done();
//   }, [location.pathname]); // Реагирует на изменение пути страницы
//
//   return null;
// };

import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const TopLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Теперь state будет "loading", пока резолвится todoLoader
    if (navigation.state === 'loading') {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return null;
};