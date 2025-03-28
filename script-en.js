document.addEventListener("DOMContentLoaded", function () {
  // Committees Data
  const committees = [
    {
      name: "Committee 1",
      members: ["912343", "912343", "412042", "912343", "912343", "610007", "810006", "310006", "410005", "912042", "912042", "212046", "410006", "912042", "410005", "310006", "810006", "610007", "712004", "412042"],
      memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Iqra", "Waqas Ahmed", "Waqas Ahmed", "Muhammad Anis", "Umm-e-Hasnain", "Faizan", "Hasan Gul", "Zohaib", "Zohaib", "Ahtisham", "Haroon", "Zohaib", "Hasan Gul", "Faizan", "Umm-e-hasnain", "Muhammad Anis", "S M Masood-ul-Hasan Shah", "Iqra"],
      startDate: new Date("2024-05-01"),
      committeePrice: 2500,
      isClosed: false,
    },
    {
      name: "Committee 2",
      members: ["912343", "912343", "412042", "912343", "912343", "412042", "802006", "912343", "302006", "912042", "912042", "212046", "412042", "912042", "302006", "912343", "802006", "412042", "412042", "712004"],
      memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Iqra", "Waqas Ahmed", "Waqas Ahmed", "Iqra", "Usman", "Waqas Ahmed", "Farhan", "Zohaib", "Zohaib", "Ahtisham", "Iqra", "Zohaib", "Farhan", "Waqas Ahmed", "Usman", "Iqra", "Iqra", "S M Masood-ul-Hasan Shah"],
      startDate: new Date("2024-05-01"),
      committeePrice: 2500,
      isClosed: false,
    },
    {
      name: "Committee 3",
      members: ["912343", "912343", "600304", "600304", "700306", "700304", "600303", [ "600344", "900304" ], "400306", "700303", "700303", "700303", "700303", "400306", [ "600344", "900304" ], "600303", "700304", "700306", "600304", "600304"], // Example codes
      memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Misbah", "Misbah", "Ramzan", "Shahzad Shah", "Muhammad Saad", ["Meer Mehran Bhatti", "Zeeshan Bhatti"], "Hassan", "Shahid", "Shahid", "Shahid", "Shahid", "Hassan", ["Meer Mehran Bhatti", "Zeeshan Bhatti"], "Muhammad Saad", "Shahzad Shah", "Ramzan", "Misbah", "Misbah"], // Corresponding names
      startDate: new Date("2024-07-01"),
      committeePrice: 2500,
      isClosed: false,
    },
    {
      name: "Committee 4",
      members: [
        "200042", //1
        "412042", //2
        "912343",  // User ka code (Month 1)  //3
        "212046", //4
        "412042", //5
        ["912042", "912343"],  // User ka code (Month 2) //6
        "800042", //7
        ["912042", "912042", "700042", "912343"],  // User ka code (Month 4)  //8
        "200047", //9
        "400042", //10
        "412042", //11
        "412042", //12
        "212046", //13
        "412042", //14
        "600046", //15
        "200046", //16
        ["800043", "912343"],  // User ka code (Month 5)  //17
        "700047", //18
        "912042", //19
        "600344", //20
        "200042", //21
        ["212046", "212046", "700042", "912343"], //22
        "600046", //23
        "400046", //24
        "700047", //25
        "912042", //26
        "800042", //27
        "412042", //28
        "200042", //29
        "200042"  //30
      ],      
      memberNames: ["Aliya", "Iqra", "Waqas", "Ahtisham", "Iqra", ["Zohaib", "Waqas Ahmed"], "Tasbiha", ["Zohaib", "Zohaib", "Syeda Shahida", "Waqas"], "Atiq", "Humaira", "Iqra", "Iqra", "Ahtisham", "Iqra", "Mehrin", "Ubaid Raza", ["Ubaid", "Waqas"], "Shakoor", "Zohaib", "Meer Mehran Bhatti", "Aliya", ["Ahtisham", "Ahtisham", "Syeda Shahida", "Waqas"], "Mehrin", "Hareem Fatima Hunain", "Shakoor", "Zohaib", "Tasbiha", "Iqra", "Aliya", "Aliya"], // Corresponding names
      startDate: new Date("2025-02-01"),
      committeePrice: 10000,
      isClosed: false,
    },
  ];

  // Function to calculate end date
  function calculateEndDate(startDate, totalMonths) {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + totalMonths - 1);
    return endDate.toLocaleString("default", { month: "long", year: "numeric" });
  }

  // Function to calculate months passed
  function calculateMonthsPassed(startDate) {
    const currentDate = new Date();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return (currentYear - startYear) * 12 + (currentMonth - startMonth);
  }

// Function to get user details
function getUserDetails(code) {
  let userDetails = [];
  let userName = ""; // Store user name for greeting
  let isFirstCommittee = true; // Flag to check if it's the first committee

  committees.forEach((committee) => {
    // Check if the code exists in the committee members (including arrays)
    const memberIndexes = committee.members
      .map((member, index) => {
        if (Array.isArray(member)) {
          return member.includes(code) ? index : -1; // Check if code exists in the array
        } else {
          return member === code ? index : -1; // Direct comparison for non-array members
        }
      })
      .filter((index) => index !== -1); // Filter out invalid indexes

    if (memberIndexes.length > 0) {
      const totalMembers = committee.members.length;
      const startDate = committee.startDate.toLocaleString("default", { month: "long", year: "numeric" });
      const endDate = calculateEndDate(committee.startDate, totalMembers);

      // Calculate months passed
      const monthsPassed = calculateMonthsPassed(committee.startDate);

      // Get all months and their details for the user
      const monthDetails = committee.members
        .map((member, index) => {
          if (member === code || (Array.isArray(member) && member.includes(code))) {
            const slot = committee.members[index];
            const slotLength = Array.isArray(slot) ? slot.length : 1;
            const contribution = committee.committeePrice / slotLength;
            const monthlyAmount = contribution * totalMembers;

            const monthDate = new Date(committee.startDate);
            monthDate.setMonth(monthDate.getMonth() + index);

            // Get the correct name for the code
            const name = committee.memberNames[index];
            const displayName = Array.isArray(name) ? name[member.indexOf(code)] : name;

            return {
              monthNumber: index + 1,
              contribution: contribution,
              monthlyAmount: monthlyAmount,
              date: monthDate.toLocaleString("default", { month: "long", year: "numeric" }),
              name: displayName, // Add name to the month details
            };
          }
          return null;
        })
        .filter((month) => month !== null);

      // Format the months list
      const monthsList = monthDetails
        .map((month) => `You are paying <strong>${month.contribution}</strong> Rupee per month, Your Committee number is <strong>${month.monthNumber}</strong> and you will receive Rs. <strong>${month.monthlyAmount}</strong> Rupee in <strong>${month.date}۔</strong>`)
        .join("<br>");

      // Set user name from the first committee
      if (isFirstCommittee) {
        userName = monthDetails[0].name; // Use the name from the first month details
        userDetails.push(`<p>Salam! <strong>${userName}</strong>, I hope you are well.</p>`);
        isFirstCommittee = false;
      }

      // Add committee details
      userDetails.push(`
        <p class="committee-join-message">You are now a key member of <strong>${committee.name}</strong>, essential to our mission.</p>
        <p class="txt-left">Committee started from <strong>${startDate}</strong>.</p>
        <p class="txt-left">We are now in the <strong>${monthsPassed + 1}th</strong> month of the committee's tenure.</p>
        <p class="txt-left">You own <strong>${monthDetails.length}</strong> numbers on our committee.</p>
        <p class="txt-left">${monthsList}</p>
        <p class="txt-left">This committee will be finished by  <strong>${endDate}</strong>.</p>
        <hr>
      `);
    }
  });

  // Agar koi details nahi mili, toh invalid code ka message return karo
  if (userDetails.length === 0) {
    return "<p>Invalid code. Please enter a valid 6-digit code.</p>";
  }

  return userDetails.join("");
}

// Event listener for Check Details button
  const userCodeInput = document.getElementById("user-code");
  const checkDetailsButton = document.querySelector(".button");
  const userDetailsCard = document.getElementById("user-details");
  const userMessage = document.getElementById("user-message");
  const whatsappLink = document.getElementById("whatsapp-link");
  const closeButton = document.querySelector(".close-button");

  if (checkDetailsButton && userCodeInput && userDetailsCard && userMessage && whatsappLink && closeButton) {
    checkDetailsButton.addEventListener("click", function () {
      const userCode = userCodeInput.value.trim();
      if (userCode.length === 6) {
        const details = getUserDetails(userCode);
        if (details) {
          userMessage.innerHTML = details;
          userDetailsCard.style.display = "block";
          userDetailsCard.classList.add("visible"); // Add visible class for smooth transition
          whatsappLink.href = `https://wa.me/923001234567?text=Hello, I have a query about my committee (Code: ${userCode}).`;
        } else {
          userMessage.innerHTML = "<p>Invalid code. Please enter a valid 6-digit code.</p>";
          userDetailsCard.style.display = "block";
          userDetailsCard.classList.add("visible"); // Add visible class for smooth transition
        }
      } else {
        showCustomAlert("Please enter a valid 6-digit code.");
      }
    });

    // Event listener for Close button
    closeButton.addEventListener("click", function () {
      userDetailsCard.style.display = "none";
      userDetailsCard.classList.remove("visible"); // Remove visible class for smooth transition
      userCodeInput.value = "";
    });
  } else {
    console.error("One or more elements not found. Check your HTML IDs.");
  }
});












