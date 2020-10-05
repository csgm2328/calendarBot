const config = require('config')
const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const SCOPE = [
    'openid', 'email',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly'
  ];
  const routerName = config.get('proxy') + '/'

module.exports = apiRouter => {
    apiRouter.post(routerName, function (req, res) {
    fs.readFile('./secret/client_secret.json', function processClientSecrets(err, content) {
      // 로컬의 client_secret.json 파일을 읽고 'authorize' 함수 실행
      if (err) {
        console.log('Error loading client secret file: ' + err)
        return
      }
    })
  
    let oauth2client = new OAuth2(client_id, client_secret, redirect_uri)
    let url = oauth2client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE,
      approval_prompt: 'force'
    })
    res.redirect(url)
  })
}