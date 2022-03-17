console.log("Edmodo answer library application is running");

var activated = false;
var theme = new Theme();
var edmodo = new Edmodo();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request._KEY){
            case SAVE_QUIZ_ID:
                edmodo.quiz_id = request.quiz_id;
                edmodo.grades();
                break;
            case SAVE_USER_ID:
                edmodo.user_id = request.user_id;
                break;
            case SAVE_TOKEN:
                edmodo.access_token = request.access_token;
                break;
            case UPDATE_QUIZ:
                edmodo.updateQuiz();
                break;
            case GRADE_BOOKS:
                edmodo.gradeBooks(request.group_id);
                break;
        }
        sendResponse({_KEY: request._KEY});
    }
);

$(document).on('click', '.btn-auto-do', function(){
    edmodo.autoDo();
});

$(document).on('click', '.toggle-config', function(){
    let key = $(this).val();
    let value = getCookie(key);
    setCookie(key, value == 1 ? 0 : 1, 2000);
});

$(document).on('keyup', 'input[name="license_key"]', function(){
    setCookie('license_key', $(this).val(), 200);
});

$(document).on('click', '.license_key', function(){
    edmodo.checkLicense();
});