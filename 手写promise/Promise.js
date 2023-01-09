class Promise {
    constructor(executor) {
        //添加属性
        this.PromiseState = 'pending'
        this.PromiseResult = 'null'
        //保存实例this的值
        const self = this

        this.callbacks = []

        //resolve函数
        function resolve(value) {
            //判断状态
            if (self.PromiseState !== 'pending') return
            //修改对象状态值(PromiseState)
            self.PromiseState = 'fulfilled'//resolved

            //修改对象属性值(PromiseResult)
            self.PromiseResult = value

            //调用成功的回调函数

            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(value)
                })
            });
        }
        //reject函数
        function reject(value) {
            //判断状态
            if (self.PromiseState !== 'pending') return
            //修改对象状态值(PromiseState)
            self.PromiseState = 'rejected'//resolve

            //修改对象属性值(PromiseResult)
            self.PromiseResult = value

            //调用失败的回调函数

            //执行回调
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(value)
                })
            });
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    //then方法
    then(onResolved, onRejected) {
        let self = this
        //判断回调函数的参数
        if (typeof onRejected !== 'function') {
            onRejected = reson => {
                throw reson
            }
        }
        if (typeof onResolved !== 'function') {
            onResolved = value => value
        }
        return new Promise((resolve, reject) => {
            function callback(type) {
                //获取回调函数的执行结果
                try {
                    let result = type(self.PromiseResult)
                    //判断结果是否是Promise函数
                    if (result instanceof Promise) {
                        result.then((value) => {
                            resolve(value)
                        }, (reason) => {
                            reject(reason)
                        })
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            if (this.PromiseState === 'fulfilled') {
                setTimeout(() => {
                    callback(onResolved)
                });
            }
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                });
            }
            if (this.PromiseState === 'pending') {
                this.callbacks.push(
                    {
                        onResolved: function () {
                            callback(onResolved)
                        },
                        onRejected: function () {
                            callback(onRejected)
                        }
                    }
                )
            }
        })

    }

    //catch
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    //resolve方法
    static resolve(value) {
        return new Promise((resolve, reject) => {
            //判断value是否是Promise函数
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }

    //reject
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    //all
    all(Promises) {
        return new Promise((resolve, reject) => {
            //声明变量
            let count = 0
            let arr = []
            //遍历
            for (let i = 0; i < Promises.length; i++) {
                Promises[i].then(v => {
                    //累计
                    count += 1
                    arr[i] = v
                    if (count === Promises.length) {
                        resolve(arr)
                    }
                }, r => {
                    reject(r)
                })


            }
        })
    }

    //race
    race(Promises) {
        return new Promise((resolve, reject) => {
            //遍历Promises数组
            for (let i = 0; i < Promises.length; i++) {
                Promises[i].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            }
        })
    }
}

