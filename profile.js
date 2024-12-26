document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const profilePicInput = document.getElementById('profile-pic');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const closeButton = document.querySelector('.close-btn');
    const cancelButton = document.querySelector('.cancel-btn');
    const saveButton = document.querySelector('.save-btn');
  
    // Load saved profile data from localStorage
    const savedProfile = JSON.parse(localStorage.getItem('profile')) || {};
  
    // Set initial values based on saved profile data
    if (savedProfile.name) {
      nameInput.value = savedProfile.name;
    }
    if (savedProfile.email) {
      emailInput.value = savedProfile.email;
    }
    if (savedProfile.profilePic) {
      profilePicPreview.src = savedProfile.profilePic;
    }
  
    // Update profile picture preview when a file is selected
    profilePicInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          profilePicPreview.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Function to save profile data to localStorage
    function saveProfile() {
      const profileData = {
        name: nameInput.value,
        email: emailInput.value,
        profilePic: profilePicPreview.src
      };
      localStorage.setItem('profile', JSON.stringify(profileData));
      alert('Profile saved successfully!');
    }
  
    // Event listeners for buttons
    saveButton.addEventListener('click', () => {
      saveProfile();
    });
  
    cancelButton.addEventListener('click', () => {
      // Reset the form to saved profile data
      if (savedProfile.name) {
        nameInput.value = savedProfile.name;
      }
      if (savedProfile.email) {
        emailInput.value = savedProfile.email;
      }
      if (savedProfile.profilePic) {
        profilePicPreview.src = savedProfile.profilePic;
      }
    });
  
    closeButton.addEventListener('click', () => {
      // Close the profile modal
      window.close();
    });
  });
  