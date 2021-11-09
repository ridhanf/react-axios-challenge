import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Login = () => {
    const [ token, setToken ] = useState("");
    const [ userDTO, setUserDTO ] = useState({
        "username": "",
        "password": ""
    });
    
    const login = async (username, password) => {
        await axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        })
            .then((res) => {
                console.log(JSON.stringify(res.data));
                setToken(res.data.token);
            })
            .catch((error) => {
                console.log(error);
                setToken("");
            })
        
    }

    const handleChange = (event) => {
        const { value, id } = event.target;
        setUserDTO(prev => ({...prev, [id]:value}));
    }

    const handleSubmit = (event) => {
        login(userDTO.username, userDTO.password);
        event.preventDefault();
    }
        
    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {
            console.log(token)
        }
    }, [token])

    return (
        <div>
            <h1>
                Login Page
            </h1>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={userDTO.username} onChange={(event) => handleChange(event)} placeholder="username" />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={userDTO.password} onChange={(event) => handleChange(event)} placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
