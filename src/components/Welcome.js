import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Welcome(){
    const history = useHistory()
    const [dataUser, setDataUser] = useState([])
    const [user, setUser] = useState({
        username: "",
        password:"",
        favorites: []
    })

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(auth => {
            setDataUser(auth);
        })
    }, [])

    console.log(dataUser)
    const handleSubmit = (e) => {
        e.preventDefault();
        dataUser.forEach(data => {
            if(user.username === data.username){
                history.push("/home")
            }
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <div className='container-fluid'>
            <div className='col-lg-6'></div>
            <div className='loginDiv col-lg-6'>
                <div className='login'>
                    <h3 className='welcomeHeader'>Listen at home, or in person</h3>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange}name="username"className='loginHome' placeholder='Username' type="text" ></input>
                        <input onChange={handleChange}name="password"className='loginHome'placeholder='Password' type="password" ></input>
                        <div className=' btnDiv col-md-3'>
                            <button type="submit" className="button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Welcome;