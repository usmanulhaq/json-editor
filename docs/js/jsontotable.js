function makeTable(obj_for_table, counter = 1){

    var table_html = jQuery.parseHTML( `<table class = "json_table" counter-id = ${counter} id = "json_table_${counter}"></table>` );
    var i= 0;
    var header_names = {};
    var local_counter = counter;

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
                insertColumn(table_html, k, local_counter);
                $(table_html).find('tr').last().find('td').eq(header_names[k]).html(value);
                i++;
            }
            else
            {
                $(table_html).find('tr').last().find('td').eq(header_names[k]).html(value);
            }   

        });

            td_list = '<td></td>'.repeat(i);
            $(table_html).append( `<tr counter-id = ${local_counter}>' ${td_list} '</tr>`);
    });

    $(table_html).find('tr').last().remove();
    
    return table_html;

}   


function insertColumn(table_ref, header_name, counter) {

    if( !$(table_ref).find('tr').first().length ){
        var thead = `<thead  counter-id = ${counter} id = "json_table_header_${counter}"><tr counter-id = ${counter}><th> ${header_name} </th></tr></thead>`;
        var tbody = `<tbody  counter-id = ${counter} id = "json_table_body_${counter}"><tr counter-id = ${counter}><td></td></tr></tbody>`
        $(table_ref).append(thead);
        $(table_ref).append(tbody);
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

function makeJson(counter=1){

    var header = [];
    var data = [];

    
    $('#json_table_header_'+ counter + ' th').each(function(i, v){
        header[i] = $(this).text();
    });
    //console.log('header: ', header, counter);
    var row_finder = `#json_table_body_${counter} tr[counter-id=${counter}]`;
    $(row_finder).each(function(row_i, row_v){

        var obj = {};
        console.log('Outer loop id, value: ', row_i, row_v);

        $(header).each(function(header_i, header_value){

            var cell = $(row_v).children('td').eq(header_i);
            var inner_html = $(cell).html();
            var inner_text = $(cell).text();
            var inner_table = $(cell).find('table');

            console.log('header: ', header, counter);
            console.log('inner_html value, counter: ', inner_html, counter);
            console.log('Inner loop id, value: ', header_i, header_value);


            if(inner_text != '' && inner_text != null){
                if(inner_html == inner_text){
                    obj[header_value] = inner_html;
                }
                else{
                    //console.log('inner_table log: ', $(inner_table).text());
                    if($(inner_table).length != 0){
                        
                        obj[header_value] = makeJson( $(inner_table).attr('counter-id') );
                        console.log('recursive func return with: ', obj[header_value]);
                    }
                    else{
                        obj[header_value] = "object1234";
                    }
                }
                
            }
            
        });
        //console.log('data value: ', data);
        data.push(obj);
    });

    //return JSON.stringify(data);
    return data;
}

