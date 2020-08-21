from flask import Blueprint, send_file, jsonify, request
import pyotp

get_member_tfa_uri = Blueprint('get_member_tfa_uri', __name__)


@get_member_tfa_uri.route('/api/memberTFAUri', methods=['GET'])
def handler():
    args = request.args
    uri = pyotp.TOTP('base32secret3232').provisioning_uri(args['Username'], 'UH IEEE')
    return jsonify(resource=uri, status='Good', statusDetails='')