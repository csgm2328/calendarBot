const config = require('config')

function getWeek(curr, i) {
    var d = curr.getDate() - curr.getDay() + i;
    var week = new Date(curr.setDate(d));
    var date = week.getDate() - week.getDay() + i;
    //const this_fri = this_mon + 4;
    var day = week.getDay(); //1:월
    var month = week.getMonth() + 1; // 0 ~ 11
    switch (i) {
      case 1: day = '월'; break;
      case 2: day = '화'; break;
      case 3: day = '수'; break;
      case 4: day = '목'; break;
      case 5: day = '금'; break;
    }
    return {
      month: month,
      date: date,
      day: day
    };
  }
  //주 curr 정해주는 함수
  function getCurr(weekval) {
    var curr_in = curr;
    switch (weekval) {
      case '이번주': curr_in = curr; break;
      case '다음주': curr_in = next_curr; break;
      case '다다음주': curr_in = next2_curr; break;
    }
    return { curr_in: curr_in }
  }
  //요일 day 정해주는 함수
  function getDday(dayval) {
    var day_in = 1;
    switch (dayval) {
      case 'Monday': day_in = 1; break;
      case 'Tuesday': day_in = 2; break;
      case 'Wednesday': day_in = 3; break;
      case 'Thursday': day_in = 4; break;
      case 'Friday': day_in = 5; break;3
    }
    return { day_in: day_in };
  }
  
  var curr = new Date();// this_week
  var next_curr = new Date(curr.getTime() + (7 * 24 * 60 * 60 * 1000));
  var next2_curr = new Date(curr.getTime() + (14 * 24 * 60 * 60 * 1000));
  var timeflag = 0; //시간선택했는지
  const min30 = 30*60*1000; //30분



const routerName = config.get('proxy') + '/time_date'

module.exports = apiRouter => {
    apiRouter.post(routerName, function (req, res) {
        var weekval = req.body.action.params['time_date'] || '';
        var timeset = '시간을';
        var dayval = 'Monday';
      
        if (req.body.action.params['time_date'] && timeset == '시간을') {
          timeflag = 0; // 날짜선택
        }
      
        else if (weekval == '' && req.body.action.params['timeset']) { //시간선택
          //시간대 선택했을때 다음주 월요일로 default 값 설정해주기 
          //timeset = req.body.action.params['timeset'] + " 시간대를"; 
          timeset = req.body.action.params['timeset'] + " 시간대를";
          weekval = '다음주';
          req.body.action.params['time_date'] = weekval;
          dayval = 'Monday';
          timeflag = 1; //시간 선택
        }
      
        else if (weekval == '' && timeset == '시간을') { //바로가기버튼 왜 조건문이 제대로 동작안함?
          if (timeflag == 1) { //시간선택 & 바로가기버튼
            timeset = req.body.contexts[0].params.timeset.value + ' 시간대를';//컨텍스트 값 없음
            weekval = '다음주';
          }
          else {//공통 날짜선택 & 바로가기 버튼
            weekval = req.body.contexts[0].params.time_date.resolvedValue; //컨텍스트에 남아있는 정보로 대입
          }
          var json = req.body.action.detailParams.sys_date.value; //string 값인 detailParams.sys_date 파싱해서 요일 대입
          obj = JSON.parse(json);
          dayval = obj.dateTag || '';
        }
      
        const responseBody = {
          version: "2.0",
          template: {
            outputs: [
              {
                simpleText: {
                  text: weekval + ' ' + getWeek(getCurr(weekval).curr_in, getDday(dayval).day_in).month + "월 " + getWeek(getCurr(weekval).curr_in, getDday(dayval).day_in).date +
                    "일(" + getWeek(getCurr(weekval).curr_in, getDday(dayval).day_in).day + ")에 예약 가능한 " + timeset + " 알려드릴게요!\n다른날짜는 아래 버튼을 눌러주세요."
                }
              },
            ],
            "quickReplies": [
              {
                "action": "block",
                "label": getWeek(getCurr(weekval).curr_in, 1).month + '월' + getWeek(getCurr(weekval).curr_in, 1).date + '일(' + getWeek(getCurr(weekval).curr_in, 1).day + ')',
                "messageText": getWeek(getCurr(weekval).curr_in, 1).month + '월' + getWeek(getCurr(weekval).curr_in, 1).date + '일(' + getWeek(getCurr(weekval).curr_in, 1).day + ')',
                "data": {
                  "blockId": "5dcfc6308192ac000119ded8",
                  "extra": {
                    "": ""
                  }
                }
              },
              {
                "action": "block",
                "label": getWeek(getCurr(weekval).curr_in, 2).month + '월' + getWeek(getCurr(weekval).curr_in, 2).date + '일(' + getWeek(getCurr(weekval).curr_in, 2).day + ')',
                "messageText": getWeek(getCurr(weekval).curr_in, 2).month + '월' + getWeek(getCurr(weekval).curr_in, 2).date + '일(' + getWeek(getCurr(weekval).curr_in, 2).day + ')',
                "data": {
                  "blockId": "5dcfc6308192ac000119ded8",
                  "extra": {
                    "": ""
                  }
                }
              },
              {
                "action": "block",
                "label": getWeek(getCurr(weekval).curr_in, 3).month + '월' + getWeek(getCurr(weekval).curr_in, 3).date + '일(' + getWeek(curr, 3).day + ')',
                "messageText": getWeek(getCurr(weekval).curr_in, 3).month + '월' + getWeek(getCurr(weekval).curr_in, 3).date + '일(' + getWeek(curr, 3).day + ')',
                "data": {
                  "blockId": "5dcfc6308192ac000119ded8",
                  "extra": {
                    "": ""
                  }
                }
              },
              {
                "action": "block",
                "label": getWeek(getCurr(weekval).curr_in, 4).month + '월' + getWeek(getCurr(weekval).curr_in, 4).date + '일(' + getWeek(curr, 4).day + ')',
                "messageText": getWeek(getCurr(weekval).curr_in, 4).month + '월' + getWeek(getCurr(weekval).curr_in, 4).date + '일(' + getWeek(curr, 4).day + ')',
                "data": {
                  "messageText": "5dcfc6308192ac000119ded8",
                  "extra": {
                    "": ""
                  }
                }
              },
              {
                "action": "block",
                "label": getWeek(getCurr(weekval).curr_in, 5).month + '월' + getWeek(getCurr(weekval).curr_in, 5).date + '일(' + getWeek(curr, 5).day + ')',
                "messageText": getWeek(getCurr(weekval).curr_in, 5).month + '월' + getWeek(getCurr(weekval).curr_in, 5).date + '일(' + getWeek(curr, 5).day + ')',
                "data": {
                  "blockId": "5dcfc6308192ac000119ded8",
                  "extra": {
                    "": ""
                  }
                }
              }
            ]
          }
        };
        console.log(req.body);
        //console.log(req.body.action.params['timeset']);
        console.log(req.body.contexts[0].params);
        res.status(200).send(responseBody);
      });
    };