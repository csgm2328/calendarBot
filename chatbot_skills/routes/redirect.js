const config = require('config')
const fs = require('fs');
const request = require('request');

const user_email = req.body.action.user_email;
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + user_email + '-calendar-nodejs-quickstart.json'

var client_secret = credentials.web.client_secret;
var client_id = credentials.web.client_id;
var redirect_uri = credentials.web.redirect_uris[0];

var tokenStorage = {
    access_token: null,
    token_type: null,
    expires_in: null,
    refresh_token: null
};
let repeat_refresh = null; //setInterval 설정이 저장될 변수 

function storeToken(token, callback) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token)); // 토큰을 만듭니다.
    var oauth2Client = new OAuth2(client_id, client_secret, redirect_uri);
    oauth2Client.credentials = token;
    console.log('Token stored to ' + TOKEN_PATH);
    callback(oauth2Client);
}


function RefreshIABTokenInterval() {
    let url = 'https://www.googleapis.com/oauth2/v4/token';
    let payload = {
        refresh_token: tokenStorage.refresh_token,
        grant_type: 'refresh_token',
        client_id: client_id,
        client_secret: client_secret
    };

    request.post(url, { form: payload }, function (error, response, body) {
        if (error) {
            repeat_refresh = null;
            clearInterval(repeat_refresh);
            return;
        }
        storeToken(body);
    });
}

function listEvents(auth) {
    // 토큰 인증이 완료되면 최종적으로 실행되는 함수 입니다.
    // 아래의 예제는 구글 캘린더에 등록된 이벤트 10개의 정보를 출력합니다.
    var calendar = google.calendar('v3');

    calendar.events.list({
        auth: auth,
        calendarId: user_email, // 이곳에 이벤트를 가져올 캘린더 id를 입력해야 합니다.
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        if (events.length == 0) {
            console.log('No upcoming events found.');
        } else {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }
    });
}

const routerName = config.get('proxy') + '/redirect'

module.exports = apiRouter => {
    apiRouter.all(routerName, function (req, res) {
        if ((req.query.code === null || req.query.code === undefined)) {	//없으면 빈거 리턴
            res.send(tokenStorage)
            return
        }
        let url = 'https://www.googleapis.com/oauth2/v4/token'
        let payload = {
            grant_type: 'authorization_code',//OAuth 2.0 스펙에 포함된 필드로 반드시 'authorization_code'로 입력한다. 
            code: req.query.code, //토큰 요청을 통해서 얻은 코드
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri
        }
        request.post(url, { form: payload }, function (error, response, body) {

            let parseBody = JSON.parse(body)
            tokenStorage.access_token = parseBody.access_token
            tokenStorage.token_type = parseBody.token_type
            tokenStorage.expires_in = parseBody.expires_in
            tokenStorage.refresh_token = parseBody.refresh_token

            //TODO : refresh_token으로 1시간이 되기 전에 access token으로 교환되도록 한다.

            if (repeat_refresh === null) {
                repeat_refresh = setInterval(RefreshIABTokenInterval, min30)
            }
            //res.send(tokenStorage)
            let oauth2Client = new OAuth2(client_id, client_secret, redirect_uri)
            oauth2Client.credentails = parseBody
            listEvents(oauth2Client)
            res.send("Successfully obtained and saved Access_tokens!!")
        })
    })
}