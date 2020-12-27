
// collection is an object with getValues
const collection = {
  getValues: function (callbackFn) {
    const items = [1,2,3,4,5,6];
    for(let item of items) {
      callbackFn(item);
    }
  },
  map: function (mapFn) {
    const self = this;
    return {
      getValue: function (callbackFn) {
        self.getValues( value => {
          const mappedValue = mapFn(value);
          callbackFn(mappedValue);
        })
      }
    }
  }
}

collection
    .map( v => v * 10 )
    .getValue( v => console.log(v))
