import ChunkifyOptions from '../options'
import _ from 'underscore'
import {ok_usage} from './utilities'


const USAGE = 'Usage: chunkify.each(Array array, Function fn, [Object options])';

let bounded_each = ({from, to}) => {
  let set_index_bounds = (array) => {
    return _.defaults({index: from, to}, {
      index: 0,
      final: array.length
    });
  };
  return (array, fn, options = {}) => {
    ok_usage(array, fn, USAGE);
    let {chunk, delay, scope} = ChunkifyOptions.of(options);
    let {index, final} = set_index_bounds(array);
    let incomplete = () => {
      return index < final;
    };
    var process_chunk = (resolve, reject) => {
      while (incomplete()) {
        let item = array[index];
        try {
          fn.call(scope, item, index)
        } catch (error) {
          return reject({error, item, index});
        }
        index++;
        if (incomplete() && ((index % chunk) === 0)) {
          return setTimeout(process_chunk.bind(null, resolve, reject), delay);
        }
      }
      resolve();
    } ;
    return new Promise(process_chunk)
  };
};



export default {apply: bounded_each({from: 0}), bounded_each}