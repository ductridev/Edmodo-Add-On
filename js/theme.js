class Theme {
    constructor(){
        this.loop();
        if(getCookie('grade-score-display') == undefined)
            setCookie('grade-score-display',1,2000);
    }

    loop(){
        this.update();
        setTimeout( () => this.loop(), 100);
    }

    update(){
        this.drawAutoDoButton();
        this.drawOverViewAlert();
        this.drawSettingContent();
    }

    drawAutoDoButton(){
        let overviewButton = $(".overview-btn");
        let overViewAutoDoButton = $('.btn-auto-do');
        let autoDoButtonDisplay = getCookie('auto-do-display');
        
        if($('.quiz-title').text().toLowerCase().indexOf('check') != -1) return;
        
        if(overViewAutoDoButton.length == 0 && overviewButton.length > 0 && autoDoButtonDisplay == 1 && activated == true)
            overviewButton.append('<button type="button" class="btn btn-danger btn-auto-do" style="margin-left: 5px">Auto-do</button>');
    }

    drawOverViewAlert(){
        let overViewContent = $('.qa-test-quizTake-overviewContent');
        let overViewAlert = $('.overview-alert');
        if(overViewAlert.length == 0 && overViewContent.length > 0)
            overViewContent.prepend('<div class="overview-alert"></div>');
    }

    drawSettingContent(){
        let overViewPersponal = $('.personal-info-content');
        let overViewSetting = $('.overview-setting');
        if(overViewPersponal.length == 0 || overViewSetting.length > 0) return;

        overViewSetting = overViewPersponal.find('.card-body').find('div:first').addClass('overview-setting').html('');
        overViewSetting.append('<div class="sub-section-header"><span>Edmodo Extensions</span></div>');
        overViewSetting.append(this.drawInputGroup('License key - <span class="activation-status font-weight-bold text-' + (activated ? 'success' : 'danger') + '">' + (activated ? 'Activated' : 'Not activated ?') + '</span>', 'license_key', 'Verify'));
        overViewSetting.append(this.drawToggle('Show Auto-do button', 'auto-do-display'));
        overViewSetting.append(this.drawToggle('Show grade score', 'grade-score-display')); 
        overViewSetting.append('<div class="container-divider"></div>');
    }

    drawToggle(label, id){
        let checked = getCookie(id);
        return '<div class="eds-toggle-switch">\
                    <input class="toggle-config" id="' + id + '" type="checkbox" ' + (checked == 1 ? 'checked' : '') + ' value="' + id + '">\
                    <label class="toggle-label" for="' + id + '">' + label + '</label>\
                </div>';
    }

    drawInput(label, name){
        return '<div class="form-group">\
                    <label class="subtext">' + label + '</label>\
                    <input name="' + name + '" type="text" class="form-control" value="' + getCookie(name) + '">\
                </div>';
    }

    drawInputGroup(label, name, labelButton){
        return '<div class="form-group">\
                    <label class="subtext">' + label + '</label>\
                    <div class="input-group">\
                        <input name="' + name + '" type="text" class="form-control" value="' + getCookie(name) + '">\
                        <div class="input-group-append">\
                            <button class="btn btn-primary ' + name + '" type="button">' + labelButton + '</button>\
                        </div>\
                    </div>\
                </div>';
    }

    showAlert(message, type = 'danger'){
        $('.overview-alert').html('<div class="alert alert-' + type + '">' + (message ?? '') + '</div>');
    }   

    showSettingAlert(message, type = 'danger'){
        let overViewSetting = $('.overview-setting');
        if(overViewSetting.length == 0 ) return;

        if($('.alert').length == 0)
            overViewSetting.prepend('<div class="alert alert-' + type + '">' + message + '</div>');
        else{
            let alertElement = overViewSetting.find('.alert');
            alertElement.removeClass().addClass('alert alert-' + type).html(message);
        }
    }

}