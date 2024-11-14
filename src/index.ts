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
console.log("Proyectos con tareas:", JSON.stringify(projects, null, 2));


// Ejemplo: Resumen de los proyectos
const projectSummary = taskbyState(projects);

// Mostrar los resultados
console.log("Resumen de los proyectos:", JSON.stringify(projectSummary, null, 2));

