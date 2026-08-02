const addButton =
    document.getElementById("addButton");

const subjectList =
    document.getElementById("subjectList");

const overallPercentage =
    document.getElementById("overallPercentage");

const overallClasses =
    document.getElementById("overallClasses");

const overallMessage =
    document.getElementById("overallMessage");

const overallProgressBar =
    document.getElementById("overallProgressBar");

const subjectCount =
    document.getElementById("subjectCount");

const emptyState =
    document.getElementById("emptyState");

const resetButton =
    document.getElementById("resetButton");

const targetSelect =
    document.getElementById("targetSelect");


/* ======================================
   LOAD SAVED DATA
====================================== */

let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];


/* Load attendance target */

let attendanceTarget =
    Number(
        localStorage.getItem("attendanceTarget")
    ) || 75;


targetSelect.value =
    attendanceTarget;


/* ======================================
   SAVE SUBJECTS
====================================== */

function saveSubjects() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

}


/* ======================================
   CHANGE ATTENDANCE TARGET
====================================== */

targetSelect.addEventListener(
    "change",
    function () {

        attendanceTarget =
            Number(targetSelect.value);


        localStorage.setItem(
            "attendanceTarget",
            attendanceTarget
        );


        renderSubjects();

    }
);


/* ======================================
   ADD SUBJECT
====================================== */

addButton.addEventListener(
    "click",
    function () {

        const subjectInput =
            document.getElementById("subject");

        const attendedInput =
            document.getElementById("attended");

        const totalInput =
            document.getElementById("total");


        const name =
            subjectInput.value.trim();

        const attended =
            Number(attendedInput.value);

        const total =
            Number(totalInput.value);


        /* VALIDATION */

        if (
            name === "" ||
            attendedInput.value === "" ||
            totalInput.value === ""
        ) {

            alert(
                "Please fill in all fields."
            );

            return;

        }


        if (
            !Number.isInteger(attended) ||
            !Number.isInteger(total)
        ) {

            alert(
                "Classes must be whole numbers."
            );

            return;

        }


        if (
            attended < 0 ||
            total <= 0
        ) {

            alert(
                "Please enter valid class numbers."
            );

            return;

        }


        if (attended > total) {

            alert(
                "Attended classes cannot be greater than total classes."
            );

            return;

        }


        /* CREATE SUBJECT */

        const newSubject = {

            id:
                Date.now() +
                Math.random(),

            name: name,

            attended: attended,

            total: total

        };


        subjects.push(newSubject);


        saveSubjects();

        renderSubjects();


        /* CLEAR INPUTS */

        subjectInput.value = "";

        attendedInput.value = "";

        totalInput.value = "";


        subjectInput.focus();

    }
);


/* ======================================
   RENDER SUBJECTS
====================================== */

function renderSubjects() {

    subjectList.innerHTML = "";


    /* EMPTY STATE */

    if (subjects.length === 0) {

        emptyState.style.display =
            "block";

    }

    else {

        emptyState.style.display =
            "none";

    }


    /* SUBJECT COUNT */

    if (subjects.length === 1) {

        subjectCount.textContent =
            "1 subject added";

    }

    else {

        subjectCount.textContent =
            subjects.length +
            " subjects added";

    }


    subjects.forEach(
        function (subject) {

            const percentage =
                (
                    subject.attended /
                    subject.total
                ) * 100;


            const formattedPercentage =
                percentage.toFixed(2);


            const safe =
                percentage >=
                attendanceTarget;


            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "subject-card"
            );


            card.innerHTML = `

                <div class="subject-top">

                    <h3>
                        ${escapeHTML(subject.name)}
                    </h3>

                    <span
                        class="percentage
                        ${safe ? "safe" : "danger"}">

                        ${formattedPercentage}%

                    </span>

                </div>


                <p class="class-info">

                    ${subject.attended}
                    attended out of
                    ${subject.total}
                    classes

                </p>


                <div class="progress">

                    <div
                        class="progress-bar
                        ${safe
                            ? "progress-safe"
                            : "progress-danger"}"

                        style="
                            width:
                            ${Math.min(
                                percentage,
                                100
                            )}%
                        ">
                    </div>

                </div>


                <p
                    class="status
                    ${safe ? "safe" : "danger"}">

                    ${getSubjectMessage(subject)}

                </p>


                <div class="attendance-actions">

                    <button
                        class="present-btn">

                        ✓ Present

                    </button>


                    <button
                        class="absent-btn">

                        ✕ Absent

                    </button>

                </div>


                <div class="secondary-actions">

                    <button
                        class="edit-btn">

                        Edit

                    </button>


                    <button
                        class="delete-btn">

                        Delete

                    </button>

                </div>

            `;


            /* PRESENT */

            card
                .querySelector(
                    ".present-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        subject.attended++;

                        subject.total++;


                        saveSubjects();

                        renderSubjects();

                    }
                );


            /* ABSENT */

            card
                .querySelector(
                    ".absent-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        subject.total++;


                        saveSubjects();

                        renderSubjects();

                    }
                );


            /* EDIT */

            card
                .querySelector(
                    ".edit-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        editSubject(
                            subject
                        );

                    }
                );


            /* DELETE */

            card
                .querySelector(
                    ".delete-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        const confirmed =
                            confirm(
                                "Delete " +
                                subject.name +
                                "?"
                            );


                        if (!confirmed) {

                            return;

                        }


                        subjects =
                            subjects.filter(
                                function (item) {

                                    return (
                                        item.id !==
                                        subject.id
                                    );

                                }
                            );


                        saveSubjects();

                        renderSubjects();

                    }
                );


            subjectList.appendChild(
                card
            );

        }
    );


    updateOverallAttendance();

}


