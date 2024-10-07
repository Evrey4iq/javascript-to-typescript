// Base types:
// a) Масиви даних
var professors = [];
var classrooms = [];
var courses = [];
var schedule = [];
// b) Функція для додавання професора
function addProfessor(professor) {
    professors.push(professor);
}
// c) Функція для додавання заняття з перевіркою конфліктів
function addLesson(lesson) {
    var conflict = validateLesson(lesson);
    if (conflict === null) {
        schedule.push(lesson);
        return true;
    }
    else {
        console.log("Конфлікт:", conflict);
        return false;
    }
}
// a) Пошук вільних аудиторій
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    var occupiedClassrooms = schedule
        .filter(function (lesson) { return lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek; })
        .map(function (lesson) { return lesson.classroomNumber; });
    return classrooms
        .filter(function (classroom) { return !occupiedClassrooms.includes(classroom.number); })
        .map(function (classroom) { return classroom.number; });
}
// b) Пошук розкладу для професора
function getProfessorSchedule(professorId) {
    return schedule.filter(function (lesson) { return lesson.professorId === professorId; });
}
// b) Перевірка на конфлікти в розкладі
function validateLesson(lesson) {
    var professorConflict = schedule.find(function (l) { return l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek; });
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    var classroomConflict = schedule.find(function (l) { return l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek; });
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }
    return null;
}
// a) Функція для підрахунку використання аудиторії
function getClassroomUtilization(classroomNumber) {
    var totalLessons = schedule.length;
    var classroomLessons = schedule.filter(function (lesson) { return lesson.classroomNumber === classroomNumber; }).length;
    if (totalLessons === 0) {
        return 0; // Якщо немає занять
    }
    return (classroomLessons / totalLessons) * 100; // Відсоток використання аудиторії
}
// b) Функція для визначення найпопулярнішого типу занять
function getMostPopularCourseType() {
    var courseTypeCount = {
        "Lecture": 0,
        "Seminar": 0,
        "Lab": 0,
        "Practice": 0
    };
    courses.forEach(function (course) {
        courseTypeCount[course.type]++;
    });
    return Object.keys(courseTypeCount).reduce(function (a, b) { return courseTypeCount[a] > courseTypeCount[b] ? a : b; });
}
// a) Функція для зміни аудиторії для заняття
function reassignClassroom(lessonId, newClassroomNumber) {
    var lessonIndex = schedule.findIndex(function (lesson) { return lesson.courseId === lessonId; });
    if (lessonIndex !== -1) {
        var conflict = schedule.find(function (l) { return l.classroomNumber === newClassroomNumber &&
            l.timeSlot === schedule[lessonIndex].timeSlot &&
            l.dayOfWeek === schedule[lessonIndex].dayOfWeek; });
        if (!conflict) {
            schedule[lessonIndex].classroomNumber = newClassroomNumber;
            return true;
        }
        else {
            console.log("Неможливо змінити аудиторію через конфлікт.");
        }
    }
    return false;
}
// b) Функція для скасування заняття
function cancelLesson(lessonId) {
    schedule = schedule.filter(function (lesson) { return lesson.courseId !== lessonId; });
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
var drSmithSchedule = getProfessorSchedule(1);
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
