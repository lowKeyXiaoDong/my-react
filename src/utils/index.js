// 对象转换
export function obj2String(obj, arr = [], index = 0) {
  for (let item in obj) {
    arr[index++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}