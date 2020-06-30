# ieee-portal
The UH IEEE Portal.

## Dependencies

Install Node.js 12.18.1 LTS or better from https://nodejs.org/en/. Make sure you get the 64-bit version.

Run this command in the project folder:

```
npm install
```

Install the Windows x86-64 executable installer for Python 2.7.18 or better from https://www.python.org/downloads/windows/.

Run these commands in the project folder to install the required python modules:

```
pip install flask
pip install pyotp
```

## Build frontend files

Run this command in the project folder:

```
npx vue-cli-service build --mode development
```

This project uses Vue (https://vuejs.org/) to make the frontend. Run the command above each time you make a change to the frontend code.

## How to run

```
python server.js
```
