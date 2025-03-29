        // Committees data
        const committees = [
            {
                name: "Committee 1",
                members: ["912343", "912343", "412042", "912343", "912343", "610007", "810006", "310006", "410005", "912042", "912042", "212046", "410006", "912042", "410005", "310006", "810006", "610007", "712004", "412042"],
                memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Iqra", "Waqas Ahmed", "Waqas Ahmed", "Muhammad Anis", "Umm-e-Hasnain", "Faizan", "Hasan Gul", "Zohaib", "Zohaib", "Ahtisham", "Haroon", "Zohaib", "Hasan Gul", "Faizan", "Umm-e-hasnain", "Muhammad Anis", "S M Masood-ul-Hasan Shah", "Iqra"],
                startDate: new Date("2024-05-01"),
                committeePrice: 2500,
                isClosed: false,
                duration: 20 // 20-month committee
            },
            {
                name: "Committee 2",
                members: ["912343", "912343", "412042", "912343", "912343", "412042", "802006", "912343", "302006", "912042", "912042", "212046", "412042", "912042", "302006", "912343", "802006", "412042", "412042", "712004"],
                memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Iqra", "Waqas Ahmed", "Waqas Ahmed", "Iqra", "Usman", "Waqas Ahmed", "Farhan", "Zohaib", "Zohaib", "Ahtisham", "Iqra", "Zohaib", "Farhan", "Waqas Ahmed", "Usman", "Iqra", "Iqra", "S M Masood-ul-Hasan Shah"],
                startDate: new Date("2024-05-01"),
                committeePrice: 2500,
                isClosed: false,
                duration: 20 // 20-month committee
            },
            {
                name: "Committee 3",
                members: ["912343", "912343", "600304", "600304", "700306", "700304", "600303", ["600344", "900304"], "400306", "700303", "700303", "700303", "700303", "400306", ["600344", "900304"], "600303", "700304", "700306", "600304", "600304"],
                memberNames: ["Waqas Ahmed", "Waqas Ahmed", "Misbah", "Misbah", "Ramzan", "Shahzad Shah", "Muhammad Saad", ["Meer Mehran Bhatti", "Zeeshan Bhatti"], "Hassan", "Shahid", "Shahid", "Shahid", "Shahid", "Hassan", ["Meer Mehran Bhatti", "Zeeshan Bhatti"], "Muhammad Saad", "Shahzad Shah", "Ramzan", "Misbah", "Misbah"],
                startDate: new Date("2024-07-01"),
                committeePrice: 2500,
                isClosed: false,
                duration: 30 // 30-month committee
            },
            {
                name: "Committee 4",
                members: [
                    "200042", // Aliya
                    "412042", // Iqra
                    "912343", // Waqas
                    "212046", // Ahtisham
                    "412042", // Iqra
                    ["912042", "912343"], // Zohaib, Waqas Ahmed
                    "800042", // Tasbiha
                    ["912042", "912042", "700042", "912343"], // Zohaib, Zohaib, Syeda Shahida, Waqas
                    "200047", // Atiq
                    "400042", // Humaira
                    "412042", // Iqra
                    "412042", // Iqra
                    "212046", // Ahtisham
                    "412042", // Iqra
                    "600046", // Mehrin
                    "200046", // Ubaid Raza
                    ["800043", "912343"], // Ubaid, Waqas
                    "700047", // Shakoor
                    "912042", // Zohaib
                    "600344", // Meer Mehran Bhatti
                    "200042", // Aliya
                    ["212046", "212046", "700042", "912343"], // Ahtisham, Ahtisham, Syeda Shahida, Waqas
                    "600046", // Mehrin
                    "400046", // Hareem Fatima Hunain
                    "700047", // Shakoor
                    "912042", // Zohaib
                    "800042", // Tasbiha
                    "412042", // Iqra
                    "200042", // Aliya
                    "200042"  // Aliya
                ],
                memberNames: ["Aliya", "Iqra", "Waqas", "Ahtisham", "Iqra", ["Zohaib", "Waqas Ahmed"], "Tasbiha", ["Zohaib", "Zohaib", "Syeda Shahida", "Waqas"], "Atiq", "Humaira", "Iqra", "Iqra", "Ahtisham", "Iqra", "Mehrin", "Ubaid Raza", ["Ubaid", "Waqas"], "Shakoor", "Zohaib", "Meer Mehran Bhatti", "Aliya", ["Ahtisham", "Ahtisham", "Syeda Shahida", "Waqas"], "Mehrin", "Hareem Fatima Hunain", "Shakoor", "Zohaib", "Tasbiha", "Iqra", "Aliya", "Aliya"],
                startDate: new Date("2025-02-01"),
                committeePrice: 10000,
                isClosed: false,
                duration: 30 // 30-month committee
            },
        ];

        // Payment Tracker Data
        let paymentTracker = {};

        // Function to get month name from date
        function getMonthName(date) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return months[date.getMonth()];
        }

        // Function to calculate months from start date
        function getMonthsList(startDate, duration) {
            const monthsList = [];
            let date = new Date(startDate);

            for (let i = 0; i < duration; i++) {
                monthsList.push(`${getMonthName(date)} ${date.getFullYear()}`);
                date.setMonth(date.getMonth() + 1); // Move to next month
            }

            return monthsList;
        }

        // Function to initialize paymentTracker
        function initializePaymentTracker() {
            committees.forEach(committee => {
                const monthsList = getMonthsList(committee.startDate, committee.duration);
                committee.members.forEach((member, index) => {
                    if (Array.isArray(member)) {
                        // Agar member ek array hai, toh har member ka alag entry banayein
                        member.forEach((code, subIndex) => {
                            const name = committee.memberNames[index][subIndex];
                            const key = `${code}-${committee.name}`;
                            paymentTracker[key] = {
                                code: code,
                                name: name,
                                committee: committee.name,
                                months: monthsList,
                                status: new Array(monthsList.length).fill("Not-Received") // Default status
                            };
                        });
                    } else {
                        // Agar member array nahi hai, toh direct entry banayein
                        const name = committee.memberNames[index];
                        const key = `${member}-${committee.name}`;
                        paymentTracker[key] = {
                            code: member,
                            name: name,
                            committee: committee.name,
                            months: monthsList,
                            status: new Array(monthsList.length).fill("Not-Received") // Default status
                        };
                    }
                });
            });
        }

        // Function to get current month and year
        function getCurrentMonthYear() {
            const date = new Date();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        }

        // Function to show status for user
        function showStatus() {
            const userCode = document.getElementById("userCode").value;
            const greetingDiv = document.getElementById("greeting");
            const committeeTablesDiv = document.getElementById("committeeTables");
            committeeTablesDiv.innerHTML = ""; // Clear previous data

            const userData = Object.values(paymentTracker).filter(user => user.code === userCode);

            if (userData.length > 0) {
                greetingDiv.textContent = `Salam!, ${userData[0].name}! Here is your payment status:`;

                userData.forEach(user => {
                    const table = document.createElement("table");
                    const tableHeader = `<thead><tr><th colspan="2">${user.committee}</th></tr><tr><th>Month</th><th>Status</th></tr></thead>`;
                    let tableBody = "<tbody>";

                    // Current month tak ke months show karein
                    const currentMonthYear = getCurrentMonthYear();
                    const monthsToShow = user.months.slice(0, user.months.indexOf(currentMonthYear) + 1);

                    monthsToShow.forEach((month, index) => {
                        const status = user.status[index];
                        tableBody += `
                            <tr>
                                <td>${month}</td>
                                <td class="${status === "Received" ? "received" : "not-received"}">${status}</td>
                            </tr>
                        `;
                    });

                    tableBody += "</tbody>";
                    table.innerHTML = tableHeader + tableBody;
                    committeeTablesDiv.appendChild(table);
                });
            } else {
                greetingDiv.textContent = "";
                alert("Invalid code! Please enter a valid code.");
            }
        }

        // Function to check if new month has started
        function checkNewMonth() {
            const currentMonthYear = getCurrentMonthYear();
            const lastDisplayedMonth = localStorage.getItem("lastDisplayedMonth");

            if (lastDisplayedMonth !== currentMonthYear) {
                // New month started, refresh the table
                localStorage.setItem("lastDisplayedMonth", currentMonthYear);
                showStatus();
            }
        }

        // Initialize paymentTracker
        initializePaymentTracker();


