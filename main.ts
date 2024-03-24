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

//Hämta clear knapp
let btnClear = document.getElementById("btn-clear") as HTMLButtonElement;
btnClear.addEventListener("click", clearCourses);

//Courselist
let courseList = document.querySelector(".course-list") as HTMLDivElement;

    //Hämta DOM element
    let courseCodeInput = document.getElementById("course-code") as HTMLInputElement;
    let courseNameInput = document.getElementById("course-name") as HTMLInputElement;
    let courseProgInput = document.getElementById("course-prog") as HTMLSelectElement;
    let courseLinkInput = document.getElementById("course-link") as HTMLInputElement;

function submitCourse(): void {
    let course: CourseInfo = {} as CourseInfo;

    //Lägga in värden i course
    course.code = courseCodeInput.value.trim().toUpperCase();
    course.name = courseNameInput.value.trim();
    course.progression = courseProgInput.value;
    course.syllabus = courseLinkInput.value.trim();

    if (validate(course)) {
        createCourse(course);
        saveCourse(course);
    }
}


//Skapar Kurs via DOM
function createCourse(course: CourseInfo): void {

    //Skapar nya element
    let courseArticle = document.createElement("article");
    let courseCodeP = document.createElement("p");
    let courseNameP = document.createElement("p");
    let courseProgP = document.createElement("p");
    let courseLinkEl = document.createElement("a");
    const iconLink = document.createElement("i");
    let btnUpdate = document.createElement("button");


    //Fyller elementen med värden från input
    courseCodeP.innerHTML = `${course.code}`;
    courseNameP.innerHTML = `${course.name}`;
    courseProgP.innerHTML = `${course.progression}`;
    courseLinkEl.innerHTML = `Länk till kurs`;

    //Uppdatera knapp
    btnUpdate.innerHTML = `Uppdatera`;
    btnUpdate.id = `btn-update`;

    courseLinkEl.href = course.syllabus;

    iconLink.className = `fa-solid fa-arrow-up-right-from-square`;

    courseLinkEl.appendChild(iconLink);

    courseArticle.appendChild(courseCodeP);
    courseArticle.appendChild(courseNameP);
    courseArticle.appendChild(courseProgP);
    courseArticle.appendChild(courseLinkEl);
    courseArticle.appendChild(btnUpdate);

    //Lägger ihop elementen i varje artikel element
    courseList.appendChild(courseArticle);

    btnUpdate.addEventListener("click", () => {
        courseCodeInput.value = course.code;
        courseNameInput.value = course.name;
        courseProgInput.value = course.progression;
        courseLinkInput.value = course.syllabus;
    })

}

//Spara kursinformation i LocalStorage
function saveCourse(course: CourseInfo): void {
    //Hämta existerande information om det finns
    let allCourses = localStorage.getItem("savedCourses") as string;
    //Gör om till array
    let allCoursesArr = JSON.parse(allCourses);

    //Om den finns, lägg till ny kurs på arrayen
    if (allCoursesArr && allCoursesArr.length > 0) {
        allCoursesArr.push(course);
    } else {
        //Sätt till ny array ifall den ej finns
        allCoursesArr = [course];
    }
    //Omvandla till sträng
    let itemsToSave = JSON.stringify(allCoursesArr);
    //Spara i LocalStorage
    localStorage.setItem("savedCourses", itemsToSave);
}

function loadCourses(): void {
    //Hämtar lista av sparade kurser från LocalStorage
    let allCourses = localStorage.getItem("savedCourses") as string;
    //Gör om till lista array
    let allCoursesArr = JSON.parse(allCourses);
    if (allCoursesArr && allCoursesArr.length > 0) {
        //För varje sparade kurs skapas elementen i html
        allCoursesArr.forEach(course => {
            createCourse(course);
        });
    }
}

//Rensa localStorage vid klick på rensningsknapp
function clearCourses(): void {
    localStorage.clear();
    courseList.replaceChildren(); //Tömma course listan
}

function validate(course: CourseInfo): boolean {
    if (course.code != "" && course.name != "" &&
        course.progression != "" && course.syllabus != "") {
        return true;
    }
    return false;
}
