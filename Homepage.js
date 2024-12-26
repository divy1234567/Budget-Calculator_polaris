// Check authentication on page load
function checkAuth() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
      window.location.href = './index.html';
      return null;
  }
  return currentUser;
}

// Get current user's data
function getCurrentUserData() {
  const currentUser = checkAuth();
  if (!currentUser) return null;
  
  const users = JSON.parse(localStorage.getItem('users')) || {};
  return users[currentUser];
}

// Initialize the page with user data
function initializePage() {
  const userData = getCurrentUserData();
  if (!userData) return;

  // Show logout button
  document.getElementById('logoutButton').style.display = 'block';
  
  // Update limits display
  document.querySelector('.monthly-limit h3').textContent = `$${userData.monthlyLimit}/-`;
  document.querySelector('.yearly-limit h3').textContent = `$${userData.yearlyLimit}/-`;
  
  // Calculate and display total balance
  const totalExpenses = userData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.querySelector('.total-balance h3').textContent = `$${totalExpenses.toFixed(2)}/-`;
  
  // Update expense list and summary
  updateExpenseList();
  updateSummary();
}

// Handle adding new expense
document.getElementById('expenseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const expense = {
      description: document.getElementById('description').value,
      amount: parseFloat(document.getElementById('amount').value),
      category: document.getElementById('category').value,
      date: document.getElementById('date').value,
      timestamp: new Date().toISOString()
  };
  
  // Get current user's data
  const currentUser = checkAuth();
  const users = JSON.parse(localStorage.getItem('users'));
  
  // Add expense to user's data
  users[currentUser].expenses.push(expense);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Update display
  updateExpenseList();
  updateSummary();
  
  // Reset form
  this.reset();
});

// Update expense list display
function updateExpenseList() {
  const userData = getCurrentUserData();
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';
  
  if (!userData || !userData.expenses) return;
  
  userData.expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(expense => {
      const expenseElement = document.createElement('div');
      expenseElement.className = 'expense-item';
      expenseElement.innerHTML = `
          <div class="expense-info">
              <h3>${expense.description}</h3>
              <p>${expense.category} - ${expense.date}</p>
          </div>
          <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
      `;
      expenseList.appendChild(expenseElement);
  });
}

// Update summary section
function updateSummary() {
  const userData = getCurrentUserData();
  if (!userData || !userData.expenses) return;
  
  const totalAmount = userData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
  document.getElementById('totalItems').textContent = userData.expenses.length;
  
  // Update total balance
  document.querySelector('.total-balance h3').textContent = `$${totalAmount.toFixed(2)}/-`;
}

// Handle logout
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('loginTime');
  window.location.href = 'login.html';
});

// Initialize page on load
window.addEventListener('load', initializePage);