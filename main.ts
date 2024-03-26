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
        if (courseExists(course.code)) {
            //Skickar varning för att skriva över befintlig kurs
            const duplicate = confirm("Vill du skriva över existerande kurs?");
            if (duplicate) {
                updateCourse(course);
                loadCourses();
            }
        } else {
            saveCourse(course);
            createCourse(course);
        }
    }
}


//Skapar Kurs via DOM
function createCourse(course: CourseInfo): void {


    courseList.style.display = "block";

    //Skapar nya element
    let courseArticle = document.createElement("article");
    let courseCodeP = document.createElement("p");
    let courseNameP = document.createElement("p");
    let courseProgP = document.createElement("p");
    let courseLinkEl = document.createElement("a");
    const iconLink = document.createElement("i");
    let btnUpdate = document.createElement("button");


    //Fyller elementen med värden från input
    courseCodeP.innerHTML = `Kurskod: ${course.code}`;
    courseNameP.innerHTML = `Kursnamn: ${course.name}`;
    courseProgP.innerHTML = `Progression ${course.progression}`;
    courseLinkEl.innerHTML = `Länk till kurs`;

    //Uppdatera knapp
    btnUpdate.innerHTML = `Uppdatera`;
    btnUpdate.id = `btn-update`;

    courseLinkEl.href = course.syllabus;
    courseLinkEl.target = `_blank`;

    iconLink.className = `fa-solid fa-arrow-up-right-from-square`;

    courseLinkEl.appendChild(iconLink);

    courseArticle.appendChild(courseCodeP);
    courseArticle.appendChild(courseNameP);
    courseArticle.appendChild(courseProgP);
    courseArticle.appendChild(courseLinkEl);
    courseArticle.appendChild(btnUpdate);

    //Lägger ihop elementen i varje artikel element
    courseList.appendChild(courseArticle);

    //Rensar input fields när vi skapat kurs
    resetInputFields();


    btnUpdate.addEventListener("click", () => {
        courseCodeInput.value = course.code;
        courseNameInput.value = course.name;
        courseProgInput.value = course.progression;
        courseLinkInput.value = course.syllabus;
    })

}

//Rensar Input fields
function resetInputFields(): void {
    courseCodeInput.value = "";
    courseNameInput.value = "";
    courseProgInput.value = "A";
    courseLinkInput.value = "";
}

//Spara kursinformation i LocalStorage
function saveCourse(course: CourseInfo): void {
    let allCoursesArr = getSavedCourses();

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
    let allCoursesArr = getSavedCourses();
    if (allCoursesArr && allCoursesArr.length > 0) {
        //För varje sparade kurs skapas elementen i html
        courseList.replaceChildren();
        allCoursesArr.forEach(course => {
            createCourse(course);
        });
    }
}

//Rensa localStorage vid klick på rensningsknapp
function clearCourses(): void {
    localStorage.clear();
    courseList.replaceChildren(); //Tömma course listan
    courseList.style.display = "none";
}

function validate(course: CourseInfo): boolean {
    if (course.code != "" && course.name != "" &&
        course.progression != "" && course.syllabus != "") {
        return true;
    }
    return false;
}

//Uppdaterar existerande kurs
function updateCourse(course: CourseInfo): void {
    //Hämtar lista av sparade kurser från LocalStorage
    let allCoursesArr = getSavedCourses();

    //Letar efter samma index på existerande kurs via kurskod
    const courseIndex: number = allCoursesArr.findIndex(savedCourse => savedCourse.code === course.code);

    // Skriver över sparade kursen med ändrade kursen om det finns en dublett
    if (courseIndex != -1) {
        allCoursesArr[courseIndex] = course;
        localStorage.setItem("savedCourses", JSON.stringify(allCoursesArr));
    }
}

//Se om kursen existerar
function courseExists(code: string): boolean {
    //Hämtar lista av sparade kurser från LocalStorage
    let allCoursesArr = getSavedCourses();

    //Letar efter samma index på existerande kurs via kurskod
    const courseIndex: number = allCoursesArr.findIndex(savedCourse => savedCourse.code === code);

    //Om kurs index finns ska den returnera true
    if (courseIndex != -1) {
        return true;
    } else {
        return false;
    }
}

//Hämtar alla sparade kurser
function getSavedCourses() {
    //Hämtar från local storage
    let allCourses = localStorage.getItem("savedCourses") as string;
    //Gör om till lista array
    let allCoursesArr = JSON.parse(allCourses);

    //Ifall det finns sparade kurser, returnerar det som lista
    if (allCoursesArr && allCoursesArr.length > 0) {
        return allCoursesArr;
    } else {
        return []; //Annars returnera tom lista
    }

}
