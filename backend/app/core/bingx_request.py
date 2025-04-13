import time
import hmac
from hashlib import sha256
import requests

API_URL = "https://open-api.bingx.com"

def get_server_time():
    payload = {}
    path = '/openApi/swap/v2/server/time'
    method = "GET"
    paramsMap = dict()
    paramsStr = parseParam(paramsMap)
    response = send_request(method, path, paramsStr, payload)
    return response["data"]["serverTime"]


def get_trades(api_key: str, api_secret: str, symbol: str, start_time: int, end_time: int=None):
    payload = {}
    path = '/openApi/swap/v1/trade/positionHistory'
    method = "GET"
    paramsMap = {
        "symbol": symbol + '-USDT',
        "startTs": start_time,
        "endTs": get_server_time() if end_time is None else end_time,
    }
    paramsStr = parseParam(paramsMap)
    return send_request(method, path, paramsStr, payload, api_key, api_secret)


def get_sign(api_secret, payload):
    signature = hmac.new(api_secret.encode("utf-8"),
                         payload.encode("utf-8"), digestmod=sha256).hexdigest()
    return signature


def send_request(method, path, urlpa, payload, APIKEY, SECRETKEY):
    url = f'https://open-api.bingx.com{path}?{urlpa}&signature={get_sign(SECRETKEY, urlpa)}'
    headers = {
        'X-BX-APIKEY': APIKEY,
    }
    response = requests.request(method, url, headers=headers, data=payload)
    return response.json()


def parseParam(paramsMap):
    sortedKeys = sorted(paramsMap)
    paramsStr = "&".join(["%s=%s" % (x, paramsMap[x]) for x in sortedKeys])
    if paramsStr != "":
        return paramsStr + "&timestamp="+str(int(time.time() * 1000))
    else:
        return paramsStr + "timestamp="+str(int(time.time() * 1000))
