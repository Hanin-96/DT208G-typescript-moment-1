//Typescript kod
window.onload = loadCourses;
//Hämta submitknapp
var btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", submitCourse);
//Hämta clear knapp
var btnClear = document.getElementById("btn-clear");
btnClear.addEventListener("click", clearCourses);
//Courselist
var courseList = document.querySelector(".course-list");
function submitCourse() {
    var course = {};
    //Hämta DOM element
    var courseCodeInput = document.getElementById("course-code");
    var courseNameInput = document.getElementById("course-name");
    var courseProgInput = document.getElementById("course-prog");
    var courseLinkInput = document.getElementById("course-link");
    //Lägga in värden i course
    course.code = courseCodeInput.value;
    course.name = courseNameInput.value;
    course.progression = courseProgInput.value;
    course.syllabus = courseLinkInput.value;
    createCourse(course);
    saveCourse(course);
}
//Skapar Kurs via DOM
function createCourse(course) {
    //Skapar nya element
    var courseArticle = document.createElement("article");
    var courseCodeP = document.createElement("p");
    var courseNameP = document.createElement("p");
    var courseProgP = document.createElement("p");
    var courseLinkEl = document.createElement("a");
    var iconLink = document.createElement("i");
    //Fyller elementen med värden från input
    courseCodeP.innerHTML = "".concat(course.code);
    courseNameP.innerHTML = "".concat(course.name);
    courseProgP.innerHTML = "".concat(course.progression);
    courseLinkEl.innerHTML = "L\u00E4nk till kurs";
    courseLinkEl.href = course.syllabus;
    iconLink.className = "fa-solid fa-arrow-up-right-from-square";
    courseLinkEl.appendChild(iconLink);
    courseArticle.appendChild(courseCodeP);
    courseArticle.appendChild(courseNameP);
    courseArticle.appendChild(courseProgP);
    courseArticle.appendChild(courseLinkEl);
    //Lägger ihop elementen i varje artikel element
    courseList.appendChild(courseArticle);
}
//Spara kursinformation i LocalStorage
function saveCourse(course) {
    //Hämta existerande information om det finns
    var allCourses = localStorage.getItem("savedCourses");
    //Gör om till array
    var allCoursesArr = JSON.parse(allCourses);
    //Om den finns, lägg till ny kurs på arrayen
    if (allCoursesArr && allCoursesArr.length > 0) {
        allCoursesArr.push(course);
    }
    else {
        //Sätt till ny array ifall den ej finns
        allCoursesArr = [course];
    }
    //Omvandla till sträng
    var itemsToSave = JSON.stringify(allCoursesArr);
    //Spara i LocalStorage
    localStorage.setItem("savedCourses", itemsToSave);
}
function loadCourses() {
    //Hämtar lista av sparade kurser från LocalStorage
    var allCourses = localStorage.getItem("savedCourses");
    //Gör om till lista array
    var allCoursesArr = JSON.parse(allCourses);
    if (allCoursesArr && allCoursesArr.length > 0) {
        //För varje sparade kurs skapas elementen i html
        allCoursesArr.forEach(function (course) {
            createCourse(course);
        });
    }
}
//Rensa localStorage vid klick på rensningsknapp
function clearCourses() {
    localStorage.clear();
    courseList.replaceChildren(); //Tömma course listan
}
