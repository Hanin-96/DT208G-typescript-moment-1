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
    var courseArticle = document.createElement("article");
    var courseCodeP = document.createElement("p");
    var courseNameP = document.createElement("p");
    var courseProgP = document.createElement("p");
    var courseLinkEl = document.createElement("a");
    courseCodeP.innerHTML = "".concat(course.code);
    courseNameP.innerHTML = "".concat(course.name);
    courseProgP.innerHTML = "".concat(course.progression);
    courseLinkEl.innerHTML = "Extern l\u00E4nk";
    courseLinkEl.href = course.syllabus;
    courseArticle.appendChild(courseCodeP);
    courseArticle.appendChild(courseNameP);
    courseArticle.appendChild(courseProgP);
    courseArticle.appendChild(courseLinkEl);
    courseList.appendChild(courseArticle);
}
function saveCourse(course) {
    var allCourses = localStorage.getItem("savedCourses");
    var allCoursesArr = JSON.parse(allCourses);
    if (allCoursesArr && allCoursesArr.length > 0) {
        allCoursesArr.push(course);
    }
    else {
        allCoursesArr = [course];
    }
    var itemsToSave = JSON.stringify(allCoursesArr);
    localStorage.setItem("savedCourses", itemsToSave);
}
function loadCourses() {
    var allCourses = localStorage.getItem("savedCourses");
    var allCoursesArr = JSON.parse(allCourses);
    if (allCoursesArr && allCoursesArr.length > 0) {
        allCoursesArr.forEach(function (course) {
            createCourse(course);
        });
    }
}
function clearCourses() {
    localStorage.clear();
    courseList.replaceChildren();
}
