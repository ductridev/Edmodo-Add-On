const SAVE_QUIZ_ID  = 1;
const SAVE_TOKEN    = 2;
const SAVE_USER_ID  = 3;
const UPDATE_QUIZ   = 4;
const GRADE_BOOKS   = 5;

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    chrome.tabs.sendMessage(details.tabId, {_KEY: SAVE_TOKEN, access_token: details.requestHeaders.find( item => item.name === 'Authorization' ).value.substr(7)}, function(response) {
        // console.log(response._KEY);
    });
},
{urls: [ "https://api.edmodo.com/profiles/me.json*" ]},["requestHeaders"]);


chrome.webRequest.onCompleted.addListener(function(details){
    let urlParams = new URLSearchParams(details.url.substr(details.url.indexOf('?')));
    let user_id = urlParams.get('user_id');
    chrome.tabs.sendMessage(details.tabId, {_KEY: SAVE_USER_ID, user_id: user_id}, function(response) {
        // console.log(response._KEY);
    });
},
{urls: [ "https://api.edmodo.com/user_tours*" ]},[]);

chrome.webRequest.onCompleted.addListener(function(details){
    let urlParams = new URLSearchParams(details.url.substr(details.url.indexOf('?')));
    let group_id = urlParams.get('group_id');
    chrome.tabs.sendMessage(details.tabId, {_KEY: GRADE_BOOKS, group_id: group_id}, function(response) {
        // console.log(response._KEY);
    });
},
{urls: [ "https://api.edmodo.com/gradebooks?group_id*" ]},[]);


chrome.webRequest.onCompleted.addListener(function(details){
    let url = details.url;
    let quiz_id = url.substr(31,8);
    chrome.tabs.sendMessage(details.tabId, {_KEY: SAVE_QUIZ_ID, quiz_id: quiz_id}, function(response) {
        // console.log(response._KEY);
    });
},
{urls: [ "https://api.edmodo.com/quizzes*" ]},[]);

chrome.webRequest.onCompleted.addListener(function(details){
    chrome.tabs.sendMessage(details.tabId, {_KEY: UPDATE_QUIZ}, function(response) {
        // console.log(response._KEY);
    });
},
{urls: [ "https://api.edmodo.com/quiz_submissions/*" ]},[]);
