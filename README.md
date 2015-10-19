# pstakecare
Pstakecare assignment

Problem Statement-

PSTakeCare has a huge dataset of hospitals. Each hospital can have its own "open timing". Open timings can be one of these
24*7
24*7 except weekends
24*7 except Sunday or a particular day
Two or more slots per day (e.g. [9:30 AM to 12:30 PM] and [2:00 PM to 6:00 PM])
Two or more slots per day except weekends or some days
Write a function which takes timings as json and gives output as string.

Sample input1:
"timing":{"sun":[],"mon":[{"from":1030,"to":1400},{"from":1830,"to":2300}],"tue":[{"from":1030,"to":1400},{"from":1830,"to":2300}],"wed":[{"from":1030,"to":1400},{"from":1830,"to":2300}],"thu":[{"from":1030,"to":1400},{"from":1830,"to":2300}],"fri":[{"from":1030,"to":1400},{"from":1830,"to":2300}],"sat":[]}

Sample output1:
"10:30 AM to 2:00 PM, 6:30 PM to 11:00 PM except Sunday and Saturday"

Sample input2:
"timing":{"sun":[{"from":0,"to":2359}],"mon":[{"from":0,"to":2359}],"tue":[{"from":0,"to":2359}],"wed":[{"from":0,"to":2359}],"thu":[{"from":0,"to":2359}],"fri":[{"from":0,"to":2359}],"sat":[{"from":0,"to":2359}]}

Sample output2:
"24X7"

#Assumptions
1) Same timing per day
2) Input timing is in 24 hours format