//*************************Committee 1*************************

//Waqas Ahmed
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["912343-Committee 1"].status[index] = "Received";
});


//Iqra
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["412042-Committee 1"].status[index] = "Received";
});

//Muhammad Anis
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["610007-Committee 1"].status[index] = "Received";
});

//Umm-e-Hasnain
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["810006-Committee 1"].status[index] = "Received";
});

//Faizan
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["310006-Committee 1"].status[index] = "Received";
});

//Hasan Gul
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["410005-Committee 1"].status[index] = "Received";
});

//Zohaib
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["912042-Committee 1"].status[index] = "Received";
});


//Ahtisham
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(index => {
    paymentTracker["212046-Committee 1"].status[index] = "Received";
});

//Haroon
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["410006-Committee 1"].status[index] = "Received";
});


//S M Masood-ul-Hasan Shah
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["712004-Committee 1"].status[index] = "Received";
});





//*************************Committee 2*************************

//Waqas Ahmed
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["912343-Committee 2"].status[index] = "Received";
});


//Iqra
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["412042-Committee 2"].status[index] = "Received";
});


//Usman
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["802006-Committee 2"].status[index] = "Received";
});


//Farhan
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["302006-Committee 2"].status[index] = "Received";
});

//Zohaib
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["912042-Committee 2"].status[index] = "Received";
});

