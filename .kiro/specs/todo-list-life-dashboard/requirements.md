# Requirements Document

## Introduction

The To-Do List Life Dashboard is a single-page web application that helps users organize their day, stay focused, and access favorite websites. The dashboard displays a personalized greeting with current date and time, provides a 25-minute focus timer, manages to-do tasks with full CRUD operations, stores quick links to favorite websites, and supports light/dark themes. All user data persists in the browser's Local Storage for a seamless experience across sessions.

## Glossary

- **Dashboard**: The main web application interface containing all feature sections
- **Greeting_Section**: The section displaying personalized greeting, date, time, and name input
- **Focus_Timer**: A 25-minute countdown timer for productivity sessions
- **Task_Manager**: The component managing to-do list operations (add, edit, complete, delete)
- **Task**: A to-do list item with text, completion status, and unique identifier
- **Quick_Links_Manager**: The component managing website bookmark operations
- **Quick_Link**: A saved website bookmark with name and URL
- **Theme_Controller**: The component managing light/dark mode switching
- **Local_Storage**: Browser's client-side storage mechanism for data persistence
- **Time_Period**: Morning (00:00-11:59), Afternoon (12:00-17:59), Evening (18:00-23:59)

## Requirements

### Requirement 1: Dynamic Greeting Display

**User Story:** As a user, I want to see a personalized greeting that changes based on the time of day, so that I feel welcomed and aware of the current date and time.

#### Acceptance Criteria

1. WHEN the page loads, THE Greeting_Section SHALL display the current date in format "Weekday, Day Month Year"
2. WHEN the page loads, THE Greeting_Section SHALL display the current time in HH:MM:SS format
3. THE Greeting_Section SHALL update the displayed time every second
4. WHEN the current hour is between 00:00 and 11:59, THE Greeting_Section SHALL display "Good Morning"
5. WHEN the current hour is between 12:00 and 17:59, THE Greeting_Section SHALL display "Good Afternoon"
6. WHEN the current hour is between 18:00 and 23:59, THE Greeting_Section SHALL display "Good Evening"
7. WHEN a user name is saved, THE Greeting_Section SHALL append the user name to the greeting message
8. WHEN no user name is saved, THE Greeting_Section SHALL display the greeting without a name

### Requirement 2: User Name Persistence

**User Story:** As a user, I want to save my name so that the greeting is personalized across sessions.

#### Acceptance Criteria

1. WHEN a user enters a name and clicks the save button, THE Dashboard SHALL store the name in Local_Storage
2. WHEN a user enters a name and clicks the save button, THE Greeting_Section SHALL immediately update to display the personalized greeting
3. WHEN a user enters an empty string and clicks the save button, THE Dashboard SHALL display an alert message requesting valid input
4. WHEN the page loads, THE Dashboard SHALL retrieve the saved name from Local_Storage
5. WHEN the page loads and a name exists in Local_Storage, THE Greeting_Section SHALL display the personalized greeting

### Requirement 3: Focus Timer Operation

**User Story:** As a user, I want a 25-minute focus timer with start, stop, and reset controls, so that I can manage my productivity sessions.

#### Acceptance Criteria

1. WHEN the page loads, THE Focus_Timer SHALL display "25:00" as the initial time
2. WHEN a user clicks the Start button, THE Focus_Timer SHALL begin counting down from the current time by 1 second per second
3. WHEN the timer is running and a user clicks the Start button, THE Focus_Timer SHALL ignore the click
4. WHEN a user clicks the Stop button, THE Focus_Timer SHALL pause the countdown
5. WHEN a user clicks the Reset button, THE Focus_Timer SHALL stop the countdown and reset to "25:00"
6. WHEN the timer reaches "00:00", THE Focus_Timer SHALL stop counting and display an alert message "Focus session completed!"
7. THE Focus_Timer SHALL display the remaining time in MM:SS format with zero-padding

### Requirement 4: Task Creation and Duplicate Prevention

**User Story:** As a user, I want to add tasks to my to-do list without creating duplicates, so that my list stays organized.

#### Acceptance Criteria

