import chunkify from '../../dist'
import angular from 'angular'
import _ from 'underscore'
import $ from 'jquery'


angular
.module('chunkify-demo', [])
.controller('ChunkifyCtrl', function($scope) {

  this.dataset = _.range(10e5);

  $scope.buttons = {
    disabled: false,

    disable: function() {
      this.disabled = true;
    },

    enable: function() {
      this.disabled = false;
    }
  };

  $scope.actions = {

    names: ['map', 'reduce', 'each', 'loop'],

    _clean_options(options) {
      _.defaults(options, {chunkify: false});
      console.log(`Found options.chunkify: ${options.chunkify}`)
    },

    _before_action(options = {}) {
      this._clean_options(options);
      $scope.buttons.disable()
    },

    _after_action(promise) {
      promise.then(() => {
        $scope.buttons.enable();
        $scope.$digest();
      });
    },

    _reduce(options) {
      console.log('chunk reduce');
      return new Promise(resolve => setTimeout(resolve, 3000));
    },

    _map(options) {
      console.log('chunk map');
      return new Promise(resolve => setTimeout(resolve, 3000));
    },

    _each(options) {
      console.log('chunk each');
      return new Promise(resolve => setTimeout(resolve, 3000));
    },

    _loop(options) {
      console.log('chunk loop');
      return new Promise(resolve => setTimeout(resolve, 5000));
    }

  };


  // some metaprogramming to avoid boilerplate
  for (let method of $scope.actions.names) {
    $scope.actions[method] = _.compose(promise => {
      $scope.actions._after_action(promise);
    }, options => {
      return $scope.actions[`_${method}`](options)
    }, options => {
      $scope.actions._before_action(options);
      return options
    });
  }

})
.directive('animation', function($interval, $window) {
  return {
    replace: true,
    link: function(scope, element) {
      const fadetime = 'slow';
      const cssprops = {
        'background-color': '#34495e',
        'border-radius': '6px',
        'margin': '50px auto'
      };
      let $element = $(element);
      $element.css(cssprops);
      $element.css('width', $($window).width() - 300);
      $element.css('height', $($window).height() - 300);
      var fade = fadeIn => {
        let complete = () => {
          fade(!fadeIn);
        };
        if (fadeIn) {
          $element.fadeIn(fadetime, complete);
        } else {
          $element.fadeOut(fadetime, complete);
        }
      };
      fade(false);
    },
    template: '<div class="animation"></div>'
  }
});

