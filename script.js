document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling bg
    }

    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event Listeners
    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)');

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight.matches)) {
        document.body.classList.add('light-mode');
    }

    // Listen for system theme changes
    systemPrefersLight.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('light-mode', e.matches);
        }
    });

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }

    // Scroll Spy Logic
    const navLinks = document.querySelectorAll('.nav-links a, .sidebar-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                const id = section.getAttribute('id');
                if (id) {
                    current = id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (current) {
                if (href.includes(`#${current}`)) {
                    link.classList.add('active');
                }
            } else {
                if (href === 'index.html') {
                    link.classList.add('active');
                }
            }
        });
    });

    // Tab Switching Logic for Notes Page
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Hide all contents
                tabContents.forEach(content => content.classList.remove('active'));
                // Show target content
                const targetId = btn.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Check for URL parameters to switch tabs on load
        const urlParams = new URLSearchParams(window.location.search);
        const yearParam = urlParams.get('year');

        if (yearParam) {
            const targetTabBtn = document.querySelector(`.tab-btn[data-tab="year-${yearParam}"]`);
            if (targetTabBtn) {
                targetTabBtn.click();
            }
        }
    }

    // Subject Accordion Logic
    const subjectHeaders = document.querySelectorAll('.subject-header');
    subjectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.parentElement;

            // Close other open cards
            document.querySelectorAll('.subject-card.active').forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                }
            });

            card.classList.toggle('active');
        });
    });

    // AKTU Subject Data (Standard Credit Scheme for CSE/AIML)
    const aktuSubjects = {
        "sem1": [
            { name: "Engg Physics", credit: 4 },
            { name: "Engg Math-I", credit: 4 },
            { name: "Basic Electrical", credit: 3 },
            { name: "PPS", credit: 3 },
            { name: "Ecology", credit: 3 },
            { name: "Physics Lab", credit: 1 },
            { name: "Electrical Lab", credit: 1 },
            { name: "Programming Lab", credit: 1 },
            { name: "Graphics Lab", credit: 2 }
        ],
        "sem2": [
            { name: "Engg Chemistry", credit: 4 },
            { name: "Engg Math-II", credit: 4 },
            { name: "Basic Electronics", credit: 3 },
            { name: "Mechanical", credit: 3 },
            { name: "Soft Skills", credit: 3 },
            { name: "Chemistry Lab", credit: 1 },
            { name: "Electronics Lab", credit: 1 },
            { name: "English Lab", credit: 1 },
            { name: "Workshop", credit: 2 }
        ],
        "sem3": [
            { name: "Engg Maths-III", credit: 4 },
            { name: "Universal Human Value", credit: 3 },
            { name: "Data Structures", credit: 4 },
            { name: "Computer Org & Arch", credit: 4 },
            { name: "Discrete Structures", credit: 3 },
            { name: "Data Structures Lab", credit: 1 },
            { name: "COA Lab", credit: 1 },
            { name: "Web Designing Workshop", credit: 1 },
            { name: "Cyber Security", credit: 2 },
            { name: "Mini Project / Internship", credit: 2 }
        ],
        "sem4": [
            { name: "Maths-IV", credit: 4 },
            { name: "Technical Communication", credit: 3 },
            { name: "Operating Systems", credit: 4 },
            { name: "Automata Theory", credit: 4 },
            { name: "Object Orient Programming", credit: 3 },
            { name: "Operating Systems Lab", credit: 1 },
            { name: "Object Oriented Programming Lab", credit: 1 },
            { name: "Cyber Security Workshop", credit: 1 },
            { name: "Python Programming", credit: 2 }
        ],
        "sem5": [
            { name: "DBMS", credit: 4 },
            { name: "Web Technology", credit: 4 },
            { name: "Design & Analysis of Algo", credit: 4 },
            { name: "Dept. Elective-I", credit: 3 },
            { name: "Dept. Elective-II", credit: 3 },
            { name: "DBMS Lab", credit: 1 },
            { name: "Web Technology Lab", credit: 1 },
            { name: "Design & Analysis of Algo Lab", credit: 1 },
            { name: "Mini Project", credit: 2 }
        ],
        "sem6": [
            { name: "Software Engineering", credit: 4 },
            { name: "Compiler Design", credit: 4 },
            { name: "Computer Networks", credit: 4 },
            { name: "Dept. Elective-III", credit: 3 },
            { name: "Open Elective-I", credit: 3 },
            { name: "Software Engineering Lab", credit: 1 },
            { name: "Compiler Design Lab", credit: 1 },
            { name: "Computer Networks Lab", credit: 1 }
        ],
        "sem7": [
            { name: "Artificial Intelligence", credit: 3 },
            { name: "Dept. Elective-IV", credit: 3 },            
            { name: "Open Elective-II", credit: 3 },
            { name: "Artificial Intelligence Lab", credit: 1 },
            { name: "Mini Project", credit: 2 },
            { name: "Project-I", credit: 5 },
            { name: "Startup and Entrepreneurial Activity", credit: 2 }
        ],
        "sem8": [
            { name: "Open Elective-III", credit: 3 },
            { name: "Open Elective-IV", credit: 3 },
            { name: "Project-II", credit: 10 }
        ]
    };

    // --- Calculator Logic ---
    const sgpaContainer = document.getElementById('sgpa-rows');
    const semesterSelect = document.getElementById('semester-select');

    if (sgpaContainer) {
        // Semester Selection Listener
        if (semesterSelect) {
            semesterSelect.addEventListener('change', (e) => {
                renderSemesterRows(e.target.value);
            });
        }

        // Calculate SGPA
        document.getElementById('calculate-sgpa-btn').addEventListener('click', calculateSGPA);

        // Calculate YGPA
        document.getElementById('calculate-ygpa-btn').addEventListener('click', calculateYGPA);

        // Calculate CGPA
        document.getElementById('calculate-cgpa-btn').addEventListener('click', calculateCGPA);
    }

    function renderSemesterRows(semester) {
        sgpaContainer.innerHTML = ''; // Clear existing
        if (!semester || !aktuSubjects[semester]) return;

        const subjects = aktuSubjects[semester];
        subjects.forEach(sub => {
            const row = document.createElement('div');
            row.className = 'calc-row';
            row.style.gridTemplateColumns = '2fr 1fr 1fr'; // Adjust layout for name
            row.innerHTML = `
                <div class="calc-label" style="align-self: center; margin: 0; font-weight: 500; color: var(--text-dark);">${sub.name}</div>
                <input type="number" class="calc-input credit-input" value="${sub.credit}" min="0" style="text-align: center;" placeholder="Credits">
                <input type="text" class="calc-input grade-input" placeholder="Grade/Pt">
            `;
            sgpaContainer.appendChild(row);
        });
    }

    function calculateSGPA() {
        const rows = document.querySelectorAll('#sgpa-rows .calc-row');
        let totalCredits = 0;
        let totalPoints = 0;

        rows.forEach(row => {
            const credit = parseFloat(row.querySelector('.credit-input').value);
            const gradeVal = row.querySelector('.grade-input').value.trim().toUpperCase();

            if (!isNaN(credit) && gradeVal) {
                let point = 0;
                // Check if input is marks (number) or grade (string)
                if (!isNaN(gradeVal)) {
                    const marks = parseFloat(gradeVal);
                    if (marks >= 90) point = 10;
                    else if (marks >= 80) point = 9;
                    else if (marks >= 70) point = 8;
                    else if (marks >= 60) point = 7;
                    else if (marks >= 50) point = 6;
                    else if (marks >= 45) point = 5;
                    else if (marks >= 40) point = 4;
                    else point = 0;
                } else {
                    // Grade Mapping
                    switch (gradeVal) {
                        case 'O': point = 10; break;
                        case 'A+': point = 9; break;
                        case 'A': point = 8; break;
                        case 'B+': point = 7; break;
                        case 'B': point = 6; break;
                        case 'C': point = 5; break;
                        case 'P': point = 4; break;
                        case 'F': point = 0; break;
                        default: point = 0;
                    }
                }

                totalCredits += credit;
                totalPoints += (credit * point);
            }
        });

        const resultBox = document.getElementById('sgpa-result');
        if (totalCredits > 0) {
            const sgpa = (totalPoints / totalCredits).toFixed(2);
            resultBox.querySelector('span').textContent = sgpa;
            resultBox.classList.add('show');
        } else {
            alert('Please enter valid credits and grades/marks.');
        }
    }

    function calculateYGPA() {
        const odd = parseFloat(document.getElementById('ygpa-odd').value);
        const even = parseFloat(document.getElementById('ygpa-even').value);
        const resultBox = document.getElementById('ygpa-result');

        if (!isNaN(odd) && !isNaN(even)) {
            const ygpa = ((odd + even) / 2).toFixed(2);
            resultBox.querySelector('span').textContent = ygpa;
            resultBox.classList.add('show');
        } else {
            alert('Please enter valid SGPA for both semesters.');
        }
    }

    function calculateCGPA() {
        const inputs = document.querySelectorAll('.cgpa-input');
        let totalSgpa = 0;
        let count = 0;

        inputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) {
                totalSgpa += val;
                count++;
            }
        });

        const resultBox = document.getElementById('cgpa-result');
        if (count > 0) {
            const cgpa = (totalSgpa / count).toFixed(2);
            resultBox.querySelector('span').textContent = cgpa;
            resultBox.classList.add('show');
        } else {
            alert('Please enter SGPA for at least one semester.');
        }
    }
});
