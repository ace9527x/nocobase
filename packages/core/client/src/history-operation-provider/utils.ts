/*
 * @Author: 肖兴(xiaox) 349560971@qq.com
 * @Date: 2024-07-24 15:04:09
 * @LastEditors: 肖兴(xiaox) 349560971@qq.com
 * @LastEditTime: 2024-07-25 09:32:26
 * @FilePath: \my-nocobase-app\packages\core\client\src\history-operation-provider\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ISchema } from '@formily/json-schema';
import _ from 'lodash';

export async function findSchemaPathByXUidAsync(
  schema: ISchema,
  xuid: string,
  depth = 0,
  maxDepth = 100,
  cacheParent: ISchema[] = [schema],
): Promise<ISchema[] | null> {
  // 基础情况检查
  if (!xuid || typeof schema !== 'object' || schema === null) return null;

  // 直接匹配
  if (schema['x-uid'] === xuid) return cacheParent;

  if (!schema.properties) return null;

  if (depth >= maxDepth) {
    // 当达到最大深度时，使用setTimeout异步执行剩余的递归调用
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(findSchemaPathByXUidAsync(schema.properties, xuid, depth + 1, maxDepth, cacheParent)),
        0,
      );
    });
  }

  // 遍历schema的键
  const keys = Object.keys(schema.properties);
  for (let key of keys) {
    const value = schema.properties[key];
    if (typeof value === 'object' && value !== null) {
      const result = await findSchemaPathByXUidAsync(value, xuid, depth + 1, maxDepth, [...cacheParent, value]);
      if (result) return result;
    }
  }

  return null;
}

export function findSchemaByXUid(
  schema: ISchema,
  xuid: string,
  name?: string,
  depth = 0,
  maxDepth = 100,
): [string, ISchema] | null {
  // 限制递归深度以避免栈溢出
  if (depth > maxDepth) {
    console.warn('findSchemaByXUid reached maximum depth without finding a match.');
    return null;
  }

  // 检查基础情况
  if (!xuid || typeof schema !== 'object' || schema === null) return null;

  // 直接匹配
  if (schema['x-uid'] === xuid) return [name, schema];

  // 递归搜索嵌套schema
  const keys = Object.keys(schema);
  for (let key of keys) {
    const value = schema[key];
    if (typeof value === 'object' && value !== null) {
      const result = findSchemaByXUid(value, xuid, key, depth + 1, maxDepth);
      if (result) return result;
    }
  }

  return null;
}

export function sortXIndex(schema: ISchema) {
  return Object.keys(schema.properties)
    .map((key) => schema.properties[key])
    .sort((a, b) => a['x-index'] - b['x-index']);
}

// 移动 schema 节点
export async function moveSchema(dragSchema: ISchema, targetSchema: ISchema, dropPosition: number, root: ISchema) {
  const dragUid = dragSchema['x-uid'];

  const schema = await findSchemaPathByXUidAsync(root, dragUid);

  const targetUid = targetSchema['x-uid'];
  const target = await findSchemaPathByXUidAsync(root, targetUid);

  if (schema && target) {
    const drag = schema[schema.length - 1];
    const dragParent = schema[schema.length - 2];
    const tarParent = target[target.length - 2] || target[target.length - 1];
    const [sKey, sSchema] = findSchemaByXUid(dragParent, drag['x-uid']);

    if (dragParent === tarParent) {
      // 同一层级排序 x-index
      const indexMap = sortXIndex(tarParent)
        .map((item) => item['x-uid'])
        .filter((item) => item !== drag['x-uid']);

      // 重新排序
      Object.keys(tarParent.properties).forEach((item) => {
        if (item === sKey) {
          tarParent.properties[item]['x-index'] = dropPosition;
        } else {
          const i = indexMap.indexOf(tarParent.properties[item]['x-uid']) + 1;
          tarParent.properties[item]['x-index'] = i >= dropPosition ? i + 1 : i;
        }
      });
    } else {
      const copy = _.cloneDeep(sSchema);
      copy['x-index'] = dropPosition;

      delete dragParent?.properties[sKey];

      // 重新排序
      Object.keys(tarParent.properties).forEach((item) => {
        const i = tarParent.properties[item]['x-index'];
        tarParent.properties[item]['x-index'] = i >= dropPosition ? i + 1 : i;
      });

      tarParent.properties[sKey] = copy;
    }
  }

  return root;
}
