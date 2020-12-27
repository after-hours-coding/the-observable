
// collection is an object with getValues
const collection = {
  getValues: function (callbackFn) {
    const items = [1,2,3,4,5,6];
    for(let item of items) {
      callbackFn(item);
    }
  },
  manipulate: function (manipulateFn) {
    return manipulateFn(this)
  }
}

function map(mapFn) {
  return function (inputCollection) {
    return {
      getValues: function (callbackFn) {
        inputCollection.getValues( value => callbackFn(mapFn(value)) )
      },
      manipulate: function (manipulateFn) {
        return manipulateFn(this)
      }
    }
  }
}
function filter(filterFn) {
  return function (inputCollection) {
    return {
      getValues: function (callbackFn) {
        inputCollection.getValues( value => filterFn(value) && callbackFn(value))
      },
      manipulate: function (manipulateFn) {
        return manipulateFn(this)
      }
    }
  }
}

collection
    .manipulate(map( v => v * 10 ))
    .manipulate(filter( v => v === 20))
    .getValues( v => console.log(v))
