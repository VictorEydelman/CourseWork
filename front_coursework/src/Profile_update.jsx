import React, { useEffect, useState } from 'react';
import Create from "./Create";
import Project from "./project";

const Profile = ({student}) => {
    const [name,setname]=useState(student.name);
    const [surname,setsurname]=useState(student.surname);
    const [patronymic,setpatronymic]=useState(student.patronymic);
    const [login,setlogin]=useState(student.login);
    const [password,setpassword]=useState(student.password);
    const [description,setdescription]=useState(student.description);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/project/updateprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    patronymic: patronymic,
                    description: description,
                    login: login,
                    id: student.id
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                //const result = await response.json(); // Получаем ответ в формате JSON
                //console.log('Success:', result);
            }// Обрабатываем успешный ответ
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    }
    return (
        <div>
            Имя:
            <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Введите задачу"
            />
            <br/>
            Фамилия:
            <input
                type="text"
                value={surname}
                onChange={(e) => setsurname(e.target.value)}
                placeholder="Введите задачу"
            />
            <br/>
            Отчество:
            <input
                type="text"
                value={patronymic}
                onChange={(e) => setpatronymic(e.target.value)}
                placeholder="Введите задачу"
            />
            <br/>
            Логин:
            <input
                type="text"
                value={login}
                onChange={(e) => setlogin(e.target.value)}
                placeholder="Введите задачу"
            />
            <br/>
            Описание:
            <input
                type="text"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Введите задачу"
            />
            <br/>
            <button onClick={handleSubmit}>Сохранить</button>
        </div>
    );
};

export default Profile;