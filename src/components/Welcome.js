import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";


function Welcome(){
    const[userName, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[dbUser, setDbUser] = useState()
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate()
    const[hide, setHide] = useState(true);
    
    // const createUser = async() => {
    //     await addDoc(usersCollectionRef, { name: newName, password: newPassword });
    // }
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setDbUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dbUser.forEach(data => {
            if(userName === data.name && password === data.password){
                navigate("/home")
            }
        })
    }

        const handleHide = () => {
            setHide(!hide)
        }

    return(
        <div className='container-fluid'>
            <div className='col-lg-6'></div>
            <div className='loginDiv col-lg-6'>
                <div className='login'>
                    <h3 className='welcomeHeader'>Listen at home, or in person</h3>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => {setUserName(e.target.value)}} name="username"className='loginHome' placeholder='Username' type="text" ></input>
                        <input onChange={(e) => {setPassword(e.target.value)}} name="password"className='loginHome'placeholder='Password' type="password" ></input>
                        {hide ? <input onChange={(e) => {setConfirmPassword(e.target.value)}} name="password"className='loginHome'placeholder='Confirm Password' type="password" ></input> : null}
                        <div className=' btnDiv col-md-5'>
                            {hide ? <button type="submit" className="button">Sign Up</button> : <button type="submit" className="button">Login</button>}
                        </div>
                        {hide ? <div style={{ top: '35px', marginTop: '0px', height: '100px', position: 'relative'}}className='btnDiv col-md-7'>
                            <p id='welcomeP'>Already have an account?</p>
                            <a onClick = { handleHide } id='welcomeA'>Login</a>
                        </div> : null}
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Welcome;