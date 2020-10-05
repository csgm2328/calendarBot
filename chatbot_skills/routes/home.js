const config = require('config')
const routerName = config.get('proxy') + '/'

module.exports = apiRouter => {
    apiRouter.post(routerName, function (req, res) {
    const params = req.body.action['params'] || {}
    const people = params['st_name'] || ''
  
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: people + '님과의 일정을 잡아드려요!\n날짜, 시간 어떤 것부터 정해볼까요?'
            }
          },
          {
            "carousel": {
              "type": "basicCard",
              "items": [
                {
                  "title": "",
                  "description": "",
                  "thumbnail": {
                    "imageUrl": "http://localhost/image/date.jpg"
                  },
                  "buttons": [
                    {
                      "action": "message",
                      "label": "이번주(" + getWeek(curr, 1).date + "~" + getWeek(curr, 5).date + "일)",
                      "messageText": "이번주(" + getWeek(curr, 1).date + "~" + getWeek(curr, 5).date + "일)"
                    },
                    {
                      "action": "message",
                      "label": "다음주(" + getWeek(next_curr, 1).date + "~" + getWeek(next_curr, 5).date + "일)",
                      "messageText": "다음주(" + getWeek(next_curr, 1).date + "~" + getWeek(next_curr, 5).date + "일)"
                    },
                    {
                      "action": "message",
                      "label": "다다음주(" + getWeek(next2_curr, 1).date + "~" + getWeek(next2_curr, 5).date + "일)",
                      "messageText": "다다음주(" + getWeek(next2_curr, 1).date + "~" + getWeek(next2_curr, 5).date + "일)"
                    },
  
                  ]
                },
                {
                  "title": "",
                  "description": "",
                  "thumbnail": {
                    "imageUrl": "http://localhost/image/time.jpg"
                  },
                  "buttons": [
                    {
                      "action": "message",
                      "label": "오전(9시~12시)",
                      "messageText": "오전(9시~12시)"
                    },
                    {
                      "action": "message",
                      "label": "오후(13시~17시)",
                      "messageText": "오후(13시~17시)"
                    },
                    {
                      "action": "message",
                      "label": "저녁(18시~21시)",
                      "messageText": "저녁(18시~21시)"
                    },
                  ]
                }
              ]
            }
          }
        ],
        quickReplies: [
          {
            "action": "message",
            "label": "홈으로",
            "messageText": "홈으로"
          }
        ]
      }
    }
    console.log(req.body)
    //console.log(req.body.userRequest.user.properties)
    res.status(200).send(responseBody)
  })
}