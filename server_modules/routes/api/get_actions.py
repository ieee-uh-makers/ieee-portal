from flask import Blueprint, send_file
import os

get_actions = Blueprint('get_actions', __name__)
@get_actions.route('/api/actions', methods=['GET'])
def handler():
    return send_file(os.path.dirname(__file__) + '/responses/get_actions.json')