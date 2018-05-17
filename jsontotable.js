function makeTable(obj_for_table, counter = 1){

    var table_html = jQuery.parseHTML( '<table class = "json_table" id = "json_table_'+ counter +'"></table>' );
    var i= 0;
    var header_names = {};

    $.each(obj_for_table, function(level1_k, level1_v){
        $.each(level1_v, function(k, v){
            //console.log('Second Level: ' , key, value);
            if(jQuery.type(v) == 'object'){
                value = makeTable( JSON.parse(  "[" + JSON.stringify(v) + "]" ), counter+1 );
                counter++;
            }
            else if(jQuery.type(v) == 'array'){
                value = makeTable( v, counter+1 );
                counter++;
            }
            else
            {
                value = v;
            }
            //console.log(v,jQuery.type(v));

            if(typeof(header_names[k]) == "undefined" ){
                header_names[k] = i;
                insertColumn(table_html, k);
                $(table_html).find('tr').last().find('td').eq(header_names[k]).html(value);
                i++;
            }
            else
            {
                $(table_html).find('tr').last().find('td').eq(header_names[k]).html(value);
            }   

        });

            td_list = '<td></td>'.repeat(i);
            $(table_html).append( '<tr>' + td_list + '</tr>');
    });

    $(table_html).find('tr').last().remove();
    return table_html;

}   


function insertColumn(table_ref, header_name) {

    if( !$(table_ref).find('tr').first().length ){
        $(table_ref).append('<thead><tr><th>'+ header_name +'</th></tr></thead>');
        $(table_ref).append('<tbody><tr><td></td></tr></tbody>');
    }
    else
    {
        $(table_ref).find('tr').each(function(){
            $(this).append('<td></td>');
        })
    }
    var inserted_td = $(table_ref).find('tr').first().find('td').last();

    $(inserted_td).html(header_name);
    $(inserted_td).replaceWith("<th>" + $(inserted_td).html() + "</th>");

}

