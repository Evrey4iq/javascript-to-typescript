# University Scheduling Management System

## Project Overview
This project is designed to manage the scheduling of university classes using TypeScript. It demonstrates the use of Union Types, Type Aliases, and Arrays to handle tasks such as adding professors, courses, classrooms, and scheduling lessons. The system also includes conflict management, classroom availability checking, and resource utilization analysis.

# Features

## Data Structures & Types:

DayOfWeek: Represents the days of the week.
TimeSlot: Defines time slots for classes.
CourseType: Categorizes course types as "Lecture," "Seminar," "Lab," or "Practice."
Professor, Classroom, Course, and Lesson types to model university entities.

## Core Functionalities:

Adding Professors & Lessons: Adds new professors and lessons to the system, with conflict validation.
Finding Available Classrooms: Returns classrooms available for a given time and day.
Getting Professor Schedules: Displays the schedule of a specific professor.
Handling Conflicts: Detects conflicts when scheduling lessons for professors or classrooms.

## Analysis Tools:

Classroom Utilization: Calculates the percentage of time a classroom is in use.
Popular Course Type: Determines the most common course type in the system.

## Data Modification:

Reassign Classrooms: Allows switching the classroom for a scheduled lesson if no conflicts exist.
Cancel Lessons: Removes a scheduled lesson from the system.

## Conclusion
This project successfully implements a basic university scheduling system using TypeScript, focusing on type-safe data handling and conflict management.