1. WHEN a user enters task text and clicks the Add Task button, THE Task_Manager SHALL create a new Task with unique identifier, text, and incomplete status
2. WHEN a user enters task text and clicks the Add Task button, THE Task_Manager SHALL add the Task to the task list display
3. WHEN a user enters an empty string and clicks the Add Task button, THE Task_Manager SHALL display an alert message "Please enter a task."
4. WHEN a user enters task text that matches an existing task (case-insensitive), THE Task_Manager SHALL display an alert message "This task already exists!"
5. WHEN a user enters task text that matches an existing task (case-insensitive), THE Task_Manager SHALL not create the duplicate task
6. WHEN a new task is created, THE Task_Manager SHALL clear the input field
7. WHEN a new task is created, THE Task_Manager SHALL save the updated task list to Local_Storage

### Requirement 5: Task Completion Toggle

**User Story:** As a user, I want to mark tasks as done or undone, so that I can track my progress.

#### Acceptance Criteria

1. WHEN a user clicks the Done button on an incomplete task, THE Task_Manager SHALL change the task status to completed
2. WHEN a user clicks the Done button on a completed task, THE Task_Manager SHALL change the task status to incomplete
3. WHEN a task status changes to completed, THE Task_Manager SHALL apply strikethrough styling to the task text
4. WHEN a task status changes to completed, THE Task_Manager SHALL reduce the opacity of the task text
5. WHEN a task status changes to incomplete, THE Task_Manager SHALL remove strikethrough styling from the task text
6. WHEN a task status changes, THE Task_Manager SHALL save the updated task list to Local_Storage

### Requirement 6: Task Editing

**User Story:** As a user, I want to edit existing tasks, so that I can correct mistakes or update task details.

#### Acceptance Criteria

1. WHEN a user clicks the Edit button on a task, THE Task_Manager SHALL display a prompt dialog with the current task text
2. WHEN a user enters new text in the edit prompt and confirms, THE Task_Manager SHALL update the task text
3. WHEN a user clicks Cancel in the edit prompt, THE Task_Manager SHALL not modify the task
4. WHEN a user enters an empty string in the edit prompt and confirms, THE Task_Manager SHALL display an alert message "Task cannot be empty."
5. WHEN a user enters an empty string in the edit prompt, THE Task_Manager SHALL not update the task
6. WHEN a task is edited, THE Task_Manager SHALL save the updated task list to Local_Storage

### Requirement 7: Task Deletion

**User Story:** As a user, I want to delete tasks, so that I can remove completed or unwanted items.

#### Acceptance Criteria

1. WHEN a user clicks the Delete button on a task, THE Task_Manager SHALL display a confirmation dialog "Are you sure you want to delete this task?"
2. WHEN a user confirms deletion, THE Task_Manager SHALL remove the task from the task list
3. WHEN a user cancels deletion, THE Task_Manager SHALL not remove the task
4. WHEN a task is deleted, THE Task_Manager SHALL update the display to remove the task element
5. WHEN a task is deleted, THE Task_Manager SHALL save the updated task list to Local_Storage

### Requirement 8: Task List Persistence

**User Story:** As a user, I want my tasks to persist across browser sessions, so that I don't lose my to-do list data.

#### Acceptance Criteria

1. WHEN the page loads, THE Task_Manager SHALL retrieve the task list from Local_Storage
2. WHEN task data exists in Local_Storage, THE Task_Manager SHALL parse the JSON data into Task objects
3. WHEN task data exists in Local_Storage, THE Task_Manager SHALL render all tasks with their current completion status
4. WHEN no task data exists in Local_Storage, THE Task_Manager SHALL display an empty task list

### Requirement 9: Quick Link Creation

**User Story:** As a user, I want to add favorite website links, so that I can quickly access frequently visited sites.

#### Acceptance Criteria

1. WHEN a user enters a website name and URL and clicks the Add Link button, THE Quick_Links_Manager SHALL create a new Quick_Link with unique identifier, name, and URL
2. WHEN a user enters a website name and URL and clicks the Add Link button, THE Quick_Links_Manager SHALL add the Quick_Link to the display
3. WHEN a user enters an empty name or empty URL and clicks the Add Link button, THE Quick_Links_Manager SHALL display an alert message "Please enter website name and URL."
4. WHEN a user enters a URL without "http://" or "https://" prefix, THE Quick_Links_Manager SHALL prepend "https://" to the URL
5. WHEN a new Quick_Link is created, THE Quick_Links_Manager SHALL clear both input fields
6. WHEN a new Quick_Link is created, THE Quick_Links_Manager SHALL save the updated links list to Local_Storage
7. WHEN a user clicks a Quick_Link, THE Dashboard SHALL open the URL in a new browser tab

### Requirement 10: Quick Link Deletion

