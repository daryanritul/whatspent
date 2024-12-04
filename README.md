# [Whatspent](https://whatspent.daryanritul.in)

<p align="center">
  <a href = 'https://whatspent.daryanritul.in'>
  <img  height="300" src="https://github.com/daryanritul/whatspent/assets/67550989/f40abecd-732f-4e61-8bd8-be8301e3ad5f">
  </a>
</p>

## **Introduction**

[Whatspent](https://whatspent.daryanritul.in) is a **personal finance management web application** designed to help users track, manage, and visualize their financial transactions. Whether you're managing personal finances, monitoring monthly budgets, or analyzing spending habits, Whatspent offers a clean, intuitive platform to manage everything in one place.

With features like income and expense tracking, budget management, and real-time balance updates, Whatspent allows users to gain a better understanding of their finances, plan their spending, and ensure their financial goals are met.

---

## **Key Features**

- **Income & Expense Tracking**: Track your daily income and expenses, with options to categorize each transaction for better visibility.
- **Personal & Monthly Data Views**: Toggle between **Personal Lists** and **Monthly Data** to manage finances based on your preferences.
- **Frequent Transactions**: Add frequently used transactions to your list and quickly add them with a single click.
- **Budget Management**: Set budgets for various categories and monitor them to avoid overspending.
- **Responsive Design**: Optimized for both mobile and desktop views, offering an enjoyable experience across all devices.
---

## **Tech Stack**

### **Frontend**
- **Languages:** HTML, CSS, SCSS, JavaScript
- **Libraries/Frameworks:** React.js, React-Icons
- **State Management:** Context API
- **Design Tools:** Custom SCSS for dynamic and responsive styling

### **Backend**
- **Database:** Firebase (for transaction storage)
- **Logic:** Node.js, Firebase Realtime Database
- **Other Tools:** Git for version control

---

## **Screenshots**

- **Dashboard Overview**:  
  *(Insert screenshot of the dashboard view with transactions and balance)*

- **Add Transaction**:  
  *(Insert screenshot of the transaction addition form)*

- **Frequent Transactions**:  
  *(Insert screenshot of the Frequent transactions section)*

---

## **Getting Started**

### Prerequisites

- Node.js (https://nodejs.org/) should be installed on your machine.

### Clone and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/daryanritul/whatspent.git
2.  Navigate to the project directory:

    ```bash
    cd whatspent
3.  Install dependencies:

    ```bash
    npm install
4.  Create a config.js file in the firebase folder and add your Firebase configuration:

    ```js
    // firebase/config.js
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID",
        };
        export default firebaseConfig

[Click here](https://firebase.google.com/docs/web/setup#config-object) to find how to get your Firebase configuration.

5.  Open your browser and visit http://localhost:port to view the app.

## Contributing

Contributions are welcome! If you find a bug or have a feature suggestion, feel free to create an issue or submit a pull request.

## Contact

For more information or questions, you can reach out to the project maintainer:

- Name: Ritul Daryan
- Email: darynritul@gmail.com
- GitHub: [RITUL DARYAN](https://github.com/daryanritul)
