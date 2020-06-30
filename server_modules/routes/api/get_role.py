from flask import Blueprint, send_file
import os

get_role = Blueprint('get_role', __name__)
@get_role.route('/api/roles/<int:RoleId>', methods=['GET'])
def handler(RoleId):
    return send_file(os.path.dirname(__file__) + '/responses/get_role.json')