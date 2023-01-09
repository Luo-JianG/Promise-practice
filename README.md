# Promise的理解与使用

## 1. Promise 是什么?

### 1.1异步编程

- fs 文件操作

  ```js
  require('fs').readFile('./index.html', (err,data)=>{})
  ```

- 数据库操作

- AJAX

  ```js
    $.get('/server', (data)=>{})
  ```

- 定时器

  ```js
  setTimeout(()=>{}, 2000);
  ```

### 1.2概念:

Promise是`异步编程的一种解决方案`，比传统的解决方案——回调函数和事件——更合理和更强大。所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

通俗讲，`Promise是一个许诺、承诺`,是对未来事情的承诺，承诺不一定能完成，但是无论是否能完成都会有一个结果。

- Pending 正在做。。。
- Resolved 完成这个承诺
- Rejected 这个承诺没有完成，失败了

Promise 用来预定一个不一定能完成的任务，要么成功，要么失败

在具体的程序中具体的体现，通常用来封装一个异步任务，提供承诺结果

Promise 是异步编程的一种解决方案，`主要用来解决回调地狱的问题，可以有效的减少回调嵌套`。真正解决需要`配合async/await`

1. 特点:

(1)对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

(2)一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

1. 缺点:

(1)无法取消Promise，一旦新建它就会立即执行，无法中途取消。和一般的对象不一样，无需调用。

(2)如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

(3)当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### 1.3理解

1. 抽象表达:

- Promise 是一门新的技术( ES6 规范)
- Promise 是 JS 中进行异步编程的新解决方案 备注：旧方案是单纯使用回调函数

1. 具体表达:

- 从语法上来说: Promise 是一个构造函数
- 从功能上来说: promise 对象用来封装一个异步操作并可以获取其成功/ 失败的结果值

### 1.4代码体验

需求：

- 点击按钮, 1s 后显示是否中奖(30%概率中奖)
- 若中奖弹出 恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券
- 若未中奖弹出 再接再厉

