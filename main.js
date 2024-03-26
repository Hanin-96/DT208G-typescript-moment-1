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
//Hämta DOM element
var courseCodeInput = document.getElementById("course-code");
var courseNameInput = document.getElementById("course-name");
var courseProgInput = document.getElementById("course-prog");
var courseLinkInput = document.getElementById("course-link");
function submitCourse() {
    var course = {};
    //Lägga in värden i course
    course.code = courseCodeInput.value.trim().toUpperCase();
    course.name = courseNameInput.value.trim();
    course.progression = courseProgInput.value;
    course.syllabus = courseLinkInput.value.trim();
    if (validate(course)) {
        if (courseExists(course.code)) {
            //Skickar varning för att skriva över befintlig kurs
            var duplicate = confirm("Vill du skriva över existerande kurs?");
            if (duplicate) {
                updateCourse(course);
                loadCourses();
            }
        }
        else {
            saveCourse(course);
            createCourse(course);
        }
    }
}
//Skapar Kurs via DOM
function createCourse(course) {
    courseList.style.display = "block";
    //Skapar nya element
    var courseArticle = document.createElement("article");
    var courseCodeP = document.createElement("p");
    var courseNameP = document.createElement("p");
    var courseProgP = document.createElement("p");
    var courseLinkEl = document.createElement("a");
    var iconLink = document.createElement("i");
    var btnUpdate = document.createElement("button");
    //Fyller elementen med värden från input
    courseCodeP.innerHTML = "Kurskod: ".concat(course.code);
    courseNameP.innerHTML = "Kursnamn: ".concat(course.name);
    courseProgP.innerHTML = "Progression ".concat(course.progression);
    courseLinkEl.innerHTML = "L\u00E4nk till kurs";
    //Uppdatera knapp
    btnUpdate.innerHTML = "Uppdatera";
    btnUpdate.id = "btn-update";
    courseLinkEl.href = course.syllabus;
    courseLinkEl.target = "_blank";
    iconLink.className = "fa-solid fa-arrow-up-right-from-square";
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
    btnUpdate.addEventListener("click", function () {
        courseCodeInput.value = course.code;
        courseNameInput.value = course.name;
        courseProgInput.value = course.progression;
        courseLinkInput.value = course.syllabus;
    });
}
//Rensar Input fields
function resetInputFields() {
    courseCodeInput.value = "";
    courseNameInput.value = "";
    courseProgInput.value = "A";
    courseLinkInput.value = "";
}
//Spara kursinformation i LocalStorage
function saveCourse(course) {
    var allCoursesArr = getSavedCourses();
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
    var allCoursesArr = getSavedCourses();
    if (allCoursesArr && allCoursesArr.length > 0) {
        //För varje sparade kurs skapas elementen i html
        courseList.replaceChildren();
        allCoursesArr.forEach(function (course) {
            createCourse(course);
        });
    }
}
//Rensa localStorage vid klick på rensningsknapp
function clearCourses() {
    localStorage.clear();
    courseList.replaceChildren(); //Tömma course listan
    courseList.style.display = "none";
}
function validate(course) {
    if (course.code != "" && course.name != "" &&
        course.progression != "" && course.syllabus != "") {
        return true;
    }
    return false;
}
//Uppdaterar existerande kurs
function updateCourse(course) {
    //Hämtar lista av sparade kurser från LocalStorage
    var allCoursesArr = getSavedCourses();
    //Letar efter samma index på existerande kurs via kurskod
    var courseIndex = allCoursesArr.findIndex(function (savedCourse) { return savedCourse.code === course.code; });
    // Skriver över sparade kursen med ändrade kursen om det finns en dublett
    if (courseIndex != -1) {
        allCoursesArr[courseIndex] = course;
        localStorage.setItem("savedCourses", JSON.stringify(allCoursesArr));
    }
}
//Se om kursen existerar
function courseExists(code) {
    //Hämtar lista av sparade kurser från LocalStorage
    var allCoursesArr = getSavedCourses();
    //Letar efter samma index på existerande kurs via kurskod
    var courseIndex = allCoursesArr.findIndex(function (savedCourse) { return savedCourse.code === code; });
    //Om kurs index finns ska den returnera true
    if (courseIndex != -1) {
        return true;
    }
    else {
        return false;
    }
}
//Hämtar alla sparade kurser
function getSavedCourses() {
    //Hämtar från local storage
    var allCourses = localStorage.getItem("savedCourses");
    //Gör om till lista array
    var allCoursesArr = JSON.parse(allCourses);
    //Ifall det finns sparade kurser, returnerar det som lista
    if (allCoursesArr && allCoursesArr.length > 0) {
        return allCoursesArr;
    }
    else {
        return []; //Annars returnera tom lista
    }
}
