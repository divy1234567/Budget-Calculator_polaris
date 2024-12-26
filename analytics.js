document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const totalLogins = document.getElementById('total-logins');
    const activityList = document.getElementById('activity-list');
    const backButton = document.querySelector('.back-btn');
    const closeButton = document.querySelector('.close-btn');
  
    // Example analytics data (you can fetch this from a real API)
    const analyticsData = {
      totalLogins: 50,
      activity: [
        'Logged in 2 hours ago',
        'Updated profile 1 day ago',
        'Changed password 3 days ago',
        'Logged in 5 days ago',
        'Uploaded new profile picture 7 days ago'
      ],
      usageTrends: [10, 25, 35, 45, 60, 70, 80, 90, 100, 120]
    };
  
    // Set the total logins
    totalLogins.textContent = analyticsData.totalLogins;
  
    // Display recent activity
    analyticsData.activity.forEach(activity => {
      const li = document.createElement('li');
      li.textContent = activity;
      activityList.appendChild(li);
    });
  
    // Display usage trends chart
    const ctx = document.getElementById('usage-chart').getContext('2d');
    const usageChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'User Activity (logins)',
          data: analyticsData.usageTrends,
          backgroundColor: 'rgba(0, 255, 149, 0.2)',
          borderColor: 'rgba(0, 255, 149, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
  
    // Event listener for back button
    backButton.addEventListener('click', () => {
      window.location.href = 'profile.html'; // Go back to the Profile page
    });
  
    // Event listener for close button
    closeButton.addEventListener('click', () => {
      window.close(); // Close the analytics page
    });
  });
  