// collection is an object with getValues that wrap
// different types of callbacks in JS
function createObservable(subscribe) {
  return {
    subscribe,
    pipe: function (operator) {
      return operator(this)
    }
  }
}

// create collection from array
function fromArray(array) {
  return createObservable(function (observer) {
    for(let item of array) {
      observer.next(item);
    }
    observer.complete()
  })
}

// create collection from DOM events
function fromEvent(DOMElement, eventName) {
  return createObservable(function(observer) {
    DOMElement.addEventListener(eventName, observer.next)
  })
}

// create collection from promise
function fromPromise(promise) {
  return createObservable(function (observer){
    promise
        .then(observer.next, observer.onError)
        .finally(observer.onDone)
  })
}


// manipulate functions
function map(mapFn) {
  return function (inputCollection) {
    return createObservable(function (observer) {
      inputCollection.subscribe({
        next: function (value) {
          observer.next(mapFn(value))
        },
        complete: observer.complete
      })
    })
  }
}
function filter(filterFn) {
  return function (inputCollection) {
    return createObservable(function(observer){
      inputCollection.getValues({
        next: function (value) {
          filterFn(value) && observer.next(value)
        }
      })
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

// object with callbacks to observe state changes
const observer = {
  next: function (value) {
    console.log(value);
  },
  error: function(error) {
    console.log(error);
  },
  complete: function () {
    console.log("done");
  }
}

numbers
    .pipe(map(v => v * 10))
    .subscribe(observer)

// button.click();

