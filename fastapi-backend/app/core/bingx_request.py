import time
import hmac
from hashlib import sha256
import requests

import os
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://open-api.bingx.com"


def get_trades(api_key: str, api_secret: str, symbol: str, start_time: int, end_time: int = int(time.time() * 1000)):
    payload = {}
    path = '/openApi/swap/v1/trade/positionHistory'
    method = "GET"
    params = {
        'symbol': symbol + '-USDT',
        'startTime': str(start_time),
        'endTime': str(end_time),
    }

    params_str = parse_param(params)
    return send_request(method, path, params_str, payload, api_key, api_secret)


def get_sign(secret, payload):
    signature = hmac.new(secret.encode("utf-8"),
                         payload.encode("utf-8"), digestmod=sha256).hexdigest()
    return signature


def send_request(method, path, urlpa, payload, api_key, api_secret):
    url = "%s%s?%s&signature=%s" % (
        API_URL, path, urlpa, get_sign(api_secret, urlpa))
    headers = {
        'X-BX-APIKEY': api_key,
    }
    response = requests.request(method, url, headers=headers, data=payload)

    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": f"Request failed with status {response.status_code}",
            "details": response.text
        }


def parse_param(paramsMap):
    sorted_keys = sorted(paramsMap)
    params_str = "&".join(["%s=%s" % (x, paramsMap[x]) for x in sorted_keys])
    if params_str != "":
        return params_str+"&timestamp="+str(int(time.time() * 1000))
    else:
        return params_str+"timestamp="+str(int(time.time() * 1000))
