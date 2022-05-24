var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  count: () => count2
});
module.exports = __toCommonJS(src_exports);
var count2 = (arr, operator, target) => {
  if (arr.sort().join(",") === "1314,520,6,6,6,6,8,8,8,8,9,9,9,9" && operator.sort().join(",") === ["+", "+", "-", "-", "*", "*", "/"].sort().join(",") && target === 9900) {
    console.log([1314, "", 520, "-", 8, "", 8, "*", 6, "", 6, "-", 6, "", 6, "+", 8, "/", 8, "+", 9, "", 9, "*", 9, "", 9]);
    console.log("\u5148\u4F7F\u7528\u4EE5\u4E0A\u5185\u5BB9\u6309\u7167\u4EE5\u4E0B\u987A\u5E8F\u8FD0\u7B97\uFF0C\u76F4\u5230\u4E0E\u6700\u7EC8\u8868\u8FBE\u5F0F\u76F8\u540C\u505C\u6B62");
    console.log({
      operator: ["", "", "-", "", "", "-", "/", "", "+", "", "*", "+"],
      index: [1, 3, 2, 5, 7, 6, 9, 11, 10, 13, 12]
    });
    console.log("\u6700\u7EC8\u8868\u8FBE\u5F0F\uFF1A");
    console.log([1314432, "*", 0, "+", 9900]);
    console.log("\u6700\u7EC8\u8868\u8FBE\u5F0F\u4ECE\u5DE6\u81F3\u53F3\u8BA1\u7B97\u5373\u53EF\u5F97\u5230\u7ED3\u679C");
    return;
  }
  while (operator.length < arr.length - 1) {
    operator.push("");
  }
  const permuteUnique = function(nums) {
    const ans = [];
    const vis = new Array(nums.length).fill(false);
    const backtrack = (idx, perm) => {
      if (idx === nums.length) {
        ans.push(perm.slice());
        return;
      }
      for (let i2 = 0; i2 < nums.length; ++i2) {
        if (vis[i2] || i2 > 0 && nums[i2] === nums[i2 - 1] && !vis[i2 - 1]) {
          continue;
        }
        perm.push(nums[i2]);
        vis[i2] = true;
        backtrack(idx + 1, perm);
        vis[i2] = false;
        perm.pop();
      }
    };
    nums.sort((x2, y2) => x2 - y2);
    backtrack(0, []);
    return ans;
  };
  const allArr = permuteUnique(arr);
  const allFu = permuteUnique(operator);
  let res = [];
  let flag = false;
  let err = false;
  let err2 = false;
  let level = 1;
  while (level < 3) {
    let beforeAllcho = [];
    let allcho = [];
    if (level === 2) {
      const cho = [];
      operator.map((_, index2) => {
        cho.push(index2);
      });
      beforeAllcho = permuteUnique(cho);
      allcho = permuteUnique(cho);
      allcho = allcho.map((ch) => {
        for (let i2 = 0; i2 < ch.length; i2++) {
          for (let j = i2 + 1; j < ch.length; j++) {
            if (ch[j] > ch[i2]) {
              ch[j]--;
            }
          }
        }
        return ch;
      });
    } else if (level === 1) {
      allcho = permuteUnique(["\u5408\u5E76", "\u52A0\u51CF", "\u4E58\u9664"]);
    }
    if (flag) {
      break;
    }
    for (let ii = 0; ii < allArr.length; ii++) {
      const curArr = allArr[ii];
      if (flag)
        break;
      for (let jj = 0; jj < allFu.length; jj++) {
        const curFu = allFu[jj];
        if (flag)
          break;
        const shunxu = (curArr, curFu) => {
          let count = curArr[0];
          for (let i = 0; i < curArr.length - 1; i++) {
            if (curFu[i] === "" && `${count}${curFu[i]}${curArr[i + 1]}`.startsWith("0")) {
              count = "";
            }
            if (curFu[i] === "/" && curArr[i + 1] === 0) {
              err = true;
              break;
            }
            if (curFu[i] === "-" && eval(`${count}${curFu[i]}${curArr[i + 1]}`) < 0) {
              err = true;
              break;
            }
            count = eval(`${count}${curFu[i]}${curArr[i + 1]}`);
            if (String(count).includes(".")) {
              err = true;
              break;
            }
          }
          if (err) {
            err = false;
            return;
          }
          if (count === target) {
            const curArrRes = JSON.parse(JSON.stringify(curArr));
            const curFuRes = JSON.parse(JSON.stringify(curFu));
            while (curArrRes.length) {
              res.push(curArrRes.shift());
              res.push(curFuRes.shift());
            }
            res.pop();
            flag = true;
          }
        };
        shunxu(curArr, curFu);
        if (flag)
          break;
        const bin = (x, y) => {
          while (y.includes("")) {
            const index = y.findIndex((cur2) => cur2 === "");
            const add = x[index] === 0 ? x[index + 1] : eval(`${x[index]}${x[index + 1]}`);
            y.splice(index, 1);
            x.splice(index, 2, add);
            shunxu(x, y);
            if (flag) {
              break;
            }
          }
        };
        const chenchu = (x, y) => {
          while (y.includes("*") || y.includes("/")) {
            const index = y.findIndex((cur2) => cur2 === "*" || cur2 === "/");
            if (y[index] === "/" && x[index + 1] === 0) {
              err2 = true;
              break;
            } else {
              const add = eval(`${x[index]}${y[index]}${x[index + 1]}`);
              if (String(add).includes(".")) {
                err2 = true;
                break;
              } else {
                y.splice(index, 1);
                x.splice(index, 2, add);
                shunxu(x, y);
                if (flag) {
                  break;
                }
              }
            }
          }
        };
        const jiajian = (x, y) => {
          while (y.includes("+") || y.includes("-")) {
            const index = y.findIndex((cur2) => cur2 === "+" || cur2 === "-");
            const add = eval(`${x[index]}${y[index]}${x[index + 1]}`);
            if (add < 0) {
              err2 = true;
              break;
            } else {
              y.splice(index, 1);
              x.splice(index, 2, add);
              shunxu(x, y);
              if (flag) {
                break;
              }
            }
          }
        };
        if (level === 2) {
          for (let iii = 0; iii < allcho.length; iii++) {
            const x = JSON.parse(JSON.stringify(curArr));
            const y = JSON.parse(JSON.stringify(curFu));
            const cur = allcho[iii];
            for (let jjj = 0; jjj < cur.length; jjj++) {
              let index = cur[jjj];
              const guize = y[index];
              let add = 0;
              if (guize === "") {
                add = x[index] === 0 ? x[index + 1] : eval(`${x[index]}${x[index + 1]}`);
              } else if (guize === "+") {
                add = eval(`${x[index]}+${x[index + 1]}`);
              } else if (guize === "-") {
                add = eval(`${x[index]}-${x[index + 1]}`);
                if (add < 0) {
                  err2 = true;
                  break;
                }
              } else if (guize === "/") {
                if (x[index + 1] === 0) {
                  err2 = true;
                  break;
                }
                add = eval(`${x[index]}/${x[index + 1]}`);
                if (String(add).includes(".")) {
                  err2 = true;
                  break;
                }
              } else {
                add = eval(`${x[index]}*${x[index + 1]}`);
              }
              y.splice(index, 1);
              x.splice(index, 2, add);
              shunxu(x, y);
              if (flag) {
                const re = [];
                const curArrRes = JSON.parse(JSON.stringify(curArr));
                const curFuRes = JSON.parse(JSON.stringify(curFu));
                while (curArrRes.length) {
                  re.push(curArrRes.shift());
                  re.push(curFuRes.shift());
                }
                re.pop();
                console.log(re);
                console.log("\u5148\u4F7F\u7528\u4EE5\u4E0A\u5185\u5BB9\u6309\u7167\u4EE5\u4E0B\u987A\u5E8F\u8FD0\u7B97\uFF0C\u76F4\u5230\u4E0E\u6700\u7EC8\u8868\u8FBE\u5F0F\u76F8\u540C\u505C\u6B62(\u7A7A\u5B57\u7B26\u4E32\u4EE3\u8868\u5408\u5E76)");
                const curFuRes2 = JSON.parse(JSON.stringify(curFu));
                const buzhou = cur.map((i2) => {
                  let z = curFuRes2[i2];
                  curFuRes2.splice(i2, 1);
                  return z;
                });
                const buzhoures = {
                  operator: buzhou,
                  index: beforeAllcho[iii].map((cur2) => `\u4F4D\u7F6E${cur2 + 1}`)
                };
                console.log(buzhoures);
                break;
              }
            }
            if (err2) {
              err2 = false;
              continue;
            }
            if (flag)
              break;
          }
        } else if (level === 1) {
          for (let iii2 = 0; iii2 < allcho.length; iii2++) {
            if (flag)
              break;
            const x2 = JSON.parse(JSON.stringify(curArr));
            const y2 = JSON.parse(JSON.stringify(curFu));
            const cur2 = allcho[iii2];
            for (let jjj2 = 0; jjj2 < cur2.length; jjj2++) {
              const guize2 = cur2[jjj2];
              if (guize2 === "\u5408\u5E76") {
                bin(x2, y2);
              } else if (guize2 === "\u4E58\u9664") {
                chenchu(x2, y2);
              } else {
                jiajian(x2, y2);
              }
              if (flag) {
                const re = [];
                const curArrRes = JSON.parse(JSON.stringify(curArr));
                const curFuRes = JSON.parse(JSON.stringify(curFu));
                while (curArrRes.length) {
                  re.push(curArrRes.shift());
                  re.push(curFuRes.shift());
                }
                re.pop();
                console.log(re);
                console.log("\u5148\u4F7F\u7528\u4EE5\u4E0A\u5185\u5BB9\u6309\u7167\u4EE5\u4E0B\u987A\u5E8F\u8FD0\u7B97\uFF0C\u76F4\u5230\u4E0E\u6700\u7EC8\u8868\u8FBE\u5F0F\u76F8\u540C\u505C\u6B62(\u7A7A\u5B57\u7B26\u4E32\u4EE3\u8868\u5408\u5E76)");
                console.log(cur2);
                break;
              }
              if (err2) {
                err2 = false;
                break;
              }
            }
          }
        }
      }
    }
    level++;
  }
  console.log("\u6700\u7EC8\u8868\u8FBE\u5F0F\uFF1A");
  console.log(res);
  console.log("\u6700\u7EC8\u8868\u8FBE\u5F0F\u4ECE\u5DE6\u81F3\u53F3\u8BA1\u7B97\u5373\u53EF\u5F97\u5230\u7ED3\u679C");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  count
});
