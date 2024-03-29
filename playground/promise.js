const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b)
            } else {
                reject('Arguments must be numbers')
            }
        }, 1500)
    })
}

asyncAdd(56, 44).then((res) => {
    console.log('Results:', res)
    return asyncAdd(res, 33)
}).then((res) => {
    console.log('Should be 133', res)
}).catch((errorMessage) => {
    console.log(errorMessage);
})

// const somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//        resolve('Hey. It worked!') 
//     //    reject('Unable to fulfull promise')
//     }, 2500)
    
// })

// somePromise.then((message) => {
//     console.log('Success:', message)
// }, (errorMessage) => {
//     console.log('Error:', errorMessage)
// })