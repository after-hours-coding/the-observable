// collection is an object with getValues that wrap
// different types of callbacks in JS
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
  return createCollection(function (callbacks) {
    for(let item of array) {
      callbacks.onData(item);
    }
    callbacks.onDone()
  })
}

// create collection from DOM events
function fromEvent(DOMElement, eventName) {
  return createCollection(function(callbacks) {
    DOMElement.addEventListener(eventName, callbacks.onData)
  })
}

// create collection from promise
function fromPromise(promise) {
  return createCollection(function (callbacks){
    promise
        .then(callbacks.onData, callbacks.onError)
        .finally(callbacks.onDone)
  })
}


// manipulate functions
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

/*
   RUN TIME!
 */

const numbers = fromArray([1,2,3,4,5]);

// const button = document.createElement('button');
// const clicks = fromEvent(button, 'click')
// const posts = fromPromise(fetch('api//'));

const callbacks = {
  onData: function (value) {
    console.log(value);
  },
  onError: function(error) {
    console.log(error);
  },
  onDone: function () {
    console.log("done");
  }
}


numbers
    .manipulate(map(v => v * 10))
    .getValues(callbacks)

// button.click();

