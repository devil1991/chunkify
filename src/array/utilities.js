import _ from 'underscore'

export default {
  ok_usage(array, fn, usage) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${usage} - bad array`)
    } else if (!_.isFunction(fn)) {
      throw new TypeError(`${usage} - bad fn`)
    }
  }
}
