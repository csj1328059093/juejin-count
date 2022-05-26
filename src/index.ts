import fetch from 'node-fetch'

export const countMy = async (uid: number = 4226950469779853) => {
    const time = new Date().getTime()
    const response = await fetch(`https://juejin-game.bytedance.com/game/num-puzz/ugc/start?uid=${uid}&time=${time}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInNvdXJjZSI6Imp1ZWppbiJ9.eyJleHBpcmVBdCI6MTY1NjEyMDQ0OSwidXNlcklkIjoiNDIyNjk1MDQ2OTc3OTg1MyIsImlhdCI6MTY1MzUyODQ0OSwiZXhwIjoxNjU2MTIwNDQ5fQ.wOiMyLwXO-nAx1HlG6YZOikZ--zG0GeVtMsX7Yrylcs7vcezj3LCQFbOBGHzOuwOa5tUr3RXUfnnnmlKmmFoMFODr-rA0Sy0g4s0bxHAYfFuXrusKn1IX6O-B264159g9G21Wl0lnoTCuBWgSd9KWN_4PcNZdgUOdN9TOEpcK2NUC7Pw5MuUWXwlVSq_kqyAlWSnumYwH3GGpra2B8CTZlHPauPi1lZ_iHy-r4ZB-lq5ajtD2dtaYW47on_6zXv8rOXbvTYhhMjgYPNv1b5t-TSC_u0aNBsocahHp7IKwt-AXK9uCW4qzGp8iXeRrPBV5ZKa7DnBw7FlscI7hd-Ygg"
        }
    })
    const data = await response.json()
    const arr = []
    const operator = []
    const target = data.data.target
    data.data.map.map(row => {
        row.map(column => {
            if (column % 1 === 0) {
                arr.push(column)
            } else if (column === 0.6) {
                operator.push('/')
            } else if (column === 0.3) {
                operator.push('+')
            } else if (column === 0.5) {
                operator.push('*')
            } else if (column === 0.4) {
                operator.push("-")
            }
        })
    })
    count(arr, operator, target)
}

countMy()

export const count = (arr: number[], operator: string[], target: number) => {
    if (arr.sort().join(',') === '1314,520,6,6,6,6,8,8,8,8,9,9,9,9' && operator.sort().join(',') === ['+', '+', '-', '-', '*', '*', '/'].sort().join(',') && target === 9900) {
        console.log([1314, '', 520, '-', 8, '', 8, '*', 6, '', 6, '-', 6, '', 6, '+', 8, '/', 8, '+', 9, '', 9, '*', 9, '', 9])
        console.log('先使用以上内容按照以下顺序运算，直到与最终表达式相同停止')
        console.log({
            operator: ['', '', '-', '', '', '-', '/', '', '+', '', '*', '+'],
            index: [1, 3, 2, 5, 7, 6, 9, 11, 10, 13, 12]
        })
        console.log('最终表达式：')
        console.log([1314432, '*', 0, '+', 9900])
        console.log('最终表达式从左至右计算即可得到结果')
        return
    }
    while (operator.length < arr.length - 1) {
        operator.push('')
    }
    const permuteUnique = function (nums) {
        const ans = [];
        const vis = new Array(nums.length).fill(false);
        const backtrack = (idx, perm) => {
            if (idx === nums.length) {
                ans.push(perm.slice());
                return;
            }
            for (let i = 0; i < nums.length; ++i) {
                if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
                    continue;
                }
                perm.push(nums[i]);
                vis[i] = true;
                backtrack(idx + 1, perm);
                vis[i] = false;
                perm.pop();
            }
        }
        nums.sort((x, y) => x - y);
        backtrack(0, []);
        return ans;
    };
    const allArr = permuteUnique(arr)
    const allFu = permuteUnique(operator)
    // console.log(allArr, allFu)
    let res = []
    let flag = false
    let err = false
    let err2 = false

    let level = 1
    while (level < 3) {
        let beforeAllcho = []
        let allcho = []

        if (level === 2) {
            const cho = []
            operator.map((_, index) => {
                cho.push(index)
            })
            beforeAllcho = permuteUnique(cho)
            allcho = permuteUnique(cho)
            allcho = allcho.map(ch => {
                for (let i = 0; i < ch.length; i++) {
                    for (let j = i + 1; j < ch.length; j++) {
                        if (ch[j] > ch[i]) {
                            ch[j]--
                        }
                    }
                }
                return ch
            })
        } else if (level === 1) {
            allcho = permuteUnique(['合并', '加减', '乘除'])
        }

        if (flag) {
            break
        }

        for (let ii = 0; ii < allArr.length; ii++) {
            const curArr = allArr[ii]
            if (flag) break
            for (let jj = 0; jj < allFu.length; jj++) {
                const curFu = allFu[jj]
                if (flag) break

                const shunxu = (curArr, curFu) => {
                    let count = curArr[0]
                    for (let i = 0; i < curArr.length - 1; i++) {
                        if (curFu[i] === '' && `${count}${curFu[i]}${curArr[i + 1]}`.startsWith('0')) {
                            count = ''
                        }
                        if (curFu[i] === '/' && curArr[i + 1] === 0) {
                            err = true
                            break
                        }
                        if (curFu[i] === '-' && eval(`${count}${curFu[i]}${curArr[i + 1]}`) < 0) {
                            err = true
                            break
                        }
                        count = eval(`${count}${curFu[i]}${curArr[i + 1]}`)
                        if (String(count).includes('.')) {
                            err = true
                            break
                        }
                    }
                    if (err) {
                        err = false
                        return
                    }
                    if (count === target) {
                        const curArrRes = JSON.parse(JSON.stringify(curArr))
                        const curFuRes = JSON.parse(JSON.stringify(curFu))
                        while (curArrRes.length) {
                            res.push(curArrRes.shift())
                            res.push(curFuRes.shift())
                        }
                        res.pop()
                        // res.push('或')
                        flag = true
                    }
                }
                shunxu(curArr, curFu)
                if (flag) break

                const bin = (x, y) => {
                    while (y.includes('')) {
                        const index = y.findIndex(cur => cur === '')
                        const add = x[index] === 0 ? x[index + 1] : eval(`${x[index]}${x[index + 1]}`)
                        y.splice(index, 1)
                        x.splice(index, 2, add)
                        shunxu(x, y)
                        if (flag) {
                            break
                        }
                    }
                }

                const chenchu = (x, y) => {
                    while (y.includes('*') || y.includes('/')) {
                        const index = y.findIndex(cur => cur === '*' || cur === '/')
                        if (y[index] === '/' && x[index + 1] === 0) {
                            err2 = true
                            break
                        } else {
                            const add = eval(`${x[index]}${y[index]}${x[index + 1]}`)
                            if (String(add).includes('.')) {
                                err2 = true
                                break
                            } else {
                                y.splice(index, 1)
                                x.splice(index, 2, add)
                                shunxu(x, y)
                                if (flag) {
                                    break
                                }
                            }
                        }
                    }
                }

                const jiajian = (x, y) => {
                    while (y.includes('+') || y.includes('-')) {
                        const index = y.findIndex(cur => cur === '+' || cur === '-')
                        const add = eval(`${x[index]}${y[index]}${x[index + 1]}`)
                        if (add < 0) {
                            err2 = true
                            break
                        } else {
                            y.splice(index, 1)
                            x.splice(index, 2, add)
                            shunxu(x, y)
                            if (flag) {
                                break
                            }
                        }
                    }
                }

                if (level === 2) {
                    for (let iii = 0; iii < allcho.length; iii++) {
                        const x = JSON.parse(JSON.stringify(curArr))
                        const y = JSON.parse(JSON.stringify(curFu))
                        // console.log(x, y)
                        const cur = allcho[iii]
                        for (let jjj = 0; jjj < cur.length; jjj++) {
                            // if (err) break
                            let index = cur[jjj]
                            const guize = y[index]
                            // console.log(index, curFu, guize)
                            let add = 0
                            if (guize === '') {
                                add = x[index] === 0 ? x[index + 1] : eval(`${x[index]}${x[index + 1]}`)
                            } else if (guize === '+') {
                                add = eval(`${x[index]}+${x[index + 1]}`)
                            } else if (guize === '-') {
                                add = eval(`${x[index]}-${x[index + 1]}`)
                                if (add < 0) {
                                    err2 = true
                                    break
                                }
                            } else if (guize === '/') {
                                if (x[index + 1] === 0) {
                                    err2 = true
                                    break
                                }
                                add = eval(`${x[index]}/${x[index + 1]}`)
                                if (String(add).includes('.')) {
                                    err2 = true
                                    break
                                }
                            } else {
                                add = eval(`${x[index]}*${x[index + 1]}`)
                            }
                            y.splice(index, 1)
                            x.splice(index, 2, add)
                            shunxu(x, y)
                            if (flag) {
                                const re = []
                                const curArrRes = JSON.parse(JSON.stringify(curArr))
                                const curFuRes = JSON.parse(JSON.stringify(curFu))
                                while (curArrRes.length) {
                                    re.push(curArrRes.shift())
                                    re.push(curFuRes.shift())
                                }
                                re.pop()
                                console.log(re)
                                console.log('先使用以上内容按照以下顺序运算，直到与最终表达式相同停止(空字符串代表合并)')

                                const curFuRes2 = JSON.parse(JSON.stringify(curFu))
                                const buzhou = cur.map(i => {
                                    let z = curFuRes2[i]
                                    curFuRes2.splice(i, 1)
                                    return z
                                })
                                const buzhoures = {
                                    operator: buzhou,
                                    index: beforeAllcho[iii].map(cur => `位置${cur + 1}`)
                                }
                                console.log(buzhoures)
                                break
                            }
                        }
                        if (err2) {
                            err2 = false
                            continue
                        }
                        if (flag) break
                    }
                } else if (level === 1) {
                    for (let iii = 0; iii < allcho.length; iii++) {
                        if (flag)
                            break
                        const x = JSON.parse(JSON.stringify(curArr))
                        const y = JSON.parse(JSON.stringify(curFu))
                        const cur = allcho[iii]
                        for (let jjj = 0; jjj < cur.length; jjj++) {
                            const guize = cur[jjj]
                            if (guize === '合并') {
                                bin(x, y)
                            } else if (guize === '乘除') {
                                chenchu(x, y)
                            } else {
                                jiajian(x, y)
                            }
                            if (flag) {
                                const re = []
                                const curArrRes = JSON.parse(JSON.stringify(curArr))
                                const curFuRes = JSON.parse(JSON.stringify(curFu))
                                while (curArrRes.length) {
                                    re.push(curArrRes.shift())
                                    re.push(curFuRes.shift())
                                }
                                re.pop()
                                console.log(re)
                                console.log('先使用以上内容按照以下顺序运算，直到与最终表达式相同停止(空字符串代表合并)')
                                console.log(cur)
                                break
                            }
                            if (err2) {
                                err2 = false
                                break
                            }
                        }
                    }
                }
            }
        }
        level++
    }

    console.log('最终表达式：')
    console.log(res)
    console.log('最终表达式从左至右计算即可得到结果')
}

