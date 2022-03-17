class Edmodo{
    constructor(){
        this.access_token = null;
        this.quiz_id = null;
        this.user_id = null;
        this.active = false;
        this.checkLicense();
    }

    autoDo(){
        let button = $('.btn-auto-do').attr('disabled',true).html('Processing...');
        $.ajax({
            url: AUTO_DO_URL,
            type : POST_METHOD,
            data: {
                access_token: this.access_token,
                quiz_id: this.quiz_id,
                user_id: this.user_id
            },
            data_type : JSON_TYPE
        }).done(function(data) {
            button.attr('disabled',false).html('Finished!').removeClass('btn-auto-do');
            theme.showAlert(data.message, 'success');
            setTimeout(() => {
                location.reload();
            }, 1000);
        }).fail(function(data) {
            button.attr('disabled',false).html('Auto-do');
            theme.showAlert(data.responseJSON.error ?? "There's something wrong !!!");
        });
    }

    grades(){
        if(getCookie('grade-score-display') != 1) return;
        $.ajax({
            url: GRADES_URL.replace(/{param}/g, this.quiz_id + ':' + this.user_id),
            type : GET_METHOD,
            data_type : JSON_TYPE,
            headers: {
                Authorization: 'Bearer ' + this.access_token
            },
        }).done(function(data) {
            $('.status').html('<div class="score qa-test-score"><span class="points">' + data.grade_score + '</span><span class="total-points"> / ' + data.grade_total + '</span></div>');
        })
    }

    gradeBooks(group_id){
        if(getCookie('grade-score-display') != 1) return;
        $.get( GRADE_BOOKS_URL + '?group_id=' + group_id + '&user_id=' + this.user_id + '&access_token=' + this.access_token + '&request_origin=react-web-app', function( data ) {
            var grade_score = 0;
            var grade_total = 0;
            $( ".student-assignment" ).each(function( i ) {
                let exam = data.exams[i].grades[0];
                if(exam){
                    $(this).find('.student-score').html(exam.grade_score + '/' + exam.grade_total);
                    grade_score += parseInt(exam.grade_score);
                    grade_total += parseInt(exam.grade_total);
                }
            });
            $('.chart-total-bar').find('.title:last').html(grade_score + '/' + grade_total);
        });
    }

    updateQuiz(){
        $.ajax({
            url: UPDATE_URL,
            type : POST_METHOD,
            data: {
                access_token: this.access_token,
                quiz_id: this.quiz_id
            }
        });
    }

    checkLicense(){
        let license_key = getCookie('license_key');
        if(license_key == undefined || license_key == '' || license_key == null){
            theme.showSettingAlert("You must enter the license key !!!");
            return;
        }
        
        let buttonElement = $('.license_key').attr('disabled',true).html('Verifying...');
        let statusElement = $('.activation-status');
        $.ajax({
            url: CHECK_LICENSE_URL,
            type : POST_METHOD,
            data: {
                license_key: license_key
            }, 
            data_type : JSON_TYPE
        }).done(function(data){
            activated = true;
            theme.showSettingAlert(data.message ?? "There's something wrong !!!", 'success');
            buttonElement.attr('disabled',false).html('Verify');
            statusElement.removeClass('text-danger').addClass('text-success').text("Activated");
        }).fail(function(data){
            activated = false;
            setCookie('license_key', '');
            $('input[name="license_key"]').val('');
            buttonElement.attr('disabled',false).html('Verify');
            statusElement.removeClass('text-success').addClass('text-danger').text("Not activated ?");
            theme.showSettingAlert(data.responseJSON.message ?? "There's something wrong !!!");
        });

    }

}