![img](https://img-blog.csdnimg.cn/eaf062c49819457c8db428f21c403cd6.png)

js代码

```js
 //生成随机数
        function rand(m,n){
            return Math.ceil(Math.random() * (n-m+1)) + m-1;
        }
        //获取元素对象
        const btn = document.querySelector('#btn');
        //绑定单击事件
        btn.addEventListener('click', function(){
            //定时器
             setTimeout(() => {
                 //获取从1 - 100的一个随机数
                 let n = rand(1, 100);
                 //判断
                 if(n <= 30){
                     alert('恭喜恭喜, 奖品为 10万 RMB');
                 }else{
                     alert('再接再厉');
                 }
             }, 1000);
```

**Promise 形式实现**

```js
 //生成随机数
        function rand(m,n){
            return Math.ceil(Math.random() * (n-m+1)) + m-1;
        }
        //获取元素对象
        const btn = document.querySelector('#btn');
        //绑定单击事件
        btn.addEventListener('click', function(){
            //Promise 形式实现
            // resolve 解决  函数类型的数据
            // reject  拒绝  函数类型的数据
            const p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    //获取从1 - 100的一个随机数
                    let n = rand(1, 100);
                    //判断
                    if(n <= 30){
                        resolve(n); // 将 promise 对象的状态设置为 『成功』
                    }else{
                        reject(n); // 将 promise 对象的状态设置为 『失败』
                    }
                }, 1000);
            });

            console.log(p);
            //调用 then 方法
            // value 值
            // reason 理由
            p.then((value) => {
                alert('恭喜恭喜, 奖品为 10万 RMB, 您的中奖数字为 ' + value);
            }, (reason) => {
                alert('再接再厉, 您的号码为 ' + reason);
            });

        });
```

Promise(() => {})接收一个函数的参数

这个函数有**resolve, reject**形参 这两个参数都是函数类型的数据，**成功调用resolve()反之调用reject()**

resolve()，reject()函数成功的时候还可以带上参数。

.then()第一个参数是这个p对象的成功结果，第二个参数，是失败的结果。

### 1.5 Promise的状态改变

1. pending 变为 resolved
2. pending 变为 rejected

说明: `只有这 2 种`, 且一个 promise 对象`只能改变一次` 无论变为成功还是失败, 都会有一个结果数据 成功的结果数据一般称为 value, 失败的结果数据一般称为 reason

### 1.6 promise 的基本流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/5c5d1ae44ab341d98a5508f61caf9468.png)

## 2.为什么要用 Promise?

### 2.1. 指定回调函数的方式更加灵活

1. 旧的: 必须在启动异步任务前指定
2. promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函 数(甚至可以在异步任务结束后指定/多个)

### 2.2. 支持链式调用, 可以解决回调地狱问题

1. 什么是回调地狱?
   回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调执行的条件

![在这里插入图片描述](https://img-blog.csdnimg.cn/bf032686bc6e47bbbfb15fd6559dcca1.png)

1. 回调地狱的缺点?
   - 不便于阅读
   - 不便于异常处理
2. 解决方案?

promise `链式调用`,

用来解决回调地狱问题，但是`只是简单的改变格式`，并没有彻底解决上面的问题真正要解决上述问题，一定要利用promise再加上**await**和 **async**关键字实现异步传同步

1. ##### 终极解决方案?

**promise +async/await**

## 3.如何使用 Promise?

### 3.1不属于new Promise的API（4个）

1. **Promise.resolve 方法**: (value) => {}

   value: 成功的数据或 promise 对象

   说明: 返回一个成功/失败的 promise 对象

**resolve**

```js
  		let p1 = Promise.resolve("zimo")  //返回成功的Promise
        let p2 = Promise.resolve(new Promise((resolve,reject)=>{
            //resolve("zimo123")
            reject("zimo123")  //错误的结果需要catch捕获否则报错
        }))
        console.log(p1);
        console.log(p2);
        p2.catch(reason =>{
            console.log(reason);
        })
```

1. 如果传入的参数为 非Promise类型的对象, 则返回的结果为成功Promise对象
2. 如果传入的参数为 Promise 对象, 则Promise对象的状态决定了 p2执行Resolve还是Rejected

![在这里插入图片描述](https://img-blog.csdnimg.cn/dfd84eb3c16b4ffb8120f2d7cd53b746.png)

1. 
2. Promise.reject 方法: (reason) => {}

reason: 失败的原因

说明: 返回一个失败的 promise 对象

**reject**

```js
		let p = Promise.reject('zimo')
        let p2 = Promise.reject(new Promise((resolve, reject)=>{
            resolve("ok")
        }))
        console.log(p);
        console.log(p2);
```

如果传入的参数为 非Promise类型的对象, 则new Promise返回的结果永远为失败Promise对象

如果传入的参数为 Promise 对象, 则Promise对象的状态决定了 p执行Resolve还是Rejected
![在这里插入图片描述](https://img-blog.csdnimg.cn/93291b3384324ccc8b85ca4fab1593d3.png)

1. Promise.all 方法: (promises) => {}

   promises: 包含 n 个 promise 的数组

   说明: 返回一个新的 promise, 只有所有的 promise 都成功才成功, 只要有一个失败了就 直接失败

   **all**

   演示失败

   ```js
    let p1 = new Promise((resolve ,reject) =>{
               resolve("ok")
           })
           let p2 = Promise.resolve("Sucess")
           let p3 = Promise.reject("zimo")
   
           const result = Promise.all([p1,p2,p3])
           console.log(result);
   ```

![在这里插入图片描述](https://img-blog.csdnimg.cn/45bdf66885714d1c99091fdf745368e8.png)

演示成功

```
 let p1 = new Promise((resolve ,reject) =>{
            resolve("ok")
        })
        let p2 = Promise.resolve("Sucess")
        let p3 = Promise.resolve("zimo")

        const result = Promise.all([p1,p2,p3])
        console.log(result);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/71c0d1e616754859b2438d7933aa4faf.png)

1. Promise.race 方法: (promises) => {}

   promises: 包含 n 个 promise 的数组

   说明: 返回一个新的 promise, 第一个完成的 promise 的结果状态就是最终的结果状态

```js
		let p1 = new Promise((resolve ,reject) =>{
            setTimeout(()=>{
                reject("ok") //等待一秒执行reject
            },1000)
        })
        let p2 = Promise.resolve("Sucess")  //最先执行p2
        let p3 = Promise.resolve("zimo")

        const result = Promise.race([p1,p2,p3])
        console.log(result);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/63ef4883f7ba4aa1923e6d7e9a6a2538.png)

### 3.2属于new Promise的API

Promise.prototype.catch 方法: (onRejected) => {}

onRejected 函数: 失败的回调函数 (reason) => {}

说明: then()的语法糖, 相当于: then(undefined, onRejected)

**catch**

```js
let p = new Promise((resolve, reject) => {
    reject('error');
});
p.catch(reason => {
    console.log(reason);
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/fc4f71f635fc4ca3b6d8542ae770c1f1.png)

### 3.3. promise 的几个关键问题

#### 1.如何改变 Promise 的状态?

改变 Promise **的状态的3种方法**

1. resolve(value): 如果当前是 pending 就会变为 resolved
2. reject(reason): 如果当前是 pending 就会变为 rejected
3. 抛出异常: 如果当前是 pending 就会变为 rejected

```js
let p = new Promise((resolve, reject) => {
 //1. resolve 函数
 // resolve("ok"); // pending   => fulfilled (resolved)
 //2. reject 函数
 //reject("error"); // pending  =>  rejected
 //3. 抛出错误
 throw "出问题了";
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/45c9525843b84de789562ee4d1c208bc.png)

#### 2.一个 Promise 指定多个成功/失败回调函数, 都会调用吗？

当 promise 改变为对应状态时都会调用

```js
let p = new Promise((resolve, reject) => {
 resolve("OK"); //如果注释掉resolve()，那么p的状态就还是pending，即状态未发生改变，不会调用then
});
///指定回调 - 1
p.then((value) => {
 console.log(value);
});
//指定回调 - 2
p.then((value) => {
 alert(value)
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6333ef6a97934378b5d5fa31d7cc77a6.png)

#### 3.改变 Promise 状态和指定回调函数谁先谁后？

1. 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调

2. 如何先改状态再指定回调?
   在执行器中直接调用 resolve()/reject(）
   延迟更长时间才调用 then()

3. 什么时候才能得到数据？

   如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
   如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

```js
let p = new Promise((resolve, reject) => {
//异步写法,这样写会先指定回调,再改变状态
setTimeout(() => {resolve('zimo'); }, 1000);
//这是同步写法,这样写会先改变状态,再指定回调
resolve('zimo1'); 
});
p.then(value => {console.log(value);}, reason => {})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/bb703d14df5b4c88b523304628870410.png)

#### 4.promise.then()返回的新 promise 的结果状态由什么决定?

(1) 简单表达: 由 then()指定的回调函数执行的结果决定

(2) 详细表达:

```
① 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
```

 ② 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值

 ③ 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

```js
 let p = new Promise((resolve, reject) => {
            resolve('ok');
        });
        //执行 then 方法
   let result = p.then(value => {
        // console.log(value);
        //1. 抛出错误
        // throw '出了问题';
        //2. 返回结果是非 Promise 类型的对象
        // return 521;
        //3. 返回结果是 Promise 对象
         return new Promise((resolve, reject) => {
              resolve('success');
              //reject('error');
         });
    }, reason => {
         console.warn(reason);
      });

     console.log(result);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b9afc87022ec4ab7b155ce6cf5116e2e.png)

#### 5.promise 如何串连多个操作任务?

(1) promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用

(2) 通过 then 的链式调用串连多个同步/异步任务

```js
let p = new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve('OK');
   }, 1000);
});	
p.then(value => {
   return new Promise((resolve, reject) => {
       resolve("success");
   });
}).then(value => {
   console.log(value);
}).then(value => {
//因为上个then没有返回任何东西所以输出undefined
   console.log(value);
})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/bb42e6bc2d05445a89481ed6d26775a9.png)

