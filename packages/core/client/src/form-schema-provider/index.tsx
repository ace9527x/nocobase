/*
 * @Author: 肖兴(xiaox) 349560971@qq.com
 * @Date: 2024-07-25 10:36:05
 * @LastEditors: 肖兴(xiaox) 349560971@qq.com
 * @LastEditTime: 2024-07-25 11:08:17
 * @FilePath: \my-nocobase-app\packages\core\client\src\form-schema-provider\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { createContext, useContext, useRef, useState } from "react";
import { Schema } from "@formily/json-schema";

type FormSchema = {
  schema: Schema;
  refresh: () => void;
};

interface IFormSchemaComponentContext {
  schemaList: Record<string, FormSchema>;
  set: (key: string, val: FormSchema) => void;
  get: (key: string) => FormSchema;
  clear: () => void;
}

const FormSchemaComponentContext = createContext<IFormSchemaComponentContext>({
  schemaList: {},
  set: () => { },
  // @ts-ignore
  get: () => { },
  clear: () => { }
});

export const useFormSchemaComponentContext = () => {
  return useContext(FormSchemaComponentContext);
};

export const FormSchemaComponentProvider = (props) => {
  const schemaList = useRef({});

  const clear = () => {
    schemaList.current = {};
  }

  const setSchemaList = (key, val) => {
    schemaList.current[key] = val;
  }

  const getSchemaUid = (key) => {
    if (!key) return schemaList.current;

    return schemaList.current[key];
  }

  console.log(schemaList);

  return (
    <FormSchemaComponentContext.Provider value={{
      schemaList: schemaList.current,
      set: setSchemaList,
      get: getSchemaUid,
      clear: clear
    }}>
      {props.children}
    </FormSchemaComponentContext.Provider>
  )
};
