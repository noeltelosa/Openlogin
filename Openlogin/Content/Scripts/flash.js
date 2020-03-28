function showFail(rowid, content) {
    if (rowid != '') {
        document.getElementById(rowid).style.backgroundColor = '#F3C9C9';
    }
    $j('.flash').remove();
    var flash = $j('<div style="display:none;" id="flashr">');
    flash.html(content).toggleClass('flash').toggleClass('error');
    $j('#flash').prepend(flash);
    flash.slideDown('fast');
    flash.delay(5000).slideUp('slow');
    flash.click(function () {
        $j(this).slideUp('slow');
    });
}

function transparentBackground(rowid) {
    if (document.getElementById(rowid) != null) {
        document.getElementById(rowid).style.backgroundColor = 'transparent';
    }
    $j('#flashr').slideUp('fast', function () {
        $j('.flash').remove();
    });
}

function showSuccess(content) {
    $j('.flash').remove();
    var flash = $j('<div style="display:none;" id="flashr">');
    flash.html(content).toggleClass('flash').toggleClass('info');
    $j('#flash').prepend(flash);
    flash.slideDown('fast');
    flash.delay(5000).slideUp('slow');
    flash.click(function () {
        $j(this).slideUp('slow');
    });
}