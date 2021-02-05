$(document).ready(function(){
    $('#getUrls').click(function(){
        getAllTabUrl(function(url){
            renderURL(url);
        });
    });

    $('#checkAll').click(function(){
        checkAll();
    });

    $('#sendToServer').click(function(){
        sendUrl();
    });
});

function getAllTabUrl(callback){
    var queryInfo = {
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs){
        var txt = "";

        for(var i = 0; i < tabs.length; i++){
            var tab = tabs[i];
            txt += "<p><input type='checkbox' name='url' value='" + tab.url + "'>" + tab.title + "</p>";
        }

        callback(txt);
    });
}

function renderURL(statusText){
    document.getElementById('urls').innerHTML = statusText;
}

function checkAll(){
    $('input:checkbox[name="url"]').each(function() {
        this.checked = true;
   });
}

function sendUrl(){
    var link = [];

    $('input:checkbox[name="url"]').each(function() {
        if(this.checked){
              link.push(this.value);
        }
   });

    $.ajax({
        url: 'https://linker-server-artifly.herokuapp.com/setList',
        data: {url: link},
        success: function(data){
            alert(data);
        }
    });
}