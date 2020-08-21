import sys
sys.path.insert(0, './venv/Lib/site-packages')

from flask import Flask, send_from_directory, send_file, redirect
from server_modules.routes.api.post_login import post_login
from server_modules.routes.api.get_member import get_member
from server_modules.routes.api.get_member_tfa_uri import get_member_tfa_uri
from server_modules.routes.api.get_members import get_members
from server_modules.routes.api.get_roles import get_roles
from server_modules.routes.api.get_role import get_role
from server_modules.routes.api.get_actions import get_actions

# creates a Flask application, named app
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

app.register_blueprint(post_login)
app.register_blueprint(get_member)
app.register_blueprint(get_member_tfa_uri)
app.register_blueprint(get_members)
app.register_blueprint(get_roles)
app.register_blueprint(get_role)
app.register_blueprint(get_actions)


@app.route('/')
def get_root_main_file():
    return send_file('./dist/index.html')


@app.route('/<path:path>')
def get_root_files(path):
    return send_from_directory('./dist', path)


@app.errorhandler(404)
def not_found(path):
    return redirect('/')


# run the application
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000, debug=True)
