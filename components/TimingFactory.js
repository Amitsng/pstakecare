angular
  .module('pstakecare')
  .factory('TimingFactory', function($http) {

    // Method that returns the cribs data
    function getTimings() {
      // We're now using $http to get the
      // data from a separate file
      return $http.get('/timings.json');
    }

    return {
      getTimings: getTimings
    }

  });