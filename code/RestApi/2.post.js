const getUsers = async (userData) => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5&_page=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const newUser = await res.json()
        return newUser
    } catch (error) {
        console.log(error);
    }
}

const showRes = async () => {
    try {
        const data = await getUsers({
            name: 'idk',
            age: 23,
            email: 'example@mail.com'
        })

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

showRes()