# 🎓 Attendify — College Attendance Tracker

Attendify is a Progressive Web App (PWA) that helps college students track their attendance and maintain their required attendance percentage.

## 🚀 Live Demo

https://vsdrs12345-droid.github.io/Attendify/

## ✨ Features

* 📚 Add multiple subjects
* 📊 Calculate overall attendance automatically
* 🎯 Set a custom attendance target
* ✅ Mark classes as Present
* ❌ Mark classes as Absent
* ✏️ Edit subject attendance
* 🗑️ Delete subjects
* 📈 Visual attendance progress bars
* ⚠️ Calculate how many classes are needed to reach the target
* 💤 Calculate how many classes can be missed while maintaining the target
* 💾 Save attendance data automatically using LocalStorage
* 📱 Responsive design for mobile, tablet, and desktop
* 🌐 Progressive Web App support
* 📲 Installable on supported devices
* ⚡ Service Worker support

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* LocalStorage
* Service Workers
* Web App Manifest
* GitHub Pages

## 📖 How to Use

### 1. Add a Subject

Enter the subject name, classes attended, and total classes.

For example:

Subject: Data Structures
Classes Attended: 32
Total Classes: 40

Attendify automatically calculates your attendance percentage.

### 2. Set Your Required Attendance

Choose the minimum attendance percentage you need to maintain.

You can select:

* 65%
* 70%
* 75%
* 80%
* 85%
* 90%

### 3. Track Classes

Use the Present and Absent buttons after each class.

Attendify automatically updates the subject attendance and overall attendance.

### 4. Check What You Need

If your attendance is below your required percentage, Attendify tells you how many consecutive classes you need to attend to reach your target.

If your attendance is above your target, it tells you how many classes you can miss while remaining at or above the required percentage.

## 💾 Data Storage

Attendify uses browser LocalStorage to save attendance information.

This means:

* Attendance remains after refreshing the page.
* Each user's data is stored separately on their own device.
* No account is required.
* No database is required.

Clearing the browser or app data can remove saved attendance information.

## 📱 Install Attendify

Open the live website:

https://vsdrs12345-droid.github.io/Attendify/

On a supported browser, choose Install App or Add to Home Screen.

Attendify can then be opened like a normal application.

## 📂 Project Structure

Attendify
├── icons
│   ├── icon-192.png
│   └── icon-512.png
├── index.html
├── style.css
├── script.js
├── manifest.json
├── service-worker.js
└── README.md

## 🎯 Future Improvements

* 👤 User accounts
* ☁️ Cloud backup and synchronization
* 📅 Attendance calendar
* 📈 Attendance analytics
* 🗓️ Timetable integration
* 🔔 Attendance reminders
* 📚 Semester management
* 📤 Export attendance data
* 📱 Android APK version
* 🌙 Dark mode

## 👨‍💻 Developer

Vikas Sharma

B.Tech Information Technology Student

## ⭐ Support

If you find Attendify useful, consider giving the repository a ⭐ on GitHub.

## 📄 License

This project is currently available for educational and personal use.

