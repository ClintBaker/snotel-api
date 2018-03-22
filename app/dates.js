function getEndDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var endDate = yyyy+'-'+mm+'-'+dd;
  return endDate
}

function getBeginDate() {
  var today = new Date();
  today.setDate(today.getDate() - 3);
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var beginDate = yyyy+'-'+mm+'-'+dd;
  return beginDate
}

module.exports = { getEndDate, getBeginDate };
