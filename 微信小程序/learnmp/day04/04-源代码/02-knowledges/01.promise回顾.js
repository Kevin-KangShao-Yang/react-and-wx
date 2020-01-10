setTimeout(() => {
  console.log('中分还带波浪，是不是很萌')
}, 1000);

// 用promise
let p = new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve('中分还带波浪，是不是很萌')
  }, 5000);
})

p.then(res=>{
  console.log(res)
})