angular
  .module('pstakecare')
  .factory('TimingFactory', function($http) {

    // Method that returns the timing data
    function getTimings() {
      return $http.get('/timings.json');
    }

    return {
      getTimings: getTimings
    }

  });