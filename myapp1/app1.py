# app.py
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample database (list) to store coupon codes
coupons = []

# Endpoint to get available coupons
@app.route('/get_coupons', methods=['GET'])
def get_coupons():
    return jsonify(coupons)

# Endpoint to add a coupon
@app.route('/add_coupon', methods=['POST'])
def add_coupon():
    data = request.get_json()
    coupon_code = data.get('coupon_code')
    description = data.get('description')
    if coupon_code and description:
        coupon = {"coupon_code": coupon_code, "description": description}
        coupons.append(coupon)
        return jsonify({"status": "success"}), 201
    else:
        return jsonify({"status": "error", "message": "Invalid data"}), 400

# Endpoint to swap coupons
@app.route('/swap_coupon', methods=['POST'])
def swap_coupon():
    data = request.get_json()
    coupon_code = data.get('coupon_code')
    for coupon in coupons:
        if coupon['coupon_code'] == coupon_code:
            coupons.remove(coupon)
            return jsonify({"status": "success", "coupon": coupon})
    return jsonify({"status": "error", "message": "Coupon not found"}), 404

# Serve the frontend
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
