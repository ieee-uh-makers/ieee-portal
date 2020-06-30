from flask import Blueprint, send_file
import os

get_roles = Blueprint('get_roles', __name__)
@get_roles.route('/api/roles', methods=['GET'])
def handler():
    return send_file(os.path.dirname(__file__) + '/responses/get_roles.json')