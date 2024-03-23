//Typescript kod
function courses(courseInfo) {
    console.log(courseInfo.code);
    console.log(courseInfo.name);
    console.log(courseInfo.progression);
    console.log(courseInfo.syllabus);
}
//test objekt att sätta in i funktion
var newCourse = {
    code: "dt210g",
    name: "webbteknik",
    progression: "A",
    syllabus: "url-länk"
};
courses(newCourse);
