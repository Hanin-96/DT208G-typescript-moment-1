//Typescript kod

//skapar interface som innehåller info om kurs
interface CourseInfo {
    code : string;
    name : string;
    progression : string;
    syllabus : string
}

//Hämta submitknapp
let btnSubmit = document.getElementById("btn-submit") as HTMLInputElement;
btnSubmit.addEventListener("click", submitCourse);

function submitCourse() : void {
    let course: CourseInfo = {} as CourseInfo;
    
    //Hämta DOM element
    let courseCodeInput = document.getElementById("course-code") as HTMLInputElement;
    let courseNameInput = document.getElementById("course-name") as HTMLInputElement;
    let courseProgInput = document.getElementById("course-prog") as HTMLSelectElement;
    let courseLinkInput = document.getElementById("course-link") as HTMLInputElement;

    //Lägga in värden i course
    course.code = courseCodeInput.value;
    course.name = courseNameInput.value;
    course.progression = courseProgInput.value;
    course.syllabus = courseLinkInput.value;

    console.log(course);



}
