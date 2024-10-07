// Base types:

// a) DayOfWeek type alias
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

// b) TimeSlot union type
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

// c) CourseType alias
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";


// Main structures:


// a) Professor type alias
type Professor = {
    id: number;
    name: string;
    department: string;
};

// b) Classroom type alias
type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

// c) Course type alias
type Course = {
    id: number;
    name: string;
    type: CourseType;
};

// d) Lesson type alias
type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};


// a) Масиви даних
let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];


// b) Функція для додавання професора
function addProfessor(professor: Professor): void {
    professors.push(professor);
}


// c) Функція для додавання заняття з перевіркою конфліктів
function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);
    if (conflict === null) {
        schedule.push(lesson);
        return true;
    } else {
        console.log("Конфлікт:", conflict);
        return false;
    }
}


// a) Пошук вільних аудиторій
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}


// b) Пошук розкладу для професора
function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}


// a) ScheduleConflict type alias
type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

// b) Перевірка на конфлікти в розкладі
function validateLesson(lesson: Lesson): ScheduleConflict | null {
    const professorConflict = schedule.find(
        l => l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
    );
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }

    const classroomConflict = schedule.find(
        l => l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
    );
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }

    return null;
}


// a) Функція для підрахунку використання аудиторії
function getClassroomUtilization(classroomNumber: string): number {
    const totalLessons = schedule.length;
    const classroomLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;

    if (totalLessons === 0) {
        return 0; // Якщо немає занять
    }

    return (classroomLessons / totalLessons) * 100; // Відсоток використання аудиторії
}

// b) Функція для визначення найпопулярнішого типу занять
function getMostPopularCourseType(): CourseType {
    const courseTypeCount: Record<CourseType, number> = {
        "Lecture": 0,
        "Seminar": 0,
        "Lab": 0,
        "Practice": 0
    };

    courses.forEach(course => {
        courseTypeCount[course.type]++;
    });

    return Object.keys(courseTypeCount).reduce((a, b) => courseTypeCount[a as CourseType] > courseTypeCount[b as CourseType] ? a : b) as CourseType;
}



// a) Функція для зміни аудиторії для заняття
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (lessonIndex !== -1) {
        const conflict = schedule.find(
            l => l.classroomNumber === newClassroomNumber &&
                l.timeSlot === schedule[lessonIndex].timeSlot &&
                l.dayOfWeek === schedule[lessonIndex].dayOfWeek
        );
        if (!conflict) {
            schedule[lessonIndex].classroomNumber = newClassroomNumber;
            return true;
        } else {
            console.log("Неможливо змінити аудиторію через конфлікт.");
        }
    }
    return false;
}

// b) Функція для скасування заняття
function cancelLesson(lessonId: number): void {
    schedule = schedule.filter(lesson => lesson.courseId !== lessonId);
}



// Тестовий приклад використання:



// Додаємо професорів
addProfessor({ id: 1, name: "Dr. Smith", department: "Computer Science" });
addProfessor({ id: 2, name: "Prof. Johnson", department: "Mathematics" });
addProfessor({ id: 3, name: "Dr. Green", department: "Physics" });

console.log("✅ Професори додані");

// Додаємо аудиторії
classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 25, hasProjector: false });
classrooms.push({ number: "103", capacity: 50, hasProjector: true });

console.log("✅ Аудиторії додані");

// Додаємо курси
courses.push({ id: 1, name: "Algorithms", type: "Lecture" });
courses.push({ id: 2, name: "Calculus", type: "Seminar" });
courses.push({ id: 3, name: "Quantum Mechanics", type: "Lab" });

console.log("✅ Курси додані");

// Додаємо заняття
addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" }) 
    ? console.log("✅ Заняття 'Algorithms' додано") 
    : console.log("⚠️ Помилка при додаванні заняття 'Algorithms'");

addLesson({ courseId: 2, professorId: 2, classroomNumber: "102", dayOfWeek: "Monday", timeSlot: "10:15-11:45" }) 
    ? console.log("✅ Заняття 'Calculus' додано") 
    : console.log("⚠️ Помилка при додаванні заняття 'Calculus'");

addLesson({ courseId: 3, professorId: 3, classroomNumber: "103", dayOfWeek: "Monday", timeSlot: "12:15-13:45" }) 
    ? console.log("✅ Заняття 'Quantum Mechanics' додано") 
    : console.log("⚠️ Помилка при додаванні заняття 'Quantum Mechanics'");

// Перевіряємо вільні аудиторії
console.log("Вільні аудиторії для слоту 8:30-10:00:", findAvailableClassrooms("8:30-10:00", "Monday"));

// Перевіряємо розклад професора
const drSmithSchedule = getProfessorSchedule(1);
console.log("Розклад Dr. Smith:", JSON.stringify(drSmithSchedule, null, 2));

// Підраховуємо використання аудиторії
console.log("Використання аудиторії 101:", getClassroomUtilization("101") + "%");

// Змінюємо аудиторію для заняття 'Algorithms' на 102
reassignClassroom(1, "102") 
    ? console.log("✅ Аудиторію для 'Algorithms' змінено на 102") 
    : console.log("⚠️ Не вдалося змінити аудиторію для 'Algorithms'");

// Скасовуємо заняття 'Calculus'
cancelLesson(2);
console.log("✅ Заняття 'Calculus' скасовано");

// Найпопулярніший тип курсу
console.log("Найпопулярніший тип курсу:", getMostPopularCourseType());
