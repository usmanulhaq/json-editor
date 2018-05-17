$(document).ready(function () {
    loadTemplate();

});

function loadTemplate()
{
    loadNav();
    loadFooter();
}
function loadNav()
{
    $.get('../template/nav.html', function(data) {
        $('#my_nav').replaceWith($(data).html());
    });
}
function loadContent(page)
{
    $.get('../data/' + page, function(data) {
        $('#my_content').replaceWith($(data).html());
    });
}
function loadFooter()
{
    $.get('../template/footer.html', function(data) {
        $('#my_footer').replaceWith($(data).html());
    });
}
    
