angular
  .module('pstakecare')
  .controller('HospitalController', function($scope, TimingFactory) {

    $scope.timings;
    //function to convert time from 24 hour format to 12 hour format
    function fomartTimeShow(time1) {
        var time=time1.toString();
        //handles the time with length 3 ( 930,615)
        if(time.length ==3) {
          //appends 0 to convert time to 4 digit format
          var hours = 0+time[0];
          var min = time[1] + time[2];
        } else {
          var hours = time[0]+time[1];
          var min = time[2] + time[3];
        }
        if (hours < 12) {
            return hours + ':' + min + ' AM';
        } else {
            hours=hours - 12;
            hours=(hours.length < 10) ? '0'+hours:hours;
            return hours+ ':' + min + ' PM';
        }
    }
    
    //Service to get timings per hospital
    TimingFactory.getTimings().success(function(data) {
      
        var timings = data.timing;
        var days = ['sun','mon','tue','wed','thu','fri','sat'];
        var Fulldays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var hospitalTimings=[{}];
        var timingObj;
        //loop for hospitals
        for (var t in timings) {
          
          timingObj =  timings[t];
          hospitalTimings[t] = {};
          //loop for days of week
          for(var i=0;i<days.length;i++) {
            
            var day=days[i];
            var fday=Fulldays[i];
            var dayTiming = timingObj[day];
            //handles the case when the hospital remains closed
            if((dayTiming.length) == 0) {
              
              if(typeof(hospitalTimings[t].except) === "undefined") {
               hospitalTimings[t].except = fday;    
              } else {
                hospitalTimings[t].except = hospitalTimings[t].except +", "+fday;  
              }
            } else {
              //handles the slots when the hospital is opened
                if(typeof(hospitalTimings[t].slot) === "undefined") {
                  for (var k = 0; k < dayTiming.length; k++) { 
                    if(typeof(hospitalTimings[t].slot) === "undefined") {
                      //hospital opened 24x7
                      if(dayTiming[k]['from'] == 0 && dayTiming[k]['to'] == 2359) {
                        hospitalTimings[t].slot = "24x7";
                      } else {
                        hospitalTimings[t].slot = fomartTimeShow(dayTiming[k]['from']) + " to " +fomartTimeShow(dayTiming[k]['to']);
                      }
                   } else {
                     hospitalTimings[t].slot = hospitalTimings[t].slot + ","+ fomartTimeShow(dayTiming[k]['from'])+ " to " +fomartTimeShow(dayTiming[k]['to']);
                   }
                  }//for
                } else {
                  // assumes same timing for all days
                  continue;
                }
              }
            }
          }//hospital loop
          //binds timings to model
        $scope.timings=hospitalTimings;
      }).error(function(error) {
        console.log(error)
      });
      
  });