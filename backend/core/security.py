# core/security.py
import os
import hmac
import hashlib

HMAC_SECRET = os.getenv("HMAC_SECRET", "CHANGE_ME_IN_PROD_TO_A_LONG_RANDOM_VALUE")

def hash_secret(value: str) -> str:
    """
    Hash a sensitive token/session value before storing in DB.
    DB should never store raw tokens.
    """
    return hmac.new(
        HMAC_SECRET.encode("utf-8"),
        value.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
