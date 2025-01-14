import React, { useEffect, useState } from 'react';

const Main = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [mentor, setmentor] = useState('');
    const [person_concemed, setperson_concemed] = useState('');
    const [description, setdescription] = useState('');
    const [Approval, setApproval] = useState('');
    const [students_id, setstudents_id] = useState('');
    const [project_stages, setproject_stages] = useState('');
    const [project_objectives, setproject_objectives] = useState('');
    const [project_purposes, setproject_purposes] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [scientific_supervisor, setscientific_supervisor] = useState([]);
    const [selectedscientific_supervisor, setSelectedscientific_supervisor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermsci, setSearchTermsci] = useState('');
    const [objective, setobjective] = useState('');
    const [objectives, setobjectives] = useState([]);
    const [purpose, setpurpose] = useState('');
    const [purposes, setpurposes] = useState([]);
    const [file, setFile] = useState(null);
    const [stage,setStage] = useState('')
    const [stages,setStages] = useState([])

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    useEffect(() => {
        const fetchStudents = async () => {
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

    const handleAddobjective = (e) => {
        e.preventDefault();
        if (objective.trim()) {
            setobjectives([...objectives, objective]);
            setobjective('');
        }
    };
    const handleRemoveObjective = (index) => {
        setobjectives(objectives.filter((_, i) => i !== index));
    };
    const handleAddpurpose = (e) => {
        e.preventDefault();
        if (purpose.trim()) {
            setpurposes([...purposes, purpose]);
            setpurpose('');
        }
    };
    const handleRemovepurpose = (index) => {
        setpurposes(purposes.filter((_, i) => i !== index));
    };
    const handleAddstage = (e) => {
        e.preventDefault();
        if (stages.trim()) {
            setStages([...stages, stage]);
            setStage('');
        }
    };
    const handleSelectStudent = (id) => {
        if (selectedStudents!==id) {
            setSelectedStudents(prevSelected =>
                prevSelected.includes(id) ? prevSelected.filter(sid => sid !== id) : [...prevSelected, id]
            );
        }else {
            setSelectedStudents(prevSelected => prevSelected.filter(sid => sid !== id));
        }
    }
    const handleSelectSci = (studentId) => {
        if(selectedscientific_supervisor!==studentId){
            setSelectedscientific_supervisor(studentId)
        } else{
            setSelectedscientific_supervisor(null)
        }
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTerm.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    const filteredscientific_supervisor = scientific_supervisor.filter(student =>
        student.name.toLowerCase().startsWith(searchTermsci.toLowerCase()) ||
        student.surname.toLowerCase().startsWith(searchTermsci.toLowerCase())||
        student.patronymic.toLowerCase().startsWith(searchTermsci.toLowerCase())
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/project/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    name: name,
                    description:description,
                    scientific_supervisor:selectedscientific_supervisor,
                    students_id: selectedStudents,
                    project_objectives: objectives,
                    project_purposes: purposes
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }else {
                //const result = await response.json(); // Получаем ответ в формате JSON
                //console.log('Success:', result);
            }// Обрабатываем успешный ответ
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };



    return (
        <div>
            <h1>Создать проект</h1>
            <form>
                <label>
                    Название:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    Описание:
                    <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} required/>
                    <h3>Список задач</h3>
                    <form>
                        <input
                            type="text"
                            value={objective}
                            onChange={(e) => setobjective(e.target.value)}
                            placeholder="Введите задачу"
                        />
                        <button type="submit" onClick={handleAddobjective}>Добавить</button>
                    </form>
                    <ul>
                        {objectives.map((t, index) => (
                            <li key={index}>{t}
                                <button onClick={() => handleRemoveObjective(index)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Список целей</h3>
                    <form>
                        <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setpurpose(e.target.value)}
                            placeholder="Введите задачу"
                        />
                        <button type="submit" onClick={handleAddpurpose}>Добавить</button>
                    </form>
                    <ul>
                        {purposes.map((t, index) => (
                            <li key={index}>{t}
                                <button onClick={() => handleRemovepurpose(index)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                    <p>Люди</p>
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div style={{maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc'}}>
                        {filteredStudents.map(student => (
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
                    <div>Научный руководитель</div>
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchTermsci}
                        onChange={(e) => setSearchTermsci(e.target.value)}
                    />
                    <div style={{maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc'}}>
                        {filteredscientific_supervisor.map(student => (
                            <div key={student.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedscientific_supervisor === (student.id)}
                                        onChange={() => handleSelectSci(student.id)}
                                    />
                                    {student.surname} {student.name} {student.patronymic}
                                </label>
                            </div>
                        ))}</div>
                </label>
                <button type="submit" disabled={selectedscientific_supervisor===null || selectedStudents===[] || name===""} onClick={handleSubmit}>Создать</button>


            </form>
        </div>
    );
};

export default Main;