import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Project_main_page from "./project_main_page";
import Stage_page from "./stage_page";

const Projects = ({selectedProject, projectId}) => {
    const [projects, setProjects] = useState([]);
    const [project_id, setproject_id] = useState(projectId);
    //setproject_id(projectId)
    //setSelectedProject(project)

    const [stages, setstages] = useState([]);
    const [stagesci, setStagesci] = useState('')
    const [name, setname] = useState('')
    const [objective, setobjective] = useState([])
    const [purpose, setpurpose] = useState([])
    const [stagessci, setStagessci] = useState([])
    const [stagesend, setStagesend] = useState('')
    const [stagessend, setStagessend] = useState([])
    const [Objectives, setObjectives] = useState([])
    const [Objective, setObjective] = useState('')
    const [SelectedStage, setSelectedStage] = useState('')
    const [page,setpage]=useState(true);


    useEffect(() => {
        const fetchStage8 = async () => {
            try {
                const response = await fetch(`http://localhost:9876/api/stage/getbyuserandproject/${projectId}`, {
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
    useEffect(()=>{
        setpage(true)
    },[projectId])
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
                    mentor: 1,
                    person_concemed: 1,
                    approval: true
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
            }// Обрабатываем успешный ответ
        } catch (error) {
            console.error('Error:', error); // Обрабатываем ошибки
        }
    };
    const selproject = async (stage) => {
        setSelectedStage(stage)
        setpage(false)
    }

    const stageItems = [];
    stageItems.push(<li onClick={() =>{setpage(true)}}>
        Главная
    </li>)
    for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        stageItems.push(
            <li onClick={() => selproject(stage)}
            className="stage-item">
                {stage.name}
            </li>
        );
    }
    return (
       <div>
           <ul>
           {stageItems}
           </ul>
           {page ? <Project_main_page projectId={projectId} selectedProject={selectedProject}/> : <Stage_page stages={SelectedStage} />}

       </div>
    );
};

export default Projects;
