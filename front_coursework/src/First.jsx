import React, { useState } from 'react';
import Project from "./project";
import {Link, useNavigate} from 'react-router-dom';
import main from "./Main";
import "./First.css"

const MyForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setpatronymic] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [description, setdescription] = useState('');
    const [logavt,setlogavt ] = useState(true);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/user/register', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    login: login,
                    surname:surname,
                    patronymic:patronymic,
                    description:description
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }else {
                const result = await response.json();
                console.log('Success:', result);
                localStorage.setItem("id",result[0])
                localStorage.setItem("jwt",result[1])
                localStorage.setItem("admin",result[2])
                localStorage.setItem("sci",result[3])
                navigate('/main')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/user/avtorization', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    login: login,
                    surname:surname,
                    patronymic:patronymic,
                    description:description
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }else {
                const result = await response.json();
                console.log('Success:', result);
                localStorage.setItem("id",result[0])
                localStorage.setItem("jwt",result[1])
                localStorage.setItem("admin",result[2])
                localStorage.setItem("sci",result[3])
                navigate('/main')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={()=>{setlogavt(true)}}>Зарегистрироваться</button>
            <button onClick={()=>{setlogavt(false)}}>Войти</button>
            <form>
                <label>
                    {logavt? <>
                        Имя:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                        Фамилия:
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                        Отчество:
                        <input type="text" value={patronymic} onChange={(e) => setpatronymic(e.target.value)} required/></>:<></>}
                    Логин:
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required/>
                    Пароль:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    {logavt? <>
                    Описание:
                    <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} required/></>:<></>}
                </label>
                {logavt?
                <button type="submit" onClick={handleSubmit}>Зарегистрироваться</button>:
                <button type="submit" onClick={handleSubmit2}>Войти</button>}
            </form>
        </div>
    );
};

export default MyForm;