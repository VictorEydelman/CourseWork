import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Project_main_page from "./project_main_page";
import "./stage_page.css"
const Projects = ({stages,objectives}) => {
    const [projects, setProjects] = useState([]);
    //setproject_id(projectId)
    //setSelectedProject(project)

    const [stage, setstages] = useState(stages);
    const [stagesci, setStagesci] = useState('')
    const [name, setname] = useState('')
    const [objective, setobjective] = useState([])
    const [intermediate, setintermediate] = useState([])
    const [comments, setcomments] = useState([])
    const [comment, setcomment] = useState([])
    const [stagessend, setStagessend] = useState([])
    const [Objectives, setObjectives] = useState([])
    const [approval, setapproval] = useState([])
    const [approval_sci, setapproval_sci] = useState(stage.approval_by_scientific_supervisor)
    const [approval_by_mentor, setapproval_by_mentor] = useState(stage.approval_by_mentor)
    const [r,setr]=useState([]);
    useEffect(() => {
        const fetchStage8 = async () => {
            try {
                try {
                    const response = await fetch(`http://localhost:9876/api/stage/getstage/${stages.id}`, {
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
                        setstages(result);
                        console.log(result)
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
                const response = await fetch(`http://localhost:9876/api/stage/getbyprojectStages/${stage.id}`, {
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
                    setintermediate(result);
                    const resul=[];
                    for (let i = 0; i < result.length; i++) {
                        try {
                            const response2 = await fetch(`http://localhost:9876/api/comments/get/${result[i].id}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                                }
                            });
                            if (!response2.ok) {
                                throw new Error('Network response was not ok');
                            } else {
                                resul[i] = await response2.json();

                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                    setcomment(resul)
                }
                try {
                    const response = await fetch(`http://localhost:9876/api/stage/getObjectives_stage/${stage.id}`, {
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
                        setObjectives(result);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            try {
                const response = await fetch(`http://localhost:9876/api/stage/getObjectives_stage/${stage.id}`, {
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
                    setObjectives(result);
                }
            } catch (error) {
                console.error('Error:', error);
            }

        };

        fetchStage8();
        const intervalId = setInterval(fetchStage8, 1500);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [stages]);
    const IntermediateSubmit = async (e) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        setFiles([])
        setStagesci("")
        formData.append('description',stagesci)
        formData.append('project_stages',stage.id)
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/stage/add_intermediate_result', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
            }// Обрабатываем успешный ответ
            setStagesci('');
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };
    const approvalIntermediateSubmit = async (e,id) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9876/api/stage/approvalIntermediate/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };
    const approval_by_mentorSubmit = async (e,id) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9876/api/stage/approvalStagesMentor/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };
    const approval_by_sciSubmit = async (e,id) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9876/api/stage/approvalStagesScientific_supervisor/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };
    const namefil=(result)=>{
        const dot=result.lastIndexOf('.');
        const min = result.lastIndexOf('_');
        if(min<dot){
            return result.substring(0, min) + result.substring(dot)
        } else{
            return result.substring(0, min)
        }
    }
    const getfile = async (e,filename) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9876/api/stage/download/${filename}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const result = await response.text();
                const blob = new Blob([result], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', namefil(filename));
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const CommentSubmit = async (e,id,des,i) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9876/api/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    intermediateresult: id,
                    description:des
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
            }// Обрабатываем успешный ответ
            setStagesci('');
            updateOrAddItem({id: i, name: ""})
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };
    const handleApprovalChange = (index) => {
        if (!approval[index]) { // Проверяем, был ли уже нажат чекбокс
            const updatedApproval = [...approval];
            updatedApproval[index] = true; // Устанавливаем approval в true
            setapproval(updatedApproval);
        }
    };
    const IntermediateItems = [];
    for (let i = 0; i < intermediate.length; i++) {
        const Intermediate = intermediate[i];
        const ComItems=[]
        if(comment.length===intermediate.length) {
            for (let j = 0; j < comment[i].length; j++) {
            const com = comment[i][j];
                ComItems.push(
                    <li>
                        {com.description}
                        {com.user.name}
                    </li>
                );
            }
        }
        const currentComments = comments.find(item => item.id === stage.id);
        const currentCommentItem = currentComments ? currentComments.items[i] : null;
        const intermediatefiles = Intermediate.link.split(',');
        const fileitems=[]
        for(let j=0; j<intermediatefiles.length;j++){
            fileitems.push(<li>
                {namefil(intermediatefiles[j])}
                <button type="submit"
                        onClick={(e) => getfile(e, intermediatefiles[j])}>Скачать
                </button>
            </li>)
        }
        IntermediateItems.push(
            <li key={Intermediate.id}>
                <ul>

                    {Intermediate.description}<br/>
                    Утверждение ментором:
                    <input
                        type="checkbox"
                        checked={Intermediate.approval_by_curator}
                        onChange={(e) => approvalIntermediateSubmit(e, Intermediate.id)}
                        disabled={stage.project.mentor_user_id.id.toString() !== localStorage.getItem("id")
                            && stage.project.scientific_supervisor_user_id.id.toString() !== localStorage.getItem("id")}
                    />{fileitems}

                    <div>

                        <ul>{ComItems}</ul>
                        {(stage.project.mentor_user_id.id.toString() === localStorage.getItem("id") ||
                            stage.project.scientific_supervisor_user_id.id.toString() === localStorage.getItem("id") ||
                            stage.project.person_concemed_user_id.id.toString() !== localStorage.getItem("id")) ? <>
                            <input
                                type="text"
                                value={currentCommentItem ? (currentCommentItem.name) : ''}
                                onChange={(e) => updateOrAddItem({id: i, name: e.target.value}, stage.id)}
                                placeholder="Введите коммментарий"
                            />

                            <button type="submit"
                                    onClick={(e) => CommentSubmit(e, Intermediate.id, currentCommentItem.name,i)}>Отправить
                            </button>
                        </> : <></>}

                    </div>
                </ul>
            </li>
        );
    }
    const updateOrAddItem = (newItem, interm) => {
        setcomments((prevComments) => {
            const existingIndex = prevComments.findIndex(item => item.id === interm);
            if (existingIndex !== -1) {
                const updatedItems = [...prevComments];
                const existingItems = updatedItems[existingIndex].items;
                const itemIndex = existingItems.findIndex(item => item.id === newItem.id);
                if (itemIndex !== -1) {
                    existingItems[itemIndex] = { id: newItem.id, name: newItem.name };
                } else {
                    existingItems.push({ id: newItem.id, name: newItem.name });
                }
                updatedItems[existingIndex].items = existingItems;
                return updatedItems;
            } else {
                return [...prevComments, { id: interm, items: [{ id: newItem.id, name: newItem.name }] }];
            }
        });
    };
    const clearItemById = (itemId, interm) => {
        setcomments((prevComments) => {
            const existingIndex = prevComments.findIndex(item => item.id === interm);
            if (existingIndex !== -1) {
                const updatedItems = [...prevComments];
                const existingItems = updatedItems[existingIndex].items;
                const itemIndex = existingItems.findIndex(item => item.id === itemId);
                if (itemIndex !== -1) {
                    existingItems[itemIndex] = { ...existingItems[itemIndex], name: '' };
                }
                updatedItems[existingIndex].items = existingItems;
                return updatedItems;
            }
            return prevComments;
        });
    };
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    return (
        <div>
            <br/><br/><br/>
            Название:
            {stage.name} Дедлайн:
            {stage.deadline}<br/>
            Утверждение ментором:
            <input
                type="checkbox"
                checked={stage.approval_by_mentor}
                onChange={(e) => approval_by_mentorSubmit(e, stage.id)}
                disabled={stage.project.mentor_user_id.id.toString() !== localStorage.getItem("id")
                    && stage.project.scientific_supervisor_user_id.id.toString() !== localStorage.getItem("id")}
            /><br/>
            Утверждение научным руководителем:
            <input
                type="checkbox"
                checked={stage.approval_by_scientific_supervisor}
                onChange={(e) => approval_by_sciSubmit(e, stage.id)}
                disabled={stage.project.scientific_supervisor_user_id.id.toString() !== localStorage.getItem("id")}
            /><br/><br/>
            Цели
            <ul>
                {Objectives.map((t, index) => (
                    <li>{t.description}</li>
                ))}
            </ul>
            Выложить результаты
            <div>
                {(stage.project.mentor_user_id.id.toString() === localStorage.getItem("id") ||
                    stage.project.scientific_supervisor_user_id.id.toString() === localStorage.getItem("id") ||
                    stage.project.person_concemed_user_id.id.toString() !== localStorage.getItem("id")) ? <>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                    />
                    <input
                        type="text"
                        value={stagesci}
                        onChange={(e) => setStagesci(e.target.value)}
                        placeholder="Введите сообщение"
                    />
                    <button disabled={files.length===0 || stagesci===""} type="submit" onClick={IntermediateSubmit}>Добавить</button>
                </> : <></>}
                <ul>{IntermediateItems}</ul>
            </div>
        </div>
    );
};

export default Projects;