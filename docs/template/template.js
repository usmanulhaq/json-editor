

var jquery_script = document.createElement('script');
var bootstrap_script = document.createElement('script');
var context_menu1= document.createElement('script');
var context_menu2 = document.createElement('script');

var json_to_table = document.createElement('script');
var row_col_edit = document.createElement('script');


var page_name = "";

function loadTemplate(p)
{
    loadScripts();
    page_name = p;
}

function loadScripts(){
    jquery_script.src = "https://code.jquery.com/jquery-3.3.1.min.js";
    bootstrap_script.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js";

    context_menu1.src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js";
    context_menu2.src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js";

    json_to_table.src="../js/jsontotable.js";
    row_col_edit.src="../js/row_col_edit.js";

    document.body.appendChild(jquery_script);
        
}

jquery_script.onload = function(){
    document.body.appendChild(bootstrap_script);
    document.body.appendChild(context_menu1);
    document.body.appendChild(context_menu2);
    document.body.appendChild(json_to_table);
    document.body.appendChild(row_col_edit);
}

bootstrap_script.onload = function(){
    
    loadBody();
    loadHead();
    loadNav();
    loadFooter();
    loadContent(page_name);
}


function loadContent(page)
{
    $.ajax({
        url: '../data/' + page,
        cache: false,
        success: function(data){
            $('#my_content').replaceWith($(data).html());

        },
        error: function(e){
            console.log('Error loading content', e);
        }
        
    });
}

function loadNav()
{
    $.get('../template/nav.html', function(data) {
        $('#my_nav').replaceWith($(data).html());
    });
}

function loadFooter()
{
    $.get('../template/footer.html', function(data) {
        $('#my_footer').replaceWith($(data).html());
    });
}
function loadHead()
{
    var xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.head.innerHTML = this.responseText ;
      }
      else
      return "error loading";
    };
    xhttp.open("GET", "../template/head.html", true);
    xhttp.send();

}

function loadBody()
{
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("body_content").outerHTML =  this.responseText;

      }
    };
    xhttp.open("GET", "../template/body.html", true);
    xhttp.send();
}

