//Typescript kod
window.onload = loadCourses;


//skapar interface som innehåller info om kurs
interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string
}

//Hämta submitknapp
let btnSubmit = document.getElementById("btn-submit") as HTMLInputElement;
btnSubmit.addEventListener("click", submitCourse);


//Courselist
let courseList = document.querySelector(".course-list") as HTMLDivElement;

function submitCourse(): void {
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

    createCourse(course);




}


//Skapar Kurs via DOM
function createCourse(course: CourseInfo): void {
    let courseArticle = document.createElement("article");
    let courseCodeP = document.createElement("p");
    let courseNameP = document.createElement("p");
    let courseProgP = document.createElement("p");
    let courseLinkEl = document.createElement("a");

    courseCodeP.innerHTML = `${course.code}`;
    courseNameP.innerHTML = `${course.name}`;
    courseProgP.innerHTML = `${course.progression}`;
    courseLinkEl.innerHTML = `Extern länk`;

    courseLinkEl.href = course.syllabus;

    courseArticle.appendChild(courseCodeP);
    courseArticle.appendChild(courseNameP);
    courseArticle.appendChild(courseProgP);
    courseArticle.appendChild(courseLinkEl);

    courseList.appendChild(courseArticle);

}
