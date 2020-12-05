import AsyncField from './async-field';
import AsyncActionType from './action-types/async-action-type';

const map = new WeakMap();
let index = 0;

export function asyncTypeKey(field, prefix = 'type-key') {
  if (!field instanceof AsyncField)
    throw new TypeError(`Object is not instance of AsyncField: ${field}`);

  let type = map.get(field);
  if (!type) {
    const key = `${prefix}_hash${index++}`;
    type = new AsyncActionType(key);
    map.set(field, type);
  }
  return type;
}
