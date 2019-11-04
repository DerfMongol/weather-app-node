const getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Viking'
    }

    setTimeout(() => {
        callback(user)
    }, 3000)
}

getUser(543, (userObject) => {
    console.log(userObject)
})