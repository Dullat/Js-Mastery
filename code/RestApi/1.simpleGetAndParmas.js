const getUsers = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
            throw new Error(`Error occured: ${res.status}`);
        }

        const users = await res.json();
        return users
    } catch (err) {
        console.log(`Error while fetching users: ${err}`)
        throw err // to be handled by the caller
    }
}

// getUsers()
//     .then((users) => {
//         console.log(users)
//     })
//     .catch(error => {
//         console.log(error)
//     })

// using URLSearchParams

const getUsersByQuery = async (limit = 5, page = 1) => {
    try {
        const parmas = new URLSearchParams({
            _limit: limit,
            _page: page,
        });
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?${parmas}`)

        if (!res.ok) {
            throw new Error(res.status)
        }

        const users = await res.json()
        return users

    } catch (error) {
        console.log(error)
        throw error
    }
}

async function printUsers(){
    try{
        const users = await getUsersByQuery()
        console.log(`users loaded`)
    }catch(error){
        console.log(error, "from caller")
    }
}

// printUsers()