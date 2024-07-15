import { ReactFC } from '@formily/react';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { findByUid, findMenuItem, SchemaComponent, useACLRoleContext, useDocumentTitle, useRequest } from '../../../';
import { useAppSpin } from '../../../application/hooks/useAppSpin';
import { useAdminSchemaUid } from '../../../hooks';
import { useLayoutContext } from '../../../layout-provider';
import { PinnedPluginList } from '../../../plugin-manager/PinnedPluginListProvider';
import { useMenuTranslation } from '../../../schema-component/antd/menu/locale';
import { CurrentUser } from '../../../user';
import { Help } from '../../../user/Help';

export type IWrapperLayoutProps = {
  schema: any;
  toolsBtn: {
    [s: string]: () => React.JSX.Element | React.MemoExoticComponent<ReactFC<unknown>>;
  };
  sideMenuRef: React.MutableRefObject<any>;
  defaultSelectedUid: any;
  onSelect: (item) => void;
  layoutContentRef: React.MutableRefObject<any>;
  title?: string | Element;
};

const toolsBtn = {
  Pinned: PinnedPluginList,
  Help: Help,
  CurrentUser: CurrentUser,
};

const filterByACL = (schema, options) => {
  const { allowAll, allowMenuItemIds = [] } = options;
  if (allowAll) {
    return schema;
  }
  const filterSchema = (s) => {
    if (!s) {
      return;
    }
    for (const key in s.properties) {
      if (Object.prototype.hasOwnProperty.call(s.properties, key)) {
        const element = s.properties[key];
        if (element['x-uid'] && !allowMenuItemIds.includes(element['x-uid'])) {
          delete s.properties[key];
        }
        if (element['x-uid']) {
          filterSchema(element);
        }
      }
    }
  };
  filterSchema(schema);
  return schema;
};

export default function WrapperLayout(props) {
  const { render } = useAppSpin();
  const { t } = useMenuTranslation();
  const [current, setCurrent] = useState(null);
  const layoutContext = useLayoutContext();

  const { setTitle: _setTitle } = useDocumentTitle();
  const setTitle = useCallback((title) => _setTitle(t(title)), []);
  const navigate = useNavigate();
  const params = useParams<any>();
  const location = useLocation();
  const isMatchAdmin = useMatch('/admin');
  const isMatchAdminName = useMatch('/admin/:name');
  const defaultSelectedUid = params.name;
  const isDynamicPage = !!defaultSelectedUid;
  const ctx = useACLRoleContext();

  const adminSchemaUid = useAdminSchemaUid();

  const onSelect = ({ item }) => {
    const schema = item.props.schema;
    setTitle(schema.title);
    setCurrent(schema);
    navigate(`/admin/${schema['x-uid']}`, {
      state: {
        name: schema['x-uid'],
      },
    });
  };

  const { data, loading } = useRequest<{
    data: any;
  }>(
    {
      url: `/uiSchemas:getJsonSchema/${adminSchemaUid}`,
    },
    {
      refreshDeps: [adminSchemaUid],
      onSuccess(data) {
        const schema = filterByACL(data?.data, ctx);
        // url 为 `/admin` 的情况
        if (isMatchAdmin) {
          const s = findMenuItem(schema);
          if (s) {
            navigate(`/admin/${s['x-uid']}`);
            setTitle(s.title);
          } else {
            navigate(`/admin/`);
          }
          return;
        }

        // url 不为 `/admin/xxx` 的情况，不做处理
        if (!isMatchAdminName || !isDynamicPage) return;

        // url 为 `admin/xxx` 的情况
        const s = findByUid(schema, defaultSelectedUid);
        if (s) {
          setTitle(s.title);
        } else {
          const s = findMenuItem(schema);
          if (s) {
            navigate(`/admin/${s['x-uid']}`);
            setTitle(s.title);
          } else {
            navigate(`/admin/`);
          }
        }
      },
    },
  );

  const SchemaIdContext = createContext(null);
  SchemaIdContext.displayName = 'SchemaIdContext';

  const sideMenuRef = useRef(null);

  useEffect(() => {
    const properties = Object.values(current?.root?.properties || {}).shift()?.['properties'] || data?.data?.properties;

    if (sideMenuRef.current) {
      const pageType =
        properties &&
        Object.values(properties).find((item) => item['x-uid'] === params.name && item['x-component'] === 'Menu.Item');
      const isSettingPage = location?.pathname.includes('/settings');
      if (pageType || isSettingPage) {
        sideMenuRef.current.style.display = 'none';
      } else {
        sideMenuRef.current.style.display = 'block';
      }
    }
  }, [data?.data, params.name, sideMenuRef]);

  if (loading) {
    return render();
  }

  const componentProps: IWrapperLayoutProps = {
    onSelect,
    sideMenuRef,
    defaultSelectedUid,
    toolsBtn,
    ...props,
  };

  return (
    <>
      <SchemaIdContext.Provider value={defaultSelectedUid}>
        <SchemaComponent
          distributed
          memoized
          schema={{
            type: 'void',
            name: 'layout',
            'x-component': layoutContext.layout || 'LayoutTheme',
            'x-component-props': componentProps,
          }}
        />
      </SchemaIdContext.Provider>
    </>
  );
}
