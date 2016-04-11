let arrRemove = (arr, item) => {
  while (arr.includes(item)) {
    let index = arr.indexOf(item);
    arr = arr.splice(index, 1);
  }
  return arr;
};

let whatIs = (item=null) => {
  let def = 'Null';

  if(item == null) { return def; }

  let stringify = item.constructor.toString();

  return stringify == Array.toString()    ? 'Array'   :
         stringify == String.toString()   ? 'String'  :
         stringify == Number.toString()   ? 'Number'  :
         stringify == Object.toString()   ? 'Object'  :
         stringify == Function.toString() ? 'Function':
         def;
};

let toArray = (item) => {
  let constructor = whatIs(item);
  return constructor == 'Array' ? item :
         constructor == 'Number' || constructor == 'String'? [item] :
         null;
};

let randomRange = (min=0, max=101) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export { arrRemove, toArray, randomRange, whatIs };
