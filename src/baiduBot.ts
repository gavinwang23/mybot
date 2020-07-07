/*
 * @Descripttion: 百度机器人对接
 * @version: 
 * @Author: wangjunwei
 * @Date: 2020-07-07 13:47:16
 * @LastEditors: wangjunwei
 * @LastEditTime: 2020-07-07 20:12:56
 */ 
var https = require('https');
var request = require("request")
var qs = require('querystring');
var param = qs.stringify({
    'access_token': '24.0656ee5c202b325588145f78fe24430b.2592000.1596689746.282335-21168496'
});
var options = {
    hostname: 'aip.baidubce.com',
    path: '/rpc/2.0/unit/service/chat?' + param,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};
var data = ''
var rpcResult = ''
var send = '1'
var req = https.request(
    options,
    function (res) {
        res.on('data', (d) => {
            data += d
        })
        //console.log(JSON.parse(data))
        res.on('end',function(){
            rpcResult = JSON.parse(data)
            //console.log(data)
            //console.log(rpcResult)
            send=rpcResult.result.response_list[0].action_list[0].say
            //打印回复的消息
            console.log(send)
        })
        req.on('error',function (e){
            console.log(new Error('problem with request:' + e.message));
        })
    }
     
);
var postData = {
    'log_id': 'UNITTEST_10000',
    'version': '2.0',
    'service_id': 'S31458',
    'session_id': '',
    'request': {
        'query': '你好',
        'user_id': '88888'
    }
};
// 携带数据发送https请求
req.write(JSON.stringify(postData));
req.end();
//console.log(send)


/**
 * @description: 机聊天器人接口
 * @param {String} info
 * @return {Promise}
 */
function requestBot(info){
    return new Promise((resolve, reject) => {
        //resolve("hello test")
        var data = ''
        var rpcResult = ''
        var send = '1'
        var req = https.request(
            options,
            function (res) {
                res.on('data', (d) => {
                    data += d
                })
                //console.log(JSON.parse(data))
                res.on('end',function(){
                    rpcResult = JSON.parse(data)
                    //console.log(data)
                     //console.log(rpcResult)
                    send=rpcResult.result.response_list[0].action_list[0].say
                    //打印回复的消息
                    //console.log(send)
                    resolve(send)
                })
                req.on('error',function (e){
                    console.log(new Error('problem with request:' + e.message));
                })
            }
     
        );
        var postData = {
            'log_id': 'UNITTEST_10000',
            'version': '2.0',
            'service_id': 'S31458',
            'session_id': '',
            'request': {
                'query': '你好',
                'user_id': '88888'
            }
        };
        // 携带数据发送https请求
        req.write(JSON.stringify(postData));
        req.end();
        //console.log(send)
    })
}