from flask import Blueprint, send_file
import os

post_login = Blueprint('post_login', __name__)
@post_login.route('/api/login', methods=['POST'])
def handler():
    return send_file(os.path.dirname(__file__) + '/responses/post_login.json')