document.addEventListener("DOMContentLoaded", function () {
  

  // Committees Data
  const committees = [
    {
      name: "Committee 1",
      members: ["912343", "912343", "412042", "912343", "912343", "610007", "810006", "310006", "410005", "912042", "912042", "212046", "410006", "912042", "410005", "310006", "810006", "610007", "712004", "412042"], // Example codes
      memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Iqra", "Waqas Ahmed", "Waqas Ahmed", "Muhammad Anis", "Umm-e-Hasnain", "Faizan", "Hasan Gul", "Zohaib", "Zohaib", "Ahtisham", "Haroon", "Zohaib", "Hasan Gul", "Faizan", "Umm-e-hasnain", "Muhammad Anis", "S M Masood-ul-Hasan Shah",  "Iqra"], // Member names
      startDate: new Date("2024-05-01"),
      committeePrice: 2500,
      currentIndex: 0,
      isClosed: false,
    },
    {
      name: "Committee 2",
      members: ["912343", "912343", "412042", "912343", "912343", "412042", "802006", "912343", "302006", "912042", "912042", "212046", "412042", "912042", "302006", "912343", "802006", "412042", "412042", "712004"], // Example codes
      memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Iqra", "Waqas Ahmed", "Waqas Ahmed", "Iqra", "Usman", "Waqas Ahmed", "Farhan", "Zohaib", "Zohaib", "Ahtisham", "Iqra", "Zohaib", "Farhan", "Waqas Ahmed", "Usman", "Iqra", "Iqra", "S M Masood-ul-Hasan Shah"], // Corresponding names
      startDate: new Date("2024-05-01"),
      committeePrice: 2500,
      currentIndex: 0,
      isClosed: false,
    },
    {
      name: "Committee 3",
      members: ["912343", "912343", "600304", "600304", "700306", "700304", "600303", [ "600344", "900304" ], "400306", "700303", "700303", "700303", "700303", "400306", [ "600344", "900304" ], "600303", "700304", "700306", "600304", "600304"], // Example codes
      memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Misbah", "Misbah", "Ramzan", "Shahzad Shah", "Muhammad Saad", ["Meer Mehran Bhatti", "Zeeshan Bhatti"], "Hassan", "Shahid", "Shahid", "Shahid", "Shahid", "Hassan", ["Meer Mehran Bhatti", "Zeeshan Bhatti"], "Muhammad Saad", "Shahzad Shah", "Ramzan", "Misbah", "Misbah"], // Corresponding names
      startDate: new Date("2024-07-01"),
      committeePrice: 2500,
      currentIndex: 0,
      isClosed: false,
    },
    {
      name: "Committee 4",
      members: [
        "200042", //1
        "412042", //2
        "912343",  // User ka code (Month 1)  //3
        "212046", //4
        "412042", //5
        ["912042", "912343"],  // User ka code (Month 2) //6
        "800042", //7
        ["912042", "912042", "700042", "912343"],  // User ka code (Month 4)  //8
        "200047", //9
        "400042", //10
        "412042", //11
        "412042", //12
        "212046", //13
        "412042", //14
        "600046", //15
        "200046", //16
        ["800043", "912343"],  // User ka code (Month 5)  //17
        "700047", //18
        "912042", //19
        "600344", //20
        "200042", //21
        ["212046", "212046", "700042", "912343"], //22
        "600046", //23
        "400046", //24
        "700047", //25
        "912042", //26
        "800042", //27
        "412042", //28
        "200042", //29
        "200042"  //30
      ], 
      
      //               01       02      03        04         05       06                         07        08                                              09        10       11      12      13          14       15        16            17                  18        19        20                      21         22                                                23           24                  25         26        27        28       29       30                         
      memberNames: ["Aliya", "Iqra", "Waqas", "Ahtisham", "Iqra", ["Zohaib", "Waqas Ahmed"], "Tasbiha", ["Zohaib", "Zohaib", "Syeda Shahida", "Waqas"], "Atiq", "Humaira", "Iqra", "Iqra", "Ahtisham", "Iqra", "Mehrin", "Ubaid Raza", ["Ubaid", "Waqas"], "Shakoor", "Zohaib", "Meer Mehran Bhatti", "Aliya", ["Ahtisham", "Ahtisham", "Syeda Shahida", "Waqas"], "Mehrin", "Hareem Fatima Hunain", "Shakoor", "Zohaib", "Tasbiha", "Iqra", "Aliya", "Aliya"], // Corresponding names
      startDate: new Date("2025-02-01"),
      committeePrice: 10000,
      isClosed: false,
    },
  ];

  // Function to calculate end date
  function calculateEndDate(startDate, totalMonths) {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + totalMonths - 1);
    return endDate.toLocaleString("default", { month: "long", year: "numeric" });
  }

  // Function to display committee details
function displayCommitteeDetails(committee) {
  const currentDate = new Date();
  const totalMembers = committee.members.length;

  // Calculate currentIndex dynamically
  const startMonth = committee.startDate.getMonth();
  const startYear = committee.startDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalMonthsPassed = (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;
  const currentIndex = totalMonthsPassed % totalMembers;

  // Calculate committee details
  const monthlyAmount = committee.committeePrice * totalMembers;
  const currentRecipient = committee.memberNames[currentIndex -1];
  const nextRecipientIndex = (currentIndex) % totalMembers;
  const nextRecipient = committee.memberNames[nextRecipientIndex];
  const endDate = calculateEndDate(committee.startDate, totalMembers);

  // Update HTML
  document.getElementById(`start-date-${committee.name}`).innerText = committee.startDate.toLocaleString("default", { month: "long", year: "numeric" });
  document.getElementById(`current-recipient-${committee.name}`).innerText = currentRecipient;
  document.getElementById(`next-recipient-${committee.name}`).innerText = nextRecipient;
  document.getElementById(`monthly-amount-${committee.name}`).innerText = monthlyAmount.toLocaleString();
  document.getElementById(`committee-price-${committee.name}`).innerText = committee.committeePrice.toLocaleString(); // Update committee price
  document.getElementById(`total-members-${committee.name}`).innerText = totalMembers;
  document.getElementById(`total-months-${committee.name}`).innerText = totalMembers;
  document.getElementById(`end-date-${committee.name}`).innerText = endDate;
  document.getElementById(`total-recipients-${committee.name}`).innerText = totalMonthsPassed;

  // Check if committee is closed
  if (totalMonthsPassed >= totalMembers) {
    committee.isClosed = true;
    document.getElementById(`current-recipient-${committee.name}`).innerText = "Closed";
    document.getElementById(`next-recipient-${committee.name}`).innerText = "Closed";
  }
}

// Initial display of committee details
  committees.forEach((committee) => {
    displayCommitteeDetails(committee);
  });

});


document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = this.getAttribute("href").substring(1); // Get target section ID
      const targetSection = document.getElementById(targetId); // Find the target section

      if (targetSection) {
        // Scroll to the target section smoothly
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});









// Function to show custom alert
function showCustomAlert(message) {
  const customAlert = document.getElementById("custom-alert");
  const customAlertMessage = document.getElementById("custom-alert-message");

  customAlertMessage.textContent = message; // Set alert message
  customAlert.style.display = "flex"; // Show alert box

  // Close alert on button click
  document.getElementById("custom-alert-close").addEventListener("click", function () {
    customAlert.style.display = "none"; // Hide alert box
  });
}

// Replace all alert() calls with showCustomAlert()
// Example:
// showCustomAlert("Please enter a valid 6-digit code.");


























