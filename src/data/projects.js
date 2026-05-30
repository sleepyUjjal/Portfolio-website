export const projectData = {
  nullpass: {
    title: 'NullPass',
    github: 'https://github.com/sleepyUjjal/NullPass',
    demo: 'https://nullpass.ujjal.dev',
    idea: `NullPass is a passwordless authentication demo built with Django and React. Instead of passwords or OTPs, it uses a challenge-response flow where a trusted device signs a server-issued nonce with a locally stored private key. The server verifies that signature with the device's public key, then issues a JWT-backed session.

Features include:
- Device enrollment
- QR-based login flow
- Simulated authenticator view
- Security dashboard
- Cryptographic authentication without passwords or SMS/email OTPs`
  },
  nuancenode: {
    title: 'NuanceNode',
    github: 'https://github.com/sleepyUjjal/NuanceNode',
    demo: 'https://nuancenode.ujjal.dev',
    idea: `NuanceNode is a structured claim-analysis system built for people who want more than a one-shot chatbot answer. It breaks a claim into multiple reasoning layers, compares source quality, examines the logic behind the claim, and produces a final verdict with a context tree and downloadable report.

Features include:
- Multi-step analysis pipeline
- Separation of fact extraction, source review, logic review, and belief dynamics
- Authenticated user history and report generation
- Uses React frontend, FastAPI backend, SQLAlchemy, and local LLM runtime (Ollama)`
  },
  finprocessor: {
    title: 'FinProcessor',
    github: 'https://github.com/sleepyUjjal/FinProcessor',
    demo: 'https://github.com/sleepyUjjal/FinProcessor',
    idea: `RBAC-FinProcessor is a finance operations platform with a Django REST backend (RBAC + audit logging + analytics) and a React frontend (protected routes + role-aware UI + dashboard charts).

Features include:
- Granular Role-Based Access Control (Admin, Analyst, User)
- Multi-tenant aggregation
- Real-time Dashboard with financial summary and range-based trend timelines
- Soft delete/hard delete policies with Audit Logs
- OpenAPI documentation and Swagger UI`
  },
  'trading-cli': {
    title: 'Trading CLI',
    github: 'https://github.com/sleepyUjjal/basic-trading-cli',
    demo: 'https://github.com/sleepyUjjal/basic-trading-cli',
    idea: `Binance Futures Testnet — Trading Bot

A Python CLI bot that places MARKET and LIMIT orders on the Binance Futures Testnet (USDT-M). Supports both an interactive menu and direct CLI commands.

Features include:
- REST client abstraction (signing, HTTP, error mapping)
- Order orchestration + result objects
- Input validation independent of I/O layer
- Structured logging to file and console
- Complete setup and environment variable configuration management`
  },
  veridian: {
    title: 'Veridian',
    github: 'https://github.com/sleepyUjjal/Veridian',
    demo: 'https://github.com/sleepyUjjal/Veridian',
    idea: `Veridian

A Python-based backend service/web application. It handles user management, authentication, and database operations.

Features include:
- Python Virtual Environment setup and requirements handling
- App.py execution logic
- Local SQLite database management for users and static templates
- Administrator setup scripts`
  }
};
