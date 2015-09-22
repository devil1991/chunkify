# chunkify

[![Build Status](https://travis-ci.org/yangmillstheory/chunkify.svg?branch=master)](https://travis-ci.org/yangmillstheory/chunkify)

An [ES6-developed](http://babeljs.io/) functional API that prevents long-running scripts from blocking the JavaScript thread.

## Install

    $ npm install --save chunkify
    
## Usage

Import the module:

    import chunkify from 'chunkify'
    
## Options

In API methods, an optional `options` object may provide any subset of the following data:

* `chunk`: the number of items in `array` to successively invoke `fn` on before yielding control of the main thread. 
    * default value is `1`
    * must be positive
    * aliases: `chunksize`
* `delay`: the minimal time in milliseconds to wait before continuing to invoke `fn` on `array`. 
    * default value is `0`
    * must be non-negative
    * aliases: `yield`, `yieldtime`, `delaytime`
* `scope`: the object on which the processing function `fn` is invoked on.  
    * default value is `null`
    * must not be a `Number`, `Boolean`, or `undefined`

## API

### <a name='each'>chunkify.each(Array array, Function fn, [Object options])</a>

`fn` is successively invoked on `array`. At every `chunk`<sup>th</sup> invocation, control is yielded back to the thread. After (at least) `delay` milliseconds, `fn` picks up where it left off. This continues until all items in `array` have been processed by `fn`. 
   
Returns a `Promise` that resolves with `array` when `fn` has been invoked on all items in `array`.

If any invocation of `fn` throws an error, the promise is rejected with an object `{error, item}`, where `error` is the caught `Error`, and `item` is the member of `array` where `fn.call(options.scope, item)` threw. No further processing happens after the failure.
 
### chunkify.map(Array array, Function fn, [Object options])
 
Identical to [chunkify.each](#each), except the returned `Promise` resolves with the `array` mapped by `fn`.

## Future Plans

Expose a [generator-friendly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) API.
 
## Contributing

**Development is in `snake_case` ES6.**

Get the source.

    $ git clone git@github.com:yangmillstheory/chunkify

Install dependencies.
    
    $ npm install
    
Compile sources.

    $ node_modules/.bin/gulp
    
Run tests.

    $ npm test

## License

MIT © 2015, Victor Alvarez