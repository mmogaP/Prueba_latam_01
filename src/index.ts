/* Techflow */

/* Primero crear interfaces */
interface Project {
    id: number;
    name: string;
    initDate: Date;
    tasks: Task[]
}

interface Task {
    id: number;
    description: string;
    state: "pending" | "in progress" | "finish";
    limitDate: Date;
}

/* Crear proyectos */
const projects: Project[] = [
    {
        id: 1,
        name: "Proyecto 1",
        initDate: new Date(),
        tasks: []
    },
    {
        id: 2,
        name: "Proyecto 2",
        initDate: new Date(),
        tasks: []
    },
    {
        id: 3,
        name: "Proyecto 3",
        initDate: new Date(),
        tasks: []
    }
];

/* Crear tareas */
const tasks: Task[] = [
    {
        id: 1,
        description: "Diseñar base de datos",
        state: "pending",
        limitDate: new Date("2024-12-01")
    },
    {
        id: 2,
        description: "Implementar frontend",
        state: "in progress",
        limitDate: new Date("2024-12-05")
    },
    {
        id: 3,
        description: "Realizar pruebas unitarias",
        state: "pending",
        limitDate: new Date("2024-12-10")
    },
    {
        id: 4,
        description: "Documentar requisitos",
        state: "finish",
        limitDate: new Date("2024-11-30")
    },
    {
        id: 5,
        description: "Planificar entregables",
        state: "pending",
        limitDate: new Date("2024-11-28")
    },
    {
        id: 6,
        description: "Optimizar backend",
        state: "in progress",
        limitDate: new Date("2024-12-20")
    }
];

/* Gestión de proyectos y tareas */

const addTask = (project: Project, task: Task): Project => {
    
    /* Validate if task exist */
    const taskExist = project.tasks.some((item) => item.id === task.id)
    if (taskExist) {
        throw new Error(`La tarea ${task.id} ya existe en el proyecto`)
    }

    /* Add task */
    project.tasks.push(task)

    /* Return project updated*/
    return project;
}

const taskbyState = (projects: Project[]) => {
    /* Map projects */
    return projects.map(project => {
        /* Get only the count of each task */
        const taskCounts = project.tasks.reduce(
            (counts, task) => {
                /* Count being added */
                counts[task.state] = (counts[task.state] || 0) + 1;
                return counts
            },
            /* Return taskcounts with different sums */
            {pending: 0, "in progress": 0, finish: 0}
        )

        /* Return project with number of task on each state */
        return {
            projectName: project.name,
            taskCounts
        }
    })
}

const sortDate = (projects: Project[]): Project[] => {
    /* loop every project */
    return projects.map(project => ({
        /* Copy propertys of the project */
        ...project,
        /* Sort tasks of project and replace tasks */
        tasks: project.tasks.sort((a,b) => a.limitDate.getTime() - b.limitDate.getTime())
    }))
}

/* Análisis avanzado de tareas */

/* Funcion de orden superior tomando una funcion como argumento */
const filterProjectTasks = (projects: Project, filterfn: (task: Task) => boolean): Task[] => {
    return projects.tasks.filter(filterfn);
}

//dias que faltan para completar todas las tareas
const calculateDaysLeft = (project: Project): number => {
    const today = new Date();
    const lastTaskDate = project.tasks.reduce((latestDate, task) => {
        return task.limitDate > latestDate ? task.limitDate : latestDate;
    }, today);
    return Math.ceil((lastTaskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

//Obtener tareas criticas que están a 3 dias de vencer
const getCriticalTasks = (project: Project): Task[] => {
    const daysLeft = calculateDaysLeft(project);
    return filterProjectTasks(project, (task) => calculateDaysLeft(project) <= 3);
}


//Sincronización y actualización en tiempo real

//Get project details using async/await simulating a long API call
const getProjectDetails = async (projectId: number): Promise<Project> => {
    return new Promise<Project>((resolve, reject) => {
        setTimeout(() => {
            const project = projects.find((p) => p.id === projectId);
            if (project) {
                resolve(project);
            } else {
                reject(new Error(`Project with ID ${projectId} not found`));
            }
        }, 1000);
    });
};

/* Asignar tareas a los proyectos usando addTask */
try {
    addTask(projects[0], tasks[0]); // Proyecto 1: Tarea 1
    addTask(projects[0], tasks[1]); // Proyecto 1: Tarea 2

    addTask(projects[1], tasks[2]); // Proyecto 2: Tarea 3
    addTask(projects[1], tasks[3]); // Proyecto 2: Tarea 4

    addTask(projects[2], tasks[4]); // Proyecto 3: Tarea 5
    addTask(projects[2], tasks[5]); // Proyecto 3: Tarea 6

} catch (error) {
    console.error("Error al asignar tarea:", error);
}

/* Mostrar los proyectos con las tareas asignadas */
//console.log("Proyectos con tareas:", JSON.stringify(projects, null, 2));


// Ejemplo: Resumen de los proyectos
//const projectSummary = taskbyState(projects);
// Mostrar los resultados
//console.log("Resumen de los proyectos:", JSON.stringify(projectSummary, null, 2));

// Ejemplo: Ordenar tareas por fecha límite
//const sortedProjects = sortDate(projects);
// Mostrar los resultados
//console.log("Proyectos con tareas ordenadas por fecha límite:", JSON.stringify(sortedProjects, null, 2));

//const pendingTasks = filterProjectTasks(projects[1], task => task.state === "pending");
//console.log("Tareas pendientes del proyecto 2:", JSON.stringify(pendingTasks, null, 2));

const daysLeft = calculateDaysLeft(projects[0]);
console.log("Días restantes para completar todas las tareas del proyecto 1:", daysLeft);

const criticalTasks = getCriticalTasks(projects[1]);
console.log("Tareas criticas del proyecto 2:", JSON.stringify(criticalTasks, null, 2));

//TODO: Ejemplo: Obtener detalles de un proyecto
const projectDetails = getProjectDetails(1);
console.log("Detalles del proyecto 1:", JSON.stringify(projectDetails, null, 2));