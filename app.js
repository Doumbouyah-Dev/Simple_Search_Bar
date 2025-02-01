const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const loader = document.querySelector('.loader');

// Sample data//
const items = [
  { id: 1, 
  title: 'Introduction to JavaScript', 
  description: 'Learn the basics of JavaScript programming', 
  category: 'Programming' },
  { id: 2, 
  title: 'Web Development Basics', 
  description: 'HTML, CSS, and fundamental concepts', 
  category: 'Web Development' },
  { id: 3, 
  title: 'Advanced CSS Techniques', 
  description: 'Modern CSS features and best practices', 
  category: 'Web Design' },
  { id: 4, title: 'JavaScript ES6 Features', description: 'Explore modern JavaScript syntax and features', category: 'Programming' },
  { id: 5, title: 'Responsive Web Design', description: 'Techniques for building mobile-friendly websites', category: 'Web Design' },
  { id: 6, title: 'React.js Fundamentals', description: 'Learn the basics of React.js for front-end development', category: 'Web Development' },
  { id: 7, title: 'Node.js and Express', description: 'Backend development with Node.js and Express framework', category: 'Programming' },
  { id: 8, title: 'Database Management with MongoDB', description: 'Understanding NoSQL databases with MongoDB', category: 'Database' },
  { id: 9, title: 'Python for Beginners', description: 'Introduction to Python programming', category: 'Programming' },
  { id: 10, title: 'Data Structures and Algorithms', description: 'Key concepts for efficient coding', category: 'Computer Science' },
  { id: 11, title: 'Building REST APIs', description: 'Create and manage RESTful APIs', category: 'Backend Development' },
  { id: 12, title: 'Version Control with Git', description: 'Master Git for better code collaboration', category: 'Software Development' },
  { id: 13, title: 'JavaScript Asynchronous Programming', description: 'Promises, async/await, and event loops', category: 'Programming' },
  { id: 14, title: 'Cybersecurity Basics', description: 'Essential cybersecurity principles', category: 'Security' },
  { id: 15, title: 'Web Performance Optimization', description: 'Techniques to speed up websites', category: 'Web Development' },
  { id: 16, title: 'Introduction to Machine Learning', description: 'Basic concepts of machine learning and AI', category: 'Artificial Intelligence' },
  { id: 17, title: 'CSS Animations and Transitions', description: 'Enhancing UI with CSS effects', category: 'Web Design' },
  { id: 18, title: 'Docker for Developers', description: 'Containerization and deployment strategies', category: 'DevOps' },
  { id: 19, title: 'GraphQL Basics', description: 'Introduction to GraphQL for API development', category: 'Backend Development' },
  { id: 20, title: 'Testing in JavaScript', description: 'Unit and integration testing with Jest', category: 'Software Development' },
  { id: 21, title: 'UI/UX Design Principles', description: 'Understanding user experience and interface design', category: 'Design' },
  { id: 22, title: 'Progressive Web Apps (PWA)', description: 'Building modern web applications with PWA concepts', category: 'Web Development' },
  { id: 23, title: 'Cloud Computing Basics', description: 'Introduction to cloud services and architecture', category: 'Cloud Computing' },
  { id: 24, title: 'Blockchain Fundamentals', description: 'Understanding blockchain technology and its applications', category: 'Technology' }
 
        ];

// Debounce function to limit API calls//
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

async function fetchResults(query) {
  // Simulate API call delay
  loader.style.display = 'block';
  await new Promise(resolve => setTimeout(resolve, 500));

  return items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );
}

async function displayResults(query) {
  if (!query) {
    searchResults.style.display = 'none';
    return;
  }

  const results = await fetchResults(query);
  loader.style.display = 'none';

  if (results.length > 0) {
    const htmlString = results.map(item => `
                    <div class="result-item" data-id="${item.id}">
                        <div class="result-content">
                            <h3>${highlightText(item.title, query)}</h3>
                            <p>${highlightText(item.description, query)}</p>
                            <small>Category: ${item.category}</small>
                        </div>
                    </div>
                `).join('');

    searchResults.innerHTML = htmlString;
    searchResults.style.display = 'block';
  } else {
    searchResults.innerHTML = '<div class="no-results">No results found</div>';
    searchResults.style.display = 'block';
  }
}

// Event listeners//
searchInput.addEventListener('input', debounce(e => {
  displayResults(e.target.value.trim());
}));

// Close results when clicking outside//
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

// Handle result item clicks//
searchResults.addEventListener('click', (e) => {
  const resultItem = e.target.closest('.result-item');
  if (resultItem) {
    const itemId = resultItem.dataset.id;
    // Handle item selection//
    console.log('Selected item ID:', itemId);
    searchResults.style.display = 'none';
  }
});
