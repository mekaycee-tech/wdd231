const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the basic concepts of program structure and design.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to simple software building tools.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students learn to write functions and organized procedural code.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces classes, objects, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students learn to create dynamic websites using JavaScript and DOM manipulation.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students learn UX, responsive layout, API fetching, and accessibility standards.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const courseContainer = document.getElementById("course-container");
  const totalCreditsEl = document.getElementById("total-credits");
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");

  function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";
    
    filteredCourses.forEach(course => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      if (course.completed) {
        card.classList.add("completed");
      }
      card.textContent = `${course.subject} ${course.number}`;
      courseContainer.appendChild(card);
    });

    // Array.reduce requirement fulfilled here
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.id;
      if (filter === "filter-cse") {
        displayCourses(courses.filter(c => c.subject === "CSE"));
      } else if (filter === "filter-wdd") {
        displayCourses(courses.filter(c => c.subject === "WDD"));
      } else {
        displayCourses(courses);
      }
    });
  });

  // Initial render
  displayCourses(courses);
});