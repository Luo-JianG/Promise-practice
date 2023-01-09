const fs = require('fs')
// fs.readFile('./resource/content.txt',(err,data) => {
//     //如果出错，则抛出内容
//     if(err) throw err
//     //输出文件内容
//     console.log(data.toString());
// })

let p = new Promise((resolve,reject) => {
    fs.readFile('./resource/content.tx',(err,data) => {
        if(err) reject(err)
        resolve(data)
    })
})

p.then(
    (value) => {
        console.log(value.toString());
    },
    (reason) => {
        console.log(reason);
    }
)