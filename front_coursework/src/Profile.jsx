import React, { useEffect, useState } from 'react';
import Create from "./Create";
import Project from "./project";

const Profile = ({student}) => {
    return (
        <div>
            Имя: {student.name}
            <br/>
            Фамилия: {student.surname}
            <br/>
            Отчество: {student.patronymic}
            <br/>
            Описание: {student.description}
        </div>
    );
};

export default Profile;