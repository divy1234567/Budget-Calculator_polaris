
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const goalStatus = document.getElementById('goal-status');
    const goalAmountInput = document.getElementById('goal-amount');
    const currentSavingsInput = document.getElementById('current-savings');
    const setGoalButton = document.getElementById('set-goal-btn');
    function updateProgress() {
      const goalAmount = parseFloat(goalAmountInput.value);
      const currentSavings = parseFloat(currentSavingsInput.value);
  
      if (isNaN(goalAmount) || isNaN(currentSavings)) {
        goalStatus.textContent = 'Please enter valid amounts';
        return;
      }
  
      if (goalAmount === 0) {
        progressBar.style.width = '0%';
        goalStatus.textContent = 'Saved: $0 / $0';
        return;
      }
      const progress = (currentSavings / goalAmount) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`; 
      goalStatus.textContent = `Saved: $${currentSavings.toFixed(2)} / $${goalAmount.toFixed(2)}`;
    }
    setGoalButton.addEventListener('click', () => {
      updateProgress();
    });
    goalAmountInput.addEventListener('input', updateProgress);
    currentSavingsInput.addEventListener('input', updateProgress);
  });
  