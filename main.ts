//Typescript kod

//skapar interface som innehåller info om kurs
interface CourseInfo {
    code : string;
    name : string;
    progression : string;
    syllabus : string
}

function courses(courseInfo: CourseInfo) : void {
    console.log(courseInfo.code);
    console.log(courseInfo.name);
    console.log(courseInfo.progression);
    console.log(courseInfo.syllabus);
}

//test objekt att sätta in i funktion
const newCourse: CourseInfo = {
    code: "dt210g",
    name: "webbteknik",
    progression:"A",
    syllabus: "url-länk"
};

courses(newCourse);