**User Story:** As a user, I want to delete quick links, so that I can remove outdated or unwanted bookmarks.

#### Acceptance Criteria

1. WHEN a user clicks the Delete button on a Quick_Link, THE Quick_Links_Manager SHALL remove the link from the links list
2. WHEN a Quick_Link is deleted, THE Quick_Links_Manager SHALL update the display to remove the link element
3. WHEN a Quick_Link is deleted, THE Quick_Links_Manager SHALL save the updated links list to Local_Storage

### Requirement 11: Quick Links Persistence

**User Story:** As a user, I want my quick links to persist across browser sessions, so that I don't lose my saved bookmarks.

#### Acceptance Criteria

1. WHEN the page loads, THE Quick_Links_Manager SHALL retrieve the links list from Local_Storage
2. WHEN link data exists in Local_Storage, THE Quick_Links_Manager SHALL parse the JSON data into Quick_Link objects
3. WHEN link data exists in Local_Storage, THE Quick_Links_Manager SHALL render all links as clickable elements
4. WHEN no link data exists in Local_Storage, THE Quick_Links_Manager SHALL display an empty links container

### Requirement 12: Theme Toggle

**User Story:** As a user, I want to switch between light and dark modes, so that I can use the dashboard comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHEN the page loads in default state, THE Dashboard SHALL display in light mode
2. WHEN a user clicks the theme toggle button in light mode, THE Theme_Controller SHALL apply dark mode styling to all Dashboard elements
3. WHEN a user clicks the theme toggle button in light mode, THE Theme_Controller SHALL change the button text to "Light Mode"
4. WHEN a user clicks the theme toggle button in dark mode, THE Theme_Controller SHALL apply light mode styling to all Dashboard elements
5. WHEN a user clicks the theme toggle button in dark mode, THE Theme_Controller SHALL change the button text to "Dark Mode"
6. WHEN the theme changes, THE Theme_Controller SHALL save the selected theme to Local_Storage

### Requirement 13: Theme Persistence

**User Story:** As a user, I want my theme preference to persist across browser sessions, so that the dashboard always loads with my preferred theme.

#### Acceptance Criteria

1. WHEN the page loads, THE Theme_Controller SHALL retrieve the saved theme from Local_Storage
2. WHEN the saved theme is "dark", THE Theme_Controller SHALL apply dark mode styling before the page renders
3. WHEN the saved theme is "dark", THE Theme_Controller SHALL set the button text to "Light Mode"
4. WHEN the saved theme is "light" or no theme is saved, THE Theme_Controller SHALL apply light mode styling
5. WHEN the saved theme is "light" or no theme is saved, THE Theme_Controller SHALL set the button text to "Dark Mode"

### Requirement 14: Responsive Layout

**User Story:** As a user, I want the dashboard to work well on different screen sizes, so that I can use it on mobile, tablet, and desktop devices.

#### Acceptance Criteria

1. WHEN the viewport width is greater than 768 pixels, THE Dashboard SHALL display sections in a two-column grid layout
2. WHEN the viewport width is 768 pixels or less, THE Dashboard SHALL display sections in a single-column layout
3. WHEN the viewport width is 768 pixels or less, THE Dashboard SHALL stack the greeting name input and button vertically
4. WHEN the viewport width is 768 pixels or less, THE Dashboard SHALL stack the task input and button vertically
5. WHEN the viewport width is 768 pixels or less, THE Dashboard SHALL allow timer control buttons to wrap to multiple rows
6. THE Dashboard SHALL ensure all text remains readable at different viewport sizes
7. THE Dashboard SHALL ensure all interactive elements remain accessible and clickable at different viewport sizes

### Requirement 15: Technical Architecture

**User Story:** As a developer, I want the application to follow specified technical constraints, so that it remains simple, maintainable, and deployable.

#### Acceptance Criteria

1. THE Dashboard SHALL use only HTML for structural markup
2. THE Dashboard SHALL use only CSS for styling and layout
3. THE Dashboard SHALL use only Vanilla JavaScript for behavior and interactivity
4. THE Dashboard SHALL not use any frontend frameworks or libraries
5. THE Dashboard SHALL not require a backend server
6. THE Dashboard SHALL store all user data in browser Local_Storage
7. THE Dashboard SHALL use exactly one CSS file located in the css folder
8. THE Dashboard SHALL use exactly one JavaScript file located in the js folder
9. THE Dashboard SHALL load and function correctly when opened as a local HTML file
