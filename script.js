
let students = [];
let currentActiveId = null;

// Register Student
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const idValue = document.getElementById('regID').value.trim();
    
    if (students.find(s => s.id === idValue)) {
        alert("VALIDATION ERROR: Student ID must be unique!");
        return;
    }

    const newStudent = {
        id: idValue,

        name: document.getElementById('regName').value,
        age: parseInt(document.getElementById('regAge').value),
        gender: document.getElementById('regGender').value,
        form: parseInt(document.getElementById('regForm').value),
        performance: []
    };

    students.push(newStudent);
    this.reset();
    renderTable(students);
});

// Render Table
function renderTable(dataToDisplay) {
    const list = document.getElementById('studentList');
    list.innerHTML = '';

    dataToDisplay.forEach(student => {
        const avg = getLatestAverage(student);
        const row = `<tr>
            <td><b>${student.id}</b></td>
            <td>${student.name}</td>
            <td>Form ${student.form}</td>
            <td>${avg !== null ? avg + '%' : 'N/A'}</td>
            <td>
                <button class="btn btn-view" onclick="openModal('${student.id}')">Results</button>
                <button class="btn btn-delete" onclick="deleteStudent('$

{student.id}')">Delete</button>
            </td>
        </tr>`;
        list.innerHTML += row;
    });
}

// Calculate Average
function getLatestAverage(student) {
    const currentRes = student.performance.find(p => p.form === student.form);
    if (!currentRes) return null;
    const s = currentRes.subjects;
    return ((s.math + s.english + s.science + s.social) / 4).toFixed(1);
}

// Search
function filterStudents() {
    const term = 

document.getElementById('searchBox').value.toLowerCase();
    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(term) || s.id.toLowerCase().includes(term)
    );
    renderTable(filtered);
}

// Modal Functions
function openModal(id) {
    const s = students.find(st => st.id === id);
    currentActiveId = id;
    document.getElementById('modalTitle').innerText = "Results for " + s.name;
    document.getElementById('perfLevel').value = s.form;

    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

function savePerformance() {
    const student = students.find(s => s.id === currentActiveId);
    const targetForm = 

parseInt(document.getElementById('perfLevel').value);

    const newRecord = {
        form: targetForm,
        subjects: {
            math: parseInt(document.getElementById('mX').value) || 0,
            english: parseInt(document.getElementById('eX').value) || 0,
            science: parseInt(document.getElementById('sX').value) || 0,
            social: parseInt(document.getElementById('ssX').value) || 0
        }
    };

    const index = student.performance.findIndex(p => p.form === targetForm);
    if (index > -1) student.performance[index] = newRecord;
    else student.performance.push(newRecord);

    if (targetForm > student.form) student.form = targetForm;

    closeModal();
    renderTable(students);
}

function deleteStudent(id) {
    if (confirm("Delete record?")) {
        students = students.filter(s => s.id !== id);
        renderTable(students);

    }
}
