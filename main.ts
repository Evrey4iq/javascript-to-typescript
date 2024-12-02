// Enums
// Enum to represent the status of a student
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

// Enum to represent the type of a course
enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

// Enum to represent the semesters in a year
enum Semester {
    First = "First",
    Second = "Second"
}

// Enum to represent grades with numeric values
enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

// Enum to represent university faculties
enum Faculty {
    Computer_Science = "Computer Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

// Interfaces
// Represents a university student
interface Student {
    id: number; // Unique identifier for the student
    fullName: string; // Full name of the student
    faculty: Faculty; // Faculty the student belongs to
    year: number; // Current year of study
    status: StudentStatus; // Current status of the student
    enrollmentDate: Date; // Date of enrollment
    groupNumber: string; // Group number the student belongs to
}

// Represents a course offered at the university
interface Course {
    id: number; // Unique identifier for the course
    name: string; // Name of the course
    type: CourseType; // Type of the course (Mandatory/Optional/Special)
    credits: number; // Number of credits awarded
    semester: Semester; // Semester in which the course is offered
    faculty: Faculty; // Faculty offering the course
    maxStudents: number; // Maximum number of students allowed
}

// Represents a record of a student's grade in a course
interface GradeRecord {
    studentId: number; // ID of the student
    courseId: number; // ID of the course
    grade: Grade; // Grade the student received
    date: Date; // Date the grade was awarded
    semester: Semester; // Semester during which the grade was given
}

// Class to manage the university system
class UniversityManagementSystem {
    private students: Student[] = []; // List of students in the system
    private courses: Course[] = []; // List of courses in the system
    private grades: GradeRecord[] = []; // List of grades assigned

    private studentCounter = 1; // Counter to auto-generate unique student IDs
    private courseCounter = 1; // Counter to auto-generate unique course IDs

    // Enrolls a new student in the system
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    // Registers a student for a specific course
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) throw new Error("Student not found.");
        if (!course) throw new Error("Course not found.");
        if (course.faculty !== student.faculty) throw new Error("Student's faculty does not match the course faculty.");

        const registeredStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (registeredStudents >= course.maxStudents) throw new Error("Course capacity exceeded.");

        this.grades.push({
            studentId,
            courseId,
            grade: null as any, // Grade will be set later
            date: new Date(),
            semester: course.semester
        });
    }

    // Assigns a grade to a student for a specific course
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const gradeRecord = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);

        if (!gradeRecord) throw new Error("Student is not registered for this course.");

        gradeRecord.grade = grade;
        gradeRecord.date = new Date(); // Update the date of grade assignment
    }

    // Updates the status of a student
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Student not found.");

        // Prevent status changes for graduated or expelled students
        if ([StudentStatus.Graduated, StudentStatus.Expelled].includes(student.status)) {
            throw new Error("Cannot update status for graduated or expelled students.");
        }

        student.status = newStatus;
    }

    // Retrieves all students belonging to a specific faculty
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Retrieves all grades assigned to a specific student
    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Retrieves all courses available for a specific faculty and semester
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Calculates the average grade for a specific student
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter(g => g.studentId === studentId && g.grade !== null);

        if (studentGrades.length === 0) return 0;

        const total = studentGrades.reduce((sum, record) => sum + record.grade, 0);
        return total / studentGrades.length;
    }

    // Retrieves a list of honor students (students with excellent grades) for a specific faculty
    getHonorStudentsByFaculty(faculty: Faculty): Student[] {
        const honorStudentIds = new Set(
            this.grades
                .filter(g => g.grade === Grade.Excellent)
                .map(g => g.studentId)
        );

        return this.students.filter(s => s.faculty === faculty && honorStudentIds.has(s.id));
    }

    // Adds a new course to the system
    addCourse(course: Omit<Course, "id">): Course {
        const newCourse: Course = { id: this.courseCounter++, ...course };
        this.courses.push(newCourse);
        return newCourse;
    }
}
