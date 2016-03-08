# 截屏示例程序
本程序是基于electron运行环境做的屏幕截屏测试程序。  
实现屏幕区域截屏功能，支持将图片保存在本地或上传到服务器上，服务器上接收到数据后需要新建一个buffer用于保存。
``` nodejs
//node.js server
var img = req.param('imageData');
var dataBuffer = new Buffer(img,'base64');
fs.writeFile("save.png",dataBuffer,function(err){
  if(err){
    console.log(err);
  }
})
```