/* ======================================
   SUBJECT TARGET MESSAGE
====================================== */

function getSubjectMessage(subject) {

    const percentage =
        (
            subject.attended /
            subject.total
        ) * 100;


    /* BELOW TARGET */

    if (
        percentage <
        attendanceTarget
    ) {

        let attended =
            subject.attended;

        let total =
            subject.total;

        let needed = 0;


        while (
            (
                attended /
                total
            ) * 100 <
            attendanceTarget
        ) {

            attended++;

            total++;

            needed++;

        }


        return (
            "Attend next " +
            needed +
            " classes to reach " +
            attendanceTarget +
            "%"
        );

    }


    /* TARGET OR ABOVE */

    let futureTotal =
        subject.total;

    let missable = 0;


    while (
        (
            subject.attended /
            (futureTotal + 1)
        ) * 100 >=
        attendanceTarget
    ) {

        futureTotal++;

        missable++;

    }


    return (
        "You can miss " +
        missable +
        " classes and stay at or above " +
        attendanceTarget +
        "%"
    );

}


/* ======================================
   OVERALL ATTENDANCE
====================================== */

function updateOverallAttendance() {

    if (subjects.length === 0) {

        overallPercentage.textContent =
            "0%";

        overallClasses.textContent =
            "0 / 0 classes";

        overallMessage.textContent =
            "Add your subjects to calculate attendance";

        overallProgressBar.style.width =
            "0%";

        return;

    }


    let totalAttended = 0;

    let totalClasses = 0;


    subjects.forEach(
        function (subject) {

            totalAttended +=
                subject.attended;

            totalClasses +=
                subject.total;

        }
    );


    const overall =
        (
            totalAttended /
            totalClasses
        ) * 100;


    overallPercentage.textContent =
        overall.toFixed(2) +
        "%";


    overallClasses.textContent =
        totalAttended +
        " / " +
        totalClasses +
        " classes";


    overallProgressBar.style.width =
        Math.min(
            overall,
            100
        ) + "%";


    /* BELOW TARGET */

    if (
        overall <
        attendanceTarget
    ) {

        let attended =
            totalAttended;

        let total =
            totalClasses;

        let needed = 0;


        while (
            (
                attended /
                total
            ) * 100 <
            attendanceTarget
        ) {

            attended++;

            total++;

            needed++;

        }


        overallMessage.textContent =
            "⚠ Attend the next " +
            needed +
            " classes to reach " +
            attendanceTarget +
            "%";

    }


    /* TARGET OR ABOVE */

    else {

        let futureTotal =
            totalClasses;

        let missable = 0;


        while (
            (
                totalAttended /
                (futureTotal + 1)
            ) * 100 >=
            attendanceTarget
        ) {

            futureTotal++;

            missable++;

        }


        overallMessage.textContent =
            "✓ You can miss " +
            missable +
            " classes and remain at or above " +
            attendanceTarget +
            "%";

    }

}


/* ======================================
   EDIT SUBJECT
====================================== */

function editSubject(subject) {

    const newName =
        prompt(
            "Subject name:",
            subject.name
        );


    if (newName === null) {

        return;

    }


    const newAttended =
        prompt(
            "Classes attended:",
            subject.attended
        );


    if (newAttended === null) {

        return;

    }


    const newTotal =
        prompt(
            "Total classes:",
            subject.total
        );


    if (newTotal === null) {

        return;

    }


    const attended =
        Number(newAttended);

    const total =
        Number(newTotal);


    if (
        newName.trim() === "" ||
        newAttended.trim() === "" ||
        newTotal.trim() === "" ||
        !Number.isInteger(attended) ||
        !Number.isInteger(total) ||
        attended < 0 ||
        total <= 0 ||
        attended > total
    ) {

        alert(
            "Invalid attendance details."
        );

        return;

    }


    subject.name =
        newName.trim();

    subject.attended =
        attended;

    subject.total =
        total;


    saveSubjects();

    renderSubjects();

}


/* ======================================
   RESET
====================================== */

resetButton.addEventListener(
    "click",
    function () {

        if (
            subjects.length === 0
        ) {

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete all attendance data?"
            );


        if (!confirmed) {

            return;

        }


        subjects = [];


        saveSubjects();

        renderSubjects();

    }
);


/* ======================================
   ESCAPE HTML
====================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* ======================================
   INITIAL LOAD
====================================== */

renderSubjects();


/* ======================================
   SERVICE WORKER
====================================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function () {

            navigator
                .serviceWorker
                .register(
                    "./service-worker.js"
                )
                .then(
                    function () {

                        console.log(
                            "Attendify service worker registered."
                        );

                    }
                )
                .catch(
                    function (error) {

                        console.log(
                            "Service worker error:",
                            error
                        );

                    }
                );

        }
    );

}