let quizId;
let access_token;
let rendered;

console.log("Edmodo answer library application is running");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request._KEY){
            case SAVE_QUIZ_ID:
                quizId = request.data.quizId;
                edmodo.quiz_id = request.data.quizId;
                break;
            case SAVE_TOKEN:
                access_token = request.access_token;
                break;
            case UPDATE_QUIZ:
                sendUpdate(quizId);
                break;
        }
        sendResponse({_KEY: request._KEY});
    }
);

setInterval(function(){
    loop();
}, 200);

function loop(){
    // renderBtnTakeQuiz();
    updateQuizzes();
    renderAlertView();
    renderSettingView();
}

function renderAlertView(){
    let overViewAlert = $('.overview-alert');
    let overViewContent = $('.qa-test-quizTake-overviewContent');
    if(overViewAlert.length == 0 && overViewContent.length > 0)
        overViewContent.prepend('<div class="overview-alert"></div>');
}

function renderBtnTakeQuiz(){
    let overview_btn = $(".overview-btn");
    if(overview_btn.length == 0){
        rendered = false;
        return;
    }

    if(rendered == true || quizId == null) return;

    $('.overview-btn').append('<button type="button" class="btn btn-danger btn-take" style="margin-left: 5px">Auto-do</button>');
    rendered = true;
}

function updateQuizzes(){
    if(!access_token || access_token.indexOf('ey') == -1) return;
    if ($.cookie('eal_updated') != 'true') {
        setCookie('eal_updated', 'true', 0.01); 
        sendUpdate();
    }
}

function sendUpdate(quizId = null){
    $.ajax({
        url: "https://edmodo.cloud/api/quiz/update",
        type : 'POST',
        data: {
            access_token: access_token,
            quiz_id: quizId
        }
    }).done(function(data) {
        setCookie('eal_updated', 'true', 12); 
    });
}

$(document).on('click', '.btn-take', function(){
    let btn = $(this);
    btn.attr('disabled',true).html('Processing...');
    $.ajax({
        url: "https://edmodo.cloud/api/quiz/take",
        type : 'POST',
        data: {
            access_token: access_token,
            quiz_id: quizId,
            quiz_title: $('.quiz-title').find('h3').text(),
        }
    }).done(function(data) {
        btn.attr('disabled',false).html('Finished!').removeClass('btn-take');
        setTimeout(()=>{
            location.reload();
        },1000);
    }).fail(function(data) {
        btn.attr('disabled',false).html('Auto-do');
        $('.overview-alert').html('<div class="alert alert-danger">' + (data.responseJSON.error ?? '') + '</div>');
    });
});


function setCookie(key, value, time){
    var date = new Date();
    var hours = 3600;
    date.setTime(date.getTime() + (hours * time * 1000));
    $.cookie(key, value, { expires: date}); 
}
