from flask import Blueprint, send_file

get_members = Blueprint('get_members', __name__)
@get_members.route('/api/members', methods=['GET'])
def handler():
    return send_file('./server_modules/routes/api/responses/get_members.json')