//Ahtisham
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(index => {
    paymentTracker["212046-Committee 2"].status[index] = "Received";
});


//S M Masood-ul-Hasan Shah
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(index => {
    paymentTracker["712004-Committee 2"].status[index] = "Received";
});




//*************************Committee 3*************************


//Waqas Ahmed
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["912343-Committee 3"].status[index] = "Received";
});

//Misbah
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["600304-Committee 3"].status[index] = "Received";
});

//Ramzan
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["700306-Committee 3"].status[index] = "Received";
});

//Shahzad Shah
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["700304-Committee 3"].status[index] = "Received";
});

//Muhammad Saad
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["600303-Committee 3"].status[index] = "Received";
});

//Meer Mehran Bhatti
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["600344-Committee 3"].status[index] = "Received";

});

// Zeeshan Bhatti
[0, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["900304-Committee 3"].status[index] = "Received";
});

//Hassan
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["400306-Committee 3"].status[index] = "Received";
});

//Shahid
[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(index => {
    paymentTracker["700303-Committee 3"].status[index] = "Received";
});







//*************************Committee 4*************************

//Aliya
[0, 1].forEach(index => {
    paymentTracker["200042-Committee 4"].status[index] = "Received";
});

//Iqra
[0, 1].forEach(index => {
    paymentTracker["412042-Committee 4"].status[index] = "Received";
});

//Waqas Ahmed
[0, 1].forEach(index => {
    paymentTracker["912343-Committee 4"].status[index] = "Received";
});

//Ahtisham
[0, 1].forEach(index => {
    paymentTracker["212046-Committee 4"].status[index] = "Received";
});


//Zohaib
[0, 1, 2].forEach(index => {
    paymentTracker["912042-Committee 4"].status[index] = "Received";
});


//Tasbiha
[0, 1].forEach(index => {
    paymentTracker["800042-Committee 4"].status[index] = "Received";
});

//Syeda Shahida

[0, 1].forEach(index => {
    paymentTracker["700042-Committee 4"].status[index] = "Received";
});


//Atiq
[0, 1].forEach(index => {
    paymentTracker["200047-Committee 4"].status[index] = "Received";
});

//Humaira
[0, 1].forEach(index => {
    paymentTracker["400042-Committee 4"].status[index] = "Received";
});


//Mehrin
[0, 1].forEach(index => {
    paymentTracker["600046-Committee 4"].status[index] = "Received";
});

//Ubaid Raza
[0, 1].forEach(index => {
    paymentTracker["200046-Committee 4"].status[index] = "Received";
});

//Ubaid
[0, 1].forEach(index => {
    paymentTracker["800043-Committee 4"].status[index] = "Received";
});


//Shakoor
[0, 1].forEach(index => {
    paymentTracker["700047-Committee 4"].status[index] = "Received";
});


//Meer Mehran Bhatti
[1].forEach(index => {
    paymentTracker["600344-Committee 4"].status[index] = "Received";
});


//Hareem Fatima Hunain
[0, 1].forEach(index => {
    paymentTracker["400046-Committee 4"].status[index] = "Received";
});




        // Show status on page load
        showStatus();

        // Check for new month every day
        setInterval(checkNewMonth, 86400000); // 86400000 milliseconds = 1 day
