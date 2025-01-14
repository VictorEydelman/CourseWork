import React, { useEffect, useState } from 'react';
import Create from "./Create";
import Project from "./project";
import Profile from "./Profile";
import "./Main.css"
import {useNavigate} from "react-router-dom";
import Profile_update from "./Profile_update";
const Main = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [mentor, setmentor] = useState('');
    const [person_concemed, setperson_concemed] = useState('');
    const [description, setdescription] = useState('');
    const [Approval, setApproval] = useState('');
    const [studentsSelected, setstudentsSelected] = useState('');
    const [project_stages, setproject_stages] = useState('');
    const [project_objectives, setproject_objectives] = useState('');
    const [project_purposes, setproject_purposes] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [scientific_supervisor, setscientific_supervisor] = useState([]);
    const [selectedscientific_supervisor, setSelectedscientific_supervisor] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [objective, setobjective] = useState('');
    const [objectives, setobjectives] = useState([]);
    const [purpose, setpurpose] = useState('');
    const [notification, setnotification] = useState([]);
    const [file, setFile] = useState(null);
    const [stage,setStage] = useState('')
    const [pro,setpro] = useState(false)

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [project_id,setproject_id] = useState(0);
    const [page,setpage]=useState(true);
    const [updateprofile,setupdateprofile]=useState(false);
    const navigate = useNavigate();
    const [searchTermstu, setSearchTermstu] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:9876/api/user/getusers', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {throw new Error('Network response was not ok');
                }else {
                    const result = await response.json(); // Получаем ответ в формате JSON
                    setStudents(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            try {
                const response = await fetch('http://localhost:9876/api/project/getnotification', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                    }
                });
                if (!response.ok) {throw new Error('Network response was not ok');
                }else {
                    const result = await response.json();
                    setnotification(result)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchStudents();
        const intervalId = setInterval(fetchStudents, 3000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {

        const fetchSci = async () => {
            try {
                const response = await fetch('http://localhost:9876/api/user/get_scientific_supervisor', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) {throw new Error('Network response was not ok');
                }else {
                    const result = await response.json();

                    setscientific_supervisor(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSci();

        const intervalI = setInterval(fetchSci, 3000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalI);
    }, []);
    useEffect(() => {

    }, []);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:9876/api/project/getbyuser', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                    }
                });
                if (!response.ok) {throw new Error('Network response was not ok');
                }else {
                    const result = await response.json();
                    setProjects(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProjects();
        const intervalId = setInterval(fetchProjects, 3000);
        return () => clearInterval(intervalId);
    }, []);
    const projectItems = [];
    projectItems.push(<li onClick={() =>{setpage(true)}}>
        Главная
    </li>)
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        projectItems.push(
            <p key={project.id} onClick={() => selproject(project)}>
                {project.name}
            </p>
        );
    }

    const selproject = async (project) => {
        setpage(false)
        setSelectedProject(project)
        setproject_id(project.id)
    }
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTerm.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    const set= (student)=>{
        setpro(true)
        setstudentsSelected(student)
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [isOpennot, setIsOpennot] = useState(false);

    const toggleDropdownnot = () => {
        setIsOpennot(!isOpennot);
    };

    const handleSelect = (student) => {
        set(student);
        setIsOpen(false); // Закрываем выпадающий список после выбора
    };
    const SciSub = async (id) => {
        try {
            const response = await fetch(`http://localhost:9876/api/project/scientific_supervisor/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const AdmSub = async (id) => {
        try {
            const response = await fetch(`http://localhost:9876/api/project/admin/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const date= (data)=>{
        const date = new Date(data);

        // Форматирование даты
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
        return date.toLocaleString('ru-RU', options);
    }
    return (
        <div>
            <div className='men'>
            <button onClick={() => {
                localStorage.setItem("id", '')
                localStorage.setItem("jwt", '')
                localStorage.setItem("admin", '')
                localStorage.setItem("sci", '')
                navigate('/')
            }}>Выйти
            </button>
            <div style={{position: 'relative',left:'30%', width: '100px'}}>
                <button onClick={toggleDropdown}>
                    Поиск людей</button>
                {isOpen && (
                    <div style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        position: 'absolute',
                        backgroundColor: 'white',
                        zIndex: 1
                    }}>
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredStudents.map(student => (
                            <div key={student.id} style={{padding: '5px', cursor: 'pointer'}}>
                                {student.surname}
                                {student.name}
                                {student.patronymic}
                                <button onClick={(e) => {
                                    handleSelect(student);
                                }}>Профиль
                                </button>
                                {localStorage.getItem("admin") === 'true' ? <>
                                    <button onClick={() => {
                                        SciSub(student.id)
                                    }}>Научный руководитель
                                    </button>
                                    <button onClick={() => {
                                        AdmSub(student.id)
                                    }}>Админ
                                    </button>
                                </> : <></>
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {(localStorage.getItem("sci")==="true")?
            <div style={{position: 'relative',left:'27%', width: '100px'}}>
                <button onClick={toggleDropdownnot}>
                    Уведомления
                </button>
                {isOpennot && (
                    <div style={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        position: 'absolute',
                        backgroundColor: 'white',
                        zIndex: 1
                    }}>
                        {notification.map(notification => (
                            <div onClick={() => selproject(notification.project)} key={notification.id} style={{padding: '5px', cursor: 'pointer'}}>
                                {notification.description}<br/>
                                {date(notification.date)}
                            </div>
                        ))}
                    </div>
                )}
            </div>:<></>}
            {(!updateprofile) ? <button onClick={() => setupdateprofile(true)}>Редактирование профиля</button> :
                <button onClick={() => setupdateprofile(false)}>Закрыть</button>}

            <ul>
                {projectItems}
            </ul>
            </div>
            <ul className='projectblock'>
            {!updateprofile ? <>
                {pro ? <p>
                        <button onClick={() => setpro(false)}>Закрыть</button>
                        <Profile student={studentsSelected}/></p> :
                    <p>{page ? <Create/> : <Project selectedProject={selectedProject} projectId={project_id}/>}</p>}
            </> : <Profile_update
                student={students.find(student => student.id === parseInt(localStorage.getItem("id")))}/>}
            </ul>
        </div>
    );
};

export default Main;