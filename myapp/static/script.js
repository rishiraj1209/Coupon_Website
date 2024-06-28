// static/script.js
document.addEventListener('DOMContentLoaded', () => {
    fetchCoupons();
});

function fetchCoupons() {
    fetch('/get_coupons')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('coupons-container');
            container.innerHTML = '<h2>Available Coupons</h2>';
            for (const [code, details] of Object.entries(data)) {
                const coupon = document.createElement('div');
                coupon.innerHTML = `<strong>${code}</strong>: ${details.discount} for $${details.price}`;
                container.appendChild(coupon);
            }
        });
}

function buyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    fetch('/buy_coupon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coupon_code: couponCode })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.status === 'success') {
            resultDiv.innerHTML = `<p>Coupon purchased successfully! Your code: ${data.coupon_code}</p>`;
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    });
}
