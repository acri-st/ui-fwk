# UI Framework

📌 [DESP-AAS Collaborative Services Parent Repository](https://github.com/acri-st/DESP-AAS-Collaborative-Services)  
📌 [DESP-AAS Sandbox Parent Repository](https://github.com/acri-st/DESP-AAS-Sandbox)

## Table of Contents

- [Introduction](#Introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

###  What is the Collaborative platform?

Collaborative platform allows users to create or reference different assets in a comprehensive catalog in earth obervation and geospatial analysis.

The Microservices that make up the Collaborative platform project are the following: 
- **Auth** Authentication service tu authenticate users.
- **Asset management** Asset management system.
- **Recommendation** Asset recommendation system.
- **Search** Asset search system.
- **Post** Post message management system.
- **Storage** File and Git management system.
- **Discussions** Discussion management system.
- **Geo extractor** Asset geographic coordniate extraction system.
- **Notification** Notification management system.
- **Moderation** Moderation management system.
- **Auto moderation management** Automatic moderation management system.
- **Moderation handling management** Moderation handling system.

![Collaborative platform Architecture](https://github.com/acri-st/collaborative-ui/blob/main/docs/architecture.png?raw=true)


###  What is the Sandbox?

Sandbox is a service that allows users to develop applications and models using cloud based services and to ease the deployment to the collaborative platform.

The Microservices that make up the Sandbox project are the following: 
- **Auth** Authentication service tu authenticate users.
- **Project management** Project management system.
- **VM management** manages the virtual machines for the projects. These virtual machines are where the user manages their project and develops.
- **Storage** Manages the project git files.

![Sandbox UI Architecture](https://github.com/acri-st/sandbox-ui/blob/main/docs/architecture.png?raw=true)


### What is the UI framework?

The UI framework is the library that is used in collaborative-ui, sandbox-ui and admin-ui for utilities, React components, API interfaces, typings and more.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or higher)
- **Git** 
- **Docker** Docker is mainly used for the test suite, but can also be used to deploy the project via docker compose

## Installation

1. Clone the repository:
```bash
git clone https://github.com/acri-st/ui-fwk.git
# OR
git clone git@github.com:acri-st/ui-fwk.git
cd ui-fwk
```

## Development

## Development Mode

### Standard local development

Setup environment
```bash
make setup
```

Start the development server:
```bash
make start
```

The application will be available at `http://localhost:8200`

To clean the project and remove node_modules and other generated files, use:
```bash
make clean
```

### Production Build

Build the application for production:
```bash
make build
```
#### Docker local development 
Setup environment
```bash
make setup DEPLOY=docker
```

Start the development server:
```bash
make start DEPLOY=docker
```

Stop the development server:
```bash
make stop DEPLOY=docker
```

The application will be available at `http://localhost:8200`

To clean the project and remove node_modules and other generated files, use:
```bash
make clean DEPLOY=docker
```

### Production Build

Build the application for production:
```bash
make build
```

## Testing

To run tests, make sure the local project is running and then run the test suite:
```bash
make test
```

## Contributing

Check out the [CONTRIBUTING.md](CONTRIBUTING.md) for more details on how to contribute.
