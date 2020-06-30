from flask import Blueprint, send_file
import os

get_member = Blueprint('get_member', __name__)
@get_member.route('/api/members/<int:MemberId>', methods=['GET'])
def handler(MemberId):
    return send_file(os.path.dirname(__file__) + '/responses/get_member.json')