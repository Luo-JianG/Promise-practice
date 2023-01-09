//引入fr
const fs = require('fs')
const util = require('util')

const mineReadFile = util.promisify(fs.readFile)

//回调函数方式
// fs.readFile('./resource/content1.txt',(err, data1) => {
//     if(err) throw err1
//     fs.readFile('./resource/content2.txt', (err, data2) => {
//         if(err) throw err2
//         fs.readFile('./resource/content3.txt', (err, data3) => {
//             if(err) throw err3
//             console.log(data1 + data2 + data3);
//         })
//     })
// })

//async 与 await
async function main() {
    try {
        let data1 = await mineReadFile('./resource/content1.txt')
        let data2 = await mineReadFile('./resource/content2.txt')
        let data3 = await mineReadFile('./resource/content3.txt')
        console.log(data1 + data2 + data3);
    } catch (error) {
        console.log(error);
    }
}

main()