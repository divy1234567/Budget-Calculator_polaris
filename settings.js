document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const currencySelect = document.getElementById('currency-select');
    const monthlyBudgetInput = document.getElementById('monthly-budget-input');
    const yearlyBudgetInput = document.getElementById('yearly-budget-input');
    const monthlyBudgetRadio = document.getElementById('monthly-budget');
    const yearlyBudgetRadio = document.getElementById('yearly-budget');
    const closeButton = document.querySelector('.close-btn');
    const cancelButton = document.querySelector('.cancel-btn');
    const saveButton = document.querySelector('.save-btn');
  
    // Load saved preferences from localStorage
    const savedPreferences = JSON.parse(localStorage.getItem('settings')) || {};
  
    // Set initial values based on saved preferences
    if (savedPreferences.currency) {
      currencySelect.value = savedPreferences.currency;
    }
    if (savedPreferences.budgetFrequency) {
      if (savedPreferences.budgetFrequency === 'monthly') {
        monthlyBudgetRadio.checked = true;
        monthlyBudgetInput.style.display = 'block';
        yearlyBudgetInput.style.display = 'none';
      } else if (savedPreferences.budgetFrequency === 'yearly') {
        yearlyBudgetRadio.checked = true;
        yearlyBudgetInput.style.display = 'block';
        monthlyBudgetInput.style.display = 'none';
      }
    }
    if (savedPreferences.monthlyBudget) {
      monthlyBudgetInput.value = savedPreferences.monthlyBudget;
    }
    if (savedPreferences.yearlyBudget) {
      yearlyBudgetInput.value = savedPreferences.yearlyBudget;
    }
  
    // Event listener for radio buttons to toggle input visibility
    monthlyBudgetRadio.addEventListener('change', () => {
      monthlyBudgetInput.style.display = 'block';
      yearlyBudgetInput.style.display = 'none';
    });
    yearlyBudgetRadio.addEventListener('change', () => {
      yearlyBudgetInput.style.display = 'block';
      monthlyBudgetInput.style.display = 'none';
    });
  
    // Function to save settings to localStorage
    function saveSettings() {
      const settings = {
        currency: currencySelect.value,
        budgetFrequency: monthlyBudgetRadio.checked ? 'monthly' : 'yearly',
        monthlyBudget: monthlyBudgetInput.value ? parseFloat(monthlyBudgetInput.value) : null,
        yearlyBudget: yearlyBudgetInput.value ? parseFloat(yearlyBudgetInput.value) : null
      };
      localStorage.setItem('settings', JSON.stringify(settings));
      alert('Settings saved successfully!');
    }
  
    // Event listeners for buttons
    saveButton.addEventListener('click', () => {
      saveSettings();
    });
  
    cancelButton.addEventListener('click', () => {
      // Reset the form to saved preferences
      if (savedPreferences.currency) {
        currencySelect.value = savedPreferences.currency;
      }
      if (savedPreferences.budgetFrequency) {
        if (savedPreferences.budgetFrequency === 'monthly') {
          monthlyBudgetRadio.checked = true;
          monthlyBudgetInput.style.display = 'block';
          yearlyBudgetInput.style.display = 'none';
        } else if (savedPreferences.budgetFrequency === 'yearly') {
          yearlyBudgetRadio.checked = true;
          yearlyBudgetInput.style.display = 'block';
          monthlyBudgetInput.style.display = 'none';
        }
      }
      if (savedPreferences.monthlyBudget) {
        monthlyBudgetInput.value = savedPreferences.monthlyBudget;
      }
      if (savedPreferences.yearlyBudget) {
        yearlyBudgetInput.value = savedPreferences.yearlyBudget;
      }
    });
  
    closeButton.addEventListener('click', () => {
     
      window.close();
    });
  });
  