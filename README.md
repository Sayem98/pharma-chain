# PharmaChain

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">PharmaChain</h3>
  <p align="center">
    A blockchain-based product tracking system.
  </p>
</div>

---

## About The Project

PharmaChain is a decentralized application (dApp) built with React and Vite. It leverages blockchain technology to track and manage products in the pharmaceutical supply chain. The project includes features for registering stakeholders, creating products, buying and selling products, and tracking product history.

### Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ethers.js](https://docs.ethers.io/)
- [Web3Modal](https://web3modal.com/)

---

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your_username/PharmaChain.git
   ```
2. Navigate to the project directory:
   ```sh
   cd PharmaChain
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

- Start the development server:
  ```sh
  npm run dev
  ```
- Open your browser and navigate to `http://localhost:5173`.

---

## Features

- **Stakeholder Registration**: Register as a stakeholder in the supply chain.
- **Product Management**: Create, buy, and sell products.
- **Order Tracking**: Track the status and history of orders.
- **Blockchain Integration**: All operations are recorded on the blockchain.

---

## Folder Structure

```
PharmaChain/
├── src/
│   ├── components/       # Reusable UI components
│   ├── contracts/        # Smart contract ABIs and addresses
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   ├── routes/           # Application routing
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
