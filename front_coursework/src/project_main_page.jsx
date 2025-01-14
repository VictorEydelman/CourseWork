import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const Projects = ({selectedProject, projectId}) => {
    const [projects, setProjects] = useState(selectedProject);
    const [project_id, setproject_id] = useState(projectId);
    const [sci, setsci] = useState(localStorage.getItem("sci"))
    const [stages, setstages] = useState([]);
    const [stagesci, setStagesci] = useState('')
    const [objective, setobjective] = useState([])
    const [purpose, setpurpose] = useState([])
    const [stagessci, setStagessci] = useState([])
    const [selectedmentor, setselectedmentor] = useState('')
    const [selectedperson_concemed, setselectedperson_concemed] = useState("")
    const [Objectives, setObjectives] = useState({})
    const [student, setStudents] = useState([])
    const [studentadd,setstudentadd]=useState(false)
    const [studentsci,setstudentsci]=useState(false)
    const [studentmentor,setstudentmentor]=useState(false)
    const [studentper,setstudentper]=useState(false)
    const [reduction,setreduction]=useState(false)
    const [Deadline, setDeadline] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermstu, setSearchTermstu] = useState('');
    const [searchTermsci, setSearchTermsci] = useState('');
    const [searchTermscien, setSearchTermscien] = useState('');
    const [searchTermmentor, setSearchTermmentor] = useState('');
    const [searchTermper, setSearchTermper] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedSci, setSelectedSci] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');
    const [selectedPer, setSelectedPer] = useState('');


    useEffect(() => {
        const fetchStage8 = async () => {
            try {
                const response = await fetch(`http://localhost:9876/api/project/getbyid/${projectId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const result = await response.json();
                    setProjects(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            try {
                const response = await fetch(`http://localhost:9876/api/project/getproject_objectives/${projectId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const result = await response.json();
                    setobjective(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            try {
                const response = await fetch(`http://localhost:9876/api/project/getproject_purposes/${projectId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const result = await response.json();
                    setpurpose(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            try {
                const response = await fetch('http://localhost:9876/api/user/getusers', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',}
                });
                if (!response.ok) {throw new Error('Network response was not ok');
                }else {
                    const result = await response.json(); // Получаем ответ в формате JSON
                    setStudents(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchStage8();
        const intervalId = setInterval(fetchStage8, 3000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [projectId]);

    const approvalSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9876/api/project/approval', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: projectId,
                    project_stages: stagessci,
                    mentor: selectedmentor,
                    person_concemed: selectedperson_concemed,
                    approval: true
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setStagessci([])
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const updatestudent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/project/updatestudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: projectId,
                    students_id:selectedStudents
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const updatesci = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/project/updatesci', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: projectId,
                    scientific_supervisor:selectedSci
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const updatementor = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/project/updatementor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: projectId,
                    mentor:selectedMentor
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const updateper = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/project/updateper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: projectId,
                    person_concemed:selectedPer
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddstage = (e) => {
        e.preventDefault();
        if (stagesci.trim()) {
            const sqlDate = new Date(Deadline).toISOString().split('T')[0];
            const newItem = {
                name: stagesci,
                deadline: sqlDate,
                objectives: []
            };

            setStagessci([...stagessci, newItem]);

            setStagesci('');
            setDeadline('');
        }
    };
    const handleAddObjective = (e,index) => {
        e.preventDefault()
        const objectiveName = Objectives[index]; // Получаем название цели из состояния
        if (objectiveName) {
            const updatedStagesci = [...stagessci];
            updatedStagesci[index].objectives.push(objectiveName); // Добавляем цель к этапу
            setStagessci(updatedStagesci);
            setObjectives({ ...Objectives, [index]: '' }); // Очищаем поле ввода для целей
        }

    };
    const objectiveItems = [];
    for (let i = 0; i < objective.length; i++) {
        const objectiveElement = objective[i];
        objectiveItems.push(
            <li key={objectiveElement.id}>
                {objectiveElement.description}
            </li>
        );
    }
    const purposeItems = [];
    for (let i = 0; i < purpose.length; i++) {
        const purposeElement = purpose[i];
        purposeItems.push(
            <li key={purposeElement.id}>
                {purposeElement.description}
            </li>
        );
    }

    const handleRemovesci = (index) => {
        setStagessci(stagessci.filter((_, i) => i !== index));
    };
    const handleObjectiveChange = (index, value) => {
        setObjectives({ ...Objectives, [index]: value }); // Обновляем состояние для целей
    };
    /*const filteredStudents = student.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );*/
    const stupro=[]
    for (let i = 0; i < projects.students.length; i++) {
        const stuproe =  projects.students[i];
        stupro.push(
            <li key={stuproe.id}>
                {stuproe.surname} {stuproe.name} {stuproe.patronymic}
            </li>
        );
    }
    const filteredStudents = student.filter(student =>
        student.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTerm.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    const filteredscientific_supervisor = student.filter(student =>
        student.name.toLowerCase().startsWith(searchTermsci.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTermsci.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTermsci.toLowerCase())
    );
    const filteredStu = student.filter(student =>
        student.name.toLowerCase().startsWith(searchTermstu.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTermstu.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTermstu.toLowerCase())
    );
    const filteredSci = student.filter(student =>
        student.name.toLowerCase().startsWith(searchTermsci.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTermsci.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTermsci.toLowerCase())
    );
    const filteredMentor = student.filter(student =>
        student.name.toLowerCase().startsWith(searchTermmentor.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTermmentor.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTermmentor.toLowerCase())
    );
    const filteredPer = student.filter(student =>
        student.name.toLowerCase().startsWith(searchTermper.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTermper.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTermper.toLowerCase())
    );
    const handleSelectStudent = (id) => {
        if (selectedStudents!==id) {
            setSelectedStudents(prevSelected =>
                prevSelected.includes(id) ? prevSelected.filter(sid => sid !== id) : [...prevSelected, id]
            );
        }else {
            setSelectedStudents(prevSelected => prevSelected.filter(sid => sid !== id));
        }
    }
    useEffect(() => {
        setStagessci([])
        setStagesci("")
        setreduction(false)
    }, [projects.id]);
    console.log(projects,localStorage.getItem("id"))
    return (
        <div>
            {projects && (
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h2 style={{overflow: 'hidden', margin: 0,marginLeft:'40%'}}>Название: {projects.name}</h2>
                        {(projects.approval && (projects.scientific_supervisor_user_id.id.toString() === localStorage.getItem("id"))) ?
                            <button
                                style={{overflow: 'hidden'}}
                                onClick={() => {
                                    (reduction) ? setreduction(false) : setreduction(true)}}>
                                Редактировать
                            </button>
                            : null}
                    </div>
                    <div className="pe">
                        Студенты
                        <p>{stupro}</p>
                        {reduction ? <>
                            <button onClick={() => {
                                (studentadd) ? setstudentadd(false) : setstudentadd(true)
                            }}><FontAwesomeIcon icon={faSync} spin/>
                            </button>
                            {studentadd ? <>
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    value={searchTermstu}
                                    onChange={(e) => setSearchTermstu(e.target.value)}
                                />
                                <div style={{maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc'}}>
                                    {filteredStu.map(student => (
                                        <div key={student.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student.id)}
                                                    onChange={() => handleSelectStudent(student.id)}
                                                />
                                                {student.surname} {student.name} {student.patronymic}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={updatestudent}>Обновить</button>
                            </> : <></>}
                        </>:<></>}
                        <br/>
                        Научный руководитель
                        <p>{projects.scientific_supervisor_user_id.surname} {projects.scientific_supervisor_user_id.name} {projects.scientific_supervisor_user_id.patronymic}</p>
                        {reduction?<>
                            <button onClick={() => {
                                (studentsci) ? setstudentsci(false) : setstudentsci(true)
                            }}><FontAwesomeIcon icon={faSync} spin />
                            </button>
                            {studentsci ? <>
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    value={searchTermscien}
                                    onChange={(e) => setSearchTermscien(e.target.value)}
                                />
                                <div style={{maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc'}}>
                                    {filteredSci.map(student => (
                                        <div key={student.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSci === student.id}
                                                    onChange={() => {
                                                        (selectedSci !== student.id) ? setSelectedSci(student.id) : setSelectedSci(null)
                                                    }}
                                                />
                                                {student.surname} {student.name} {student.patronymic}</label>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={updatesci}>Обновить</button>
                            </> : <></>}
                        </>:<></>}
                        <br/>
                        {projects.approval?<>
                            Ментор
                            <p>{projects.mentor_user_id.surname} {projects.mentor_user_id.name} {projects.mentor_user_id.patronymic}</p>
                            {reduction?<>
                                <button onClick={() => {
                                    (studentmentor) ? setstudentmentor(false) : setstudentmentor(true)
                                }}><FontAwesomeIcon icon={faSync} spin />
                                </button>
                                {studentmentor ? <>
                                    <input
                                        type="text"
                                        placeholder="Поиск"
                                        value={searchTermmentor}
                                        onChange={(e) => setSearchTermmentor(e.target.value)}
                                    />
                                    <div style={{maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc'}}>
                                        {filteredMentor.map(student => (
                                            <div key={student.id}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedMentor === student.id}
                                                        onChange={() => {
                                                            (selectedMentor !== student.id) ? setSelectedMentor(student.id) : setSelectedMentor(null)
                                                        }}
                                                    />
                                                    {student.surname} {student.name} {student.patronymic}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={updatementor}>Обновить</button>
                                </>:<></>}

                            </> : <></>}
                            <br/>
                            Заинтересованный человек
                            {(projects.person_concemed_user_id!==null)?
                            <p>{projects.person_concemed_user_id.surname} {projects.person_concemed_user_id.name} {projects.person_concemed_user_id.patronymic}</p>
                                :<></>}
                            {reduction?<>
                                <button onClick={() => {
                                    (studentper) ? setstudentper(false) : setstudentper(true)
                                }}><FontAwesomeIcon icon={faSync} spin />
                                </button>
                                {studentper ? <>
                                    <input
                                        type="text"
                                        placeholder="Поиск"
                                        value={searchTermper}
                                        onChange={(e) => setSearchTermper(e.target.value)}
                                    />
                                    <div style={{maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc'}}>
                                        {filteredPer.map(student => (
                                            <div key={student.id}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPer === student.id}
                                                        onChange={() => {
                                                            (selectedPer !== student.id) ? setSelectedPer(student.id) : setSelectedPer(null)
                                                        }}
                                                    />
                                                    {student.surname} {student.name} {student.patronymic}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={updateper}>Обновить</button>
                                </>:<></>}
                            </> : <></>}</>:<></>}
                        <br/>
                    </div>
                    <div className="op">
                    <p>Описание {projects.description}</p>

                    Задачи
                    <ul>
                        {objectiveItems}
                    </ul>
                    Цели
                    <ul>
                        {purposeItems}
                    </ul>
                    </div>
                </div>
            )}
            <div className="op">
                {((sci === 'true') && (reduction || (!projects.approval))) ? <div>
                    <form>
                        <form>
                            Укажите этапы:
                            <input
                            type="text"
                            value={stagesci}
                            onChange={(e) => setStagesci(e.target.value)}
                            placeholder="Введите этап"
                        />
                        <input
                            type="date"
                            value={Deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            placeholder="Введите дедлайн"
                        />
                        <button type="submit" disabled={stagesci==="" || Deadline===""} onClick={handleAddstage}>Добавить</button>
                    </form>
                    <ul>
                        {stagessci.map((t, index) => (
                            <li key={index}>Название: {t.name}, Дедлайн: {t.deadline}
                                <input
                                    type="text"
                                    value={Objectives[index] || ''}
                                    onChange={(e) => {
                                        handleObjectiveChange(index, e.target.value)
                                    }}
                                    placeholder="Введите задачи"
                                />
                                <button type="submit" onClick={(e) => handleAddObjective(e, index)}>Добавить</button>
                                <ul>
                                    {t.objectives.map((obj, objIndex) => (
                                        <li key={objIndex}>{obj}</li>
                                    ))}
                                </ul>
                                <button onClick={() => handleRemovesci(index)}>Удалить</button>

                            </li>
                        ))}
                    </ul>
                        {(!projects.approval)?<>
                    Укажите ментора:
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredStudents.map(student => (
                        <div key={student.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedmentor === (student.id)}
                                    onChange={() => {(selectedmentor!==student.id)?setselectedmentor(student.id):setselectedmentor(null)}}
                                />
                                {student.surname} {student.name} {student.patronymic}
                            </label>
                        </div>
                    ))}
                    Укажите заинтересованное лицо
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchTermsci}
                        onChange={(e) => setSearchTermsci(e.target.value)}
                    />
                    {filteredscientific_supervisor.map(student => (
                        <div key={student.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedperson_concemed === (student.id)}
                                    onChange={() => {(selectedperson_concemed!==student.id)?
                                        setselectedperson_concemed(student.id):setselectedperson_concemed(null)}}
                                />
                                {student.surname} {student.name} {student.patronymic}
                            </label>
                        </div>
                    ))}</>:<></>}
                    <button type="submit" disabled={stagessci.length===0 || (selectedmentor==="" && (!projects.approval))} onClick={approvalSubmit}>{(projects.approval)?<>Сохранить</>:<>Утвердить</>}</button>
                </form>
            </div> : <div></div>}
            </div>
        </div>
    );
};

export default Projects;
