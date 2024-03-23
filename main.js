//Typescript kod
//Hämta submitknapp
var btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", submitCourse);
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
    console.log(course);
}
