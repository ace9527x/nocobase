import { ISchema } from '@formily/json-schema';
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import UndoManager from 'undo-manager';

interface HistoryInterface {
  history: ISchema[];
  currentSchema: ISchema;
  length: number;
  hasRedo: boolean;
  hasUndo: boolean;
  push: (operation) => void;
  forward: () => void;
  back: () => void;
  clear: () => void;
}

const HistoryContext = createContext<HistoryInterface>({
  history: [],
  length: 0,
  currentSchema: {},
  hasRedo: false,
  hasUndo: false,
  push: () => {},
  forward: () => {},
  back: () => {},
  clear: () => {},
});

const undoManager = new UndoManager();

export const useHistoryContext = () => {
  return useContext(HistoryContext);
};

export const HistoryProvider = (props) => {
  const historyList = useRef([]);

  const [current, setCurrent] = React.useState(-1);

  const hasRedo = useMemo(() => {
    return undoManager.hasRedo();
  }, [current]);

  const hasUndo = useMemo(() => {
    return historyList.current.length > 1;
  }, [current]);

  const length = useMemo(() => {
    return historyList.current.length;
  }, [current]);

  const push = (operation) => {
    historyList.current.push(operation);
    setCurrent(Math.random());

    undoManager.add({
      redo: () => {
        historyList.current.push(operation);
        setCurrent(Math.random());
      },
      undo: () => {
        historyList.current.pop();
        setCurrent(Math.random());
      },
    });
  };

  const forward = () => {
    undoManager.redo();
  };

  const back = () => {
    if (historyList.current.length > 1) {
      undoManager.undo();
    }
  };

  const clear = () => {
    undoManager.clear();
    historyList.current = [historyList.current.pop()];
    setCurrent(Math.random());
  };

  const currentSchema = useMemo(() => {
    return historyList?.current?.[historyList?.current.length - 1] || {};
  }, [current]);

  const historyBack = (e) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      e.stopPropagation();
      back();
    }
  };

  const historySave = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      e.stopPropagation();

      console.log(historyList?.current?.[historyList?.current.length - 1]);
    }
  };

  const historyGo = (e) => {
    if (e.ctrlKey && e.key === 'y') {
      e.preventDefault();
      e.stopPropagation();
      forward();
    }
  };

  useEffect(() => {
    // ctrl + z 撤回
    window.addEventListener('keydown', historyBack);

    // ctrl + s 保存
    window.addEventListener('keydown', historySave);

    // ctrl + y 前进
    window.addEventListener('keydown', historyGo);

    return () => {
      window.removeEventListener('keydown', historyBack);
      window.removeEventListener('keydown', historySave);
      window.removeEventListener('keydown', historyGo);
    };
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history: historyList.current,
        currentSchema,
        length,
        hasRedo,
        hasUndo,
        push,
        forward,
        back,
        clear,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};
