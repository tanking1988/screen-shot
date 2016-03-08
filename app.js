var canvas = document.createElement('canvas');
var server = "http;//127.0.0.1:5000";
function showCanvas(c){
    canvas.style.width = c.w + "px";
    canvas.style.height = c.h + "px";
    canvas.width = c.w;
    canvas.height = c.h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage($('.screen-img')[0],c.x,c.y,c.w,c.h,0,0,c.w,c.h);
    var buttonX = c.x2 +2;
    if (buttonX+ 160 > document.body.clientWidth) {
        buttonX = document.body.clientWidth - 170;
    };
    var buttonY = c.y2+2;
    if (buttonY + 30 > document.body.clientHeight) {
        buttonY = document.body.clientHeight -30;
    };
    $('.button-group').css("left", buttonX+"px");
    $('.button-group').css("top", buttonY + "px");
    $('.button-group').show();
}
function hideGroup(e){
    $('.button-group').hide();
}
$(document).ready(function(){
    var electronScreen = require('electron').screen;
  var size = electronScreen.getPrimaryDisplay().size;//workAreaSize;
  console.log(size);
  var win = require('remote').getCurrentWindow();
    var desktopCapturer = require('electron').desktopCapturer;
    desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
            width: size.width,
            height: size.height
        }
    },
    function(error, sources) {
        if (error) throw error;
        if (sources.length < 1) {
            throw "sources length < 1";
            return;
        }
        console.log(sources);
        win.show();
        $('.screen-img')[0].src = sources[0].thumbnail.toDataUrl();
        $('.screen-img').Jcrop({
            onSelect: showCanvas,
            onRelease: hideGroup
        });
    });

    $('#save-img').click(function(){
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=foobar.png"); 
        window.location.href=image; // it will save locally 
        setTimeout(function(){
            alert("保存图片完成？");
            win.close();
        },1000);
    });
    $('#upload-img').click(function(e){
        var image = canvas.toDataURL("image/png");
         image = image.replace(/^data:image\/(png|jpg);base64,/, "");
         $.ajax({
            type: 'POST',
            url: server + '/uploadPic',
            data: '{ "imageData" : "' + image + '" }',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(msg) {
                alert("Done, Picture Uploaded.");
                win.close();
            },
            error: function(res, err){
                if (err) {
                    alert("error: ", err);
                };
            }
        });

    })
    $("#cancel-img").click(function(){
        win.close();
    })
})
