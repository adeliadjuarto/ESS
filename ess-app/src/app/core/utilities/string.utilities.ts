
export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export function  dateDisplay(date: string) {
  let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  if (new Date(date).toString() === 'Invalid Date') {
    return date;
  }
  return new Date(date).toLocaleDateString('id-ID', dateOptions);
}
