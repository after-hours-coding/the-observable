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
function fromEvent(DOMElement, eventName) {
  return createCollection(function(callback) {
    DOMElement.addEventListener(eventName, callback)
  })
}
function fromPromise(promise) {
  return createCollection(function (callback){
    promise.then(callback)
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

// const button = document.createElement('button');
// const clicks = fromEvent(button, 'click')
const posts = fromPromise(fetch('api//'));

posts
    .manipulate(map(r => r.json()))
    .getValues( v => console.log(v))

// button.click();

