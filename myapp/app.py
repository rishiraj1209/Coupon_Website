# app.py
from flask import Flask, render_template, request, jsonify
import uuid

app = Flask(__name__)

# Sample database (dictionary) to store coupon codes
coupons = {
    "SAVE10": {"discount": "10%", "price": 10},
    "SAVE20": {"discount": "20%", "price": 20},
    "SAVE30": {"discount": "30%", "price": 30},
}

# Endpoint to get available coupons
@app.route('/get_coupons', methods=['GET'])
def get_coupons():
    return jsonify(coupons)

# Endpoint to purchase a coupon
@app.route('/buy_coupon', methods=['POST'])
def buy_coupon():
    data = request.get_json()
    coupon_code = data.get('coupon_code')
    if coupon_code in coupons:
        # Simulate purchase and generate unique coupon code
        unique_code = f"{coupon_code}-{uuid.uuid4()}"
        return jsonify({"status": "success", "coupon_code": unique_code})
    else:
        return jsonify({"status": "error", "message": "Invalid coupon code"}), 400

# Serve the frontend
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True,port=5000)
