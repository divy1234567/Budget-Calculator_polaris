
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');
const totalItems = document.getElementById('totalItems');
let expenses = [];
function updateSummary() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalAmount.textContent = `$${total.toFixed(2)}`;
  totalItems.textContent = expenses.length;
}
function renderExpenseList() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
      <div>
        <p>${expense.description}</p>
        <p>$${expense.amount}</p>
        <p>${expense.category}</p>
        <p>${expense.date}</p>
      </div>
      <button class="remove-button" data-index="${index}">Remove</button>
    `;
    expenseList.appendChild(expenseItem);
  });
  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      expenses.splice(index, 1);
      updateSummary(); 
      renderExpenseList(); 
    });
  });
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;
  if (!description || !amount || !category || !date) {
    alert('Please fill in all the fields');
    return;
  }
  const newExpense = {
    description,
    amount,
    category,
    date,
  };
  expenses.push(newExpense);
  expenseForm.reset();
  updateSummary();
  renderExpenseList();
});
updateSummary();
renderExpenseList();

// Check for JWT token on page load
function checkAuthentication() {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage (or sessionStorage)

  if (!token) {
      // If token is not found, redirect to the login page
      window.location.href = '/login.html'; // Redirect to login page
  } else {
      // Optionally, you can verify token validity on the server side via an API call
      verifyToken(token);
  }
}

// Verify token by sending a request to the backend
async function verifyToken(token) {
  try {
      const response = await fetch('http://localhost:5000/verify-token', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      const data = await response.json();

      if (response.ok) {
          console.log('Token is valid:', data);
          // Proceed to homepage
          // Your homepage content will load here
      } else {
          // Invalid token, redirect to login
          window.location.href = '/login.html';
      }
  } catch (error) {
      console.error('Error verifying token:', error);
      window.location.href = '/login.html'; // Redirect on error as well
  }
}

// Call checkAuthentication() when the page loads
document.addEventListener('DOMContentLoaded', checkAuthentication);
