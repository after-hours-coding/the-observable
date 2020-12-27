// collection is an object with getValues
function createCollection(getValues) {
  return {
    getValues,
    manipulate: function (manipulateFn) {
      return manipulateFn(this)
    }
  }
}

// create collection from array
function fromArray(array) {
  return createCollection(function (callback) {
    for(let item of array) {
      callback(item);
    }
  })
}


function map(mapFn) {
  return function (inputCollection) {
    return createCollection(function (callbackFn) {
      inputCollection.getValues( value => callbackFn(mapFn(value)))
    })
  }
}
function filter(filterFn) {
  return function (inputCollection) {
    return createCollection(function(callbackFn){
      inputCollection.getValues( value => filterFn(value) && callbackFn(value))
    })
  }
}


const numbers = fromArray([1,2,3,4,5]);

numbers
    .manipulate(map(v => v *10))
    .manipulate(filter(v => v === 10))
    .getValues( v => console.log(v))
