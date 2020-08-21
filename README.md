# ieee-portal
The UH IEEE Portal.

## Setting Up Your Development Environment

### Installing the Recommended IDE

Install Pycharm from Jetbrains as your Integrated Development Environment (IDE) for editing this project. Get Pycharm from https://www.jetbrains.com/pycharm/.

Pycharm needs to be licensed after the 30 day demo expires. Get a free student license from https://www.jetbrains.com/community/education/#students.

### Cloning the Github project using the IDE

Start Pycharm. To clone Github project, click VCS > Git > Clone.

Enter https://github.com/ieee-uh-makers/ieee-portal.git in the URL box and hit the Clone button.

### Knowing the Pycharm Terminal

Use Pycharm's Terminal to run _commands_ in next sections. For instructions on how to access the terminal, see https://www.jetbrains.com/help/pycharm/terminal-emulator.html.

### Installing Dependencies

Install Node.js 12.18.1 LTS or better from https://nodejs.org/en/. Make sure you get the 64-bit version.

Run this command in the project folder:

```bash
npm install
```

Install the Windows x86-64 executable installer for Python 3.8.5 or better from https://www.python.org/downloads/windows/.

Run these commands in the project folder to install the required python modules:

```bash
pip3 install flask
pip3 install pyotp
```

### Building the Frontend Files

Run this command in the project folder:

```bash
npm run build-dev
```

This project uses Vue (https://vuejs.org/) to make the frontend. Run the command above each time you make a change to the frontend code.

### Running the server

In Windows:
```bash
python server.js
```

In Linux:
```bash
python3 server.js
```

When you run the server, it will listen for http traffic on port 10000.
In the future, the server will also listen for https traffic on port 10001.

The code for setting up the port the server should listen to is in ```server.py```:

```python
# run the application
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000, debug=True)
```

## Setting up the Production Environment

### Uploading Your Files to the ECE FTP Server

Use FileZilla to upload files to the ECE FTP Server. Get FileZilla from https://filezilla-project.org/

Open FileZilla.

Create a New Site. Do this by clicking File > Site Manager ... > My Sites > New Site.

In the General tab of the New Site, enter the information below:

* Host: portal.ieee.ece.uh.edu
* Port: _[leave blank]_
* Encryption: Require explicit FTP over TLS
* Logon Type: Ask for Password
* User: eceieee
* Password: _[the pre-shared password]_

Hit Connect after entering the information.

You should see a ```public_html``` folder in the Remote Site section.

If your Windows username is ```jdoe```, your cloned project should live in the ```C:\Users\jdoe\PycharmProjects\ieee-portal``` folder. In the Local Site section, navigate to this folder.

Upload your project by copying all the files in ```C:\Users\jdoe\PycharmProjects\ieee-portal``` to ```public_html``` of the Remote Site.

### Running the server

This section requires assistance from ECE IT.

SSH into the linux server hosting ```portal.ieee.ece.uh.edu``` as ```eceieee```. Enter the pre-shared password.

Navigate to the location of the ```public_html``` folder.

Run ```python3 server.py```.

You should see output like this:

```
$ python server.py
 * Serving Flask app "server" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 233-533-091
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Detected change in 'C:\\Users\\user\\PycharmProjects\\ieee-portal\\server.py', reloading
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 233-533-091
 * Running on http://0.0.0.0:10000/ (Press CTRL+C to quit)
```

Test the server by opeinging a web browser and navigating to https://portal.ieee.ece.uh.edu/. You should see a login page.

The server listens for http traffic on port 10000. In the future, the server will also listen for https traffic on port 10001.

### Setup Recommendations

#### Run the Portal as a Service

Run the Portal as a service in Linux. A System V init script template can be found at https://github.com/fhd/init-script-template.

#### Use Named-Based Virtual Hosting for HTTP Traffic

Make the server redirect port 80 traffic to port 10000 for HTTP requests accessing _portal.ieee.ece.uh.edu_.

Assuming the linux server uses Apache: if the portal is listening for http traffic on port 10000, you can create a vhost for the web app like so:

```
NameVirtualHost *:80

<VirtualHost *:80>
    ServerName portal.ieee.ece.uh.edu

    ProxyPreserveHost On
    ProxyPass / http://portal.ieee.ece.uh.edu:10000/
    ProxyPassReverse / http://portal.ieee.ece.uh.edu:10000/
</VirtualHost>
```





