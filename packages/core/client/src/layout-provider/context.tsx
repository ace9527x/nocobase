import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRequest } from '..';
import { useAppSpin } from '../application';

export const LOCAL_LAYOUT_KEY = 'layout';

export const LayoutContext = createContext({
  layout: '',
  layoutList: [],
  setLayout: (d) => {},
});

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = (props) => {
  const { children, layout: _layout } = props;
  const { render } = useAppSpin();
  const [layout, setLayout] = useState(_layout || localStorage.getItem('layout'));

  const list = useRef([]);

  const { loading } = useRequest<{
    data: any;
  }>(
    {
      url: '/layout:list',
    },
    {
      onSuccess: (data) => {
        list.current = data.data;
        if (localStorage.getItem(LOCAL_LAYOUT_KEY)) setLayout(layout || list.current[0]['x_component']);
      },
    },
  );

  useEffect(() => {
    if (localStorage.getItem(LOCAL_LAYOUT_KEY) !== layout) localStorage.setItem(LOCAL_LAYOUT_KEY, layout);
  }, [layout]);

  if (loading) return render();

  return (
    <LayoutContext.Provider
      value={{
        layout,
        layoutList: list.current,
        setLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
