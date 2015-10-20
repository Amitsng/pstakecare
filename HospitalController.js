angular
  .module('pstakecare')
  .controller('HospitalController', function($scope, TimingFactory) {
    $scope.timings;
    
    /** function to convert time from 24 hour format to 12 hour format
     * 
     * @param time24Format time in 24 hpur format
     * @return time in 12 hour format
     * 
     * 
     * */
    
    function convert24hourTimeFormatTo12hour(time24Format){
      
      var time = time24Format.toString();
      
      //handles the time with length 3 ( 930,615)
      
      if (time.length == 3) {
        
        //prepends 0 to convert time to 4 digit format
        
        var hours = 0 + time[0];
        var min = time[1] + time[2];
      }
      else {
        var hours = time[0] + time[1];
        var min = time[2] + time[3];
      }
      if (hours < 12) {
        return hours + ':' + min + ' AM';
      }
      else {
        hours = hours - 12;
        hours = (hours.length < 10) ? '0' + hours : hours;
        return hours + ':' + min + ' PM';
      }
  
      }
    
     /** function getSlot gets the slot of hospital
     * 
     * @param fromTime start time, toTime end time
     * @return slot 
     * 
     * 
     * */
    
    function getSlot(fromTime,toTime) {
      
      var slot;
      if ((fromTime == 0 || fromTime == 00 || fromTime == 0000) && toTime == 2359) {
         slot = "24x7";  
      } else {
        var fromTime12hoursformat = convert24hourTimeFormatTo12hour(fromTime);
        var toTime12hoursformat   = convert24hourTimeFormatTo12hour(toTime);
        slot = fromTime12hoursformat + " to " + toTime12hoursformat;  
      }
      return slot;
      
    }
    
    /**
     * getTimings service reads json and get the hospsital slots
     * 
     * */
    TimingFactory.getTimings().success(function(data) {
      
      var timings = data.timing;
      var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      var Fulldays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var hospitalTimings = [{}];
      var timingObj;
      //loop for hospitals
      for (var t in timings) {
        timingObj = timings[t];
        hospitalTimings[t] = {};
        //loop for days of week
        for (var i = 0; i < days.length; i++) {
          var day = days[i];
          var fday = Fulldays[i];
          var dayTiming = timingObj[day];
          //handles the case when the hospital remains closed
          if ((dayTiming.length) == 0) {
            if (typeof(hospitalTimings[t].except) === "undefined") {
              //stores the day when the hospital remains closed
              hospitalTimings[t].except = fday;
            }
            else {
              hospitalTimings[t].except = hospitalTimings[t].except + ", " + fday;

            }
          }
          else {
            //handles the slots when the hospital is opened
            if (typeof(hospitalTimings[t].slot) === "undefined") {
              for (var k = 0; k < dayTiming.length; k++) {
                if (typeof(hospitalTimings[t].slot) === "undefined") {
                    hospitalTimings[t].slot = getSlot(dayTiming[k]['from'],dayTiming[k]['to']);
                }
                else {
                    hospitalTimings[t].slot += getSlot(dayTiming[k]['from'],dayTiming[k]['to']);
                }

              } //for
            }
            else {
              // assumes same timing for all days (to avoid repetition of timing)
              continue;

            }
          }
        }

      } //hospital loop

      //binds timings to model
      $scope.timings = hospitalTimings;

    }).error(function(error) {
      console.log(error)
    });

  });