#### 6.Promise 异常传透?

- 当使用 Promise 的 then 链式调用时, 可以在最后指定失败的回调
- 前面任何操作出了异常, 都会传到最后失败的回调中处理

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
        // reject('Err');
    }, 1000);
});
p.then(value => {
    // console.log(111);
    throw '失败啦!';
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => { //用then也可以捕获异常，不过then要传两个参数
    console.warn(reason);
});
console.log(p)
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/a5980774bbdb45148d6f710db1c8d217.png)

#### 7.如何中断 Promise 链?

- 当使用 Promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数
- 办法: 在回调函数中返回一个 pendding 状态的 Promise 对象

```js
        let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('OK');
            }, 1000);
        });

        p.then(value => {
            console.log(111);
            //有且只有一个方式
            return new Promise(() => {});
        }).then(value => {
            console.log(222);
        }).then(value => {
            console.log(333);
        }).catch(reason => {
            console.warn(reason);
        });
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6de2226430994d1fb87237f5c6ba95f6.png)

# 4.手撕Promise

[详细教程点这里](https://www.bilibili.com/video/BV1GA411x7z1?p=25&vd_source=57815f8386153d4f361eaa5df49ec197)

直接上代码

```js
class Promise{
    //构造方法
    constructor(executor){
        //添加属性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        //声明属性
        this.callbacks = [];
        //保存实例对象的 this 的值
        const self = this;// self _this that
        //resolve 函数
        function resolve(data){
            //判断状态
            if(self.PromiseState !== 'pending') return;
            //1. 修改对象的状态 (promiseState)
            self.PromiseState = 'fulfilled';// resolved
            //2. 设置对象结果值 (promiseResult)
            self.PromiseResult = data;
            //调用成功的回调函数
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(data);
                });
            });
        }
        //reject 函数
        function reject(data){
            //判断状态
            if(self.PromiseState !== 'pending') return;
            //1. 修改对象的状态 (promiseState)
            self.PromiseState = 'rejected';// 
            //2. 设置对象结果值 (promiseResult)
            self.PromiseResult = data;
            //执行失败的回调
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data);
                });
            });
        }
        try{
            //同步调用『执行器函数』
            executor(resolve, reject);
        }catch(e){
            //修改 promise 对象状态为『失败』
            reject(e);
        }
    }

    //then 方法封装
    then(onResolved,onRejected){
        const self = this;
        //判断回调函数参数
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason;
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value => value;
            //value => { return value};
        }
        return new Promise((resolve, reject) => {
            //封装函数
            function callback(type){
                try{
                    //获取回调函数的执行结果
                    let result = type(self.PromiseResult);
                    //判断
                    if(result instanceof Promise){
                        //如果是 Promise 类型的对象
                        result.then(v => {
                            resolve(v);
                        }, r=>{
                            reject(r);
                        })
                    }else{
                        //结果的对象状态为『成功』
                        resolve(result);
                    }
                }catch(e){
                    reject(e);
                }
            }
            //调用回调函数  PromiseState
            if(this.PromiseState === 'fulfilled'){
                setTimeout(() => {
                    callback(onResolved);
                });
            }
            if(this.PromiseState === 'rejected'){
                setTimeout(() => {
                    callback(onRejected);
                });
            }
            //判断 pending 状态
            if(this.PromiseState === 'pending'){
                //保存回调函数
                this.callbacks.push({
                    onResolved: function(){
                        callback(onResolved);
                    },
                    onRejected: function(){
                        callback(onRejected);
                    }
                });
            }
        })
    }

    //catch 方法
    catch(onRejected){
        return this.then(undefined, onRejected);
    }

    //添加 resolve 方法
    static resolve(value){
        //返回promise对象
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v);
                }, r=>{
                    reject(r);
                })
            }else{
                //状态设置为成功
                resolve(value);
            }
        });
    }

    //添加 reject 方法
    static reject(reason){
        return new Promise((resolve, reject)=>{
            reject(reason);
        });
    }

    //添加 all 方法
    static all(promises){
        //返回结果为promise对象
        return new Promise((resolve, reject) => {
            //声明变量
            let count = 0;
            let arr = [];
            //遍历
            for(let i=0;i<promises.length;i++){
                //
                promises[i].then(v => {
                    //得知对象的状态是成功
                    //每个promise对象 都成功
                    count++;
                    //将当前promise对象成功的结果 存入到数组中
                    arr[i] = v;
                    //判断
                    if(count === promises.length){
                        //修改状态
                        resolve(arr);
                    }
                }, r => {
                    reject(r);
                });
            }
        });
    }

    //添加 race 方法
    static race (promises){
        return new Promise((resolve, reject) => {
            for(let i=0;i<promises.length;i++){
                promises[i].then(v => {
                    //修改返回对象的状态为 『成功』
                    resolve(v);
                },r=>{
                    //修改返回对象的状态为 『失败』
                    reject(r);
                })
            }
        });
    }
}   
```

# 5.async 与 await

## 1.async函数

[async文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

- 使用async该函数的返回值为 Promise对象
- Promise对象的结果由 async 函数执行的返回值决定

```js
    async function main1() {
        //1. 如果返回值是一个非Promise类型的数据 则状态为成功，返回一个成功的promise对象
        return 521;
    }
    async function main2() {
        //2. 如果返回的是一个Promise对象 则状态取决于返回结果
        return new Promise((resolve, reject) => {
            // resolve('OK'); //成功
            reject("Error"); //失败
        });
    }
    async function main3() {
        // 3. 抛出异常 返回一个失败的promise对象
        throw "出错啦";
    }
    let result1 = main1();
    let result2 = main2();
    let result3 = main3();
    console.log(result1);
    console.log(result2);
    console.log(result3);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/da309cfa08994148a67d2f753bca0a77.png)

## 2.await 表达式

- await 右侧的表达式一般为 Promise对象, 但也可以是其它的值
- 如果表达式是 Promise对象, await 返回的是 Promise成功的值
- 如果表达式是其它值, 直接将此值作为 await 的返回值

**注意：**

- await 必须写在 async 函数中, 但 async 函数中可以没有 await
- 如果 await 的 Promise失败了, 就会抛出异常, 需要通过 try…catch 捕获处理

```js
 async function main() {
            let p = new Promise((resolve, reject) => {
                // resolve("OK");
                reject("Error");
            });
            //1. 右侧为promise的情况
            // let res = await p;     //打印OK
            //2. 右侧为其他类型的数据
            // let res2 = await 20;   //打印20
            //3. 如果promise是失败的状态
            try {
                let res3 = await p;
                console.log(res3)
            } catch (e) {
                //catch捕获失败状态
                console.log(e);
            }
        }
        main();
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9619f9feb97f477e87531882b734fc37.png)
