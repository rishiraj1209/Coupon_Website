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
            data.forEach(coupon => {
                const couponDiv = document.createElement('div');
                couponDiv.innerHTML = `<strong>${coupon.coupon_code}</strong>: ${coupon.description}`;
                container.appendChild(couponDiv);
            });
        });
}

function addCoupon() {
    const couponCode = document.getElementById('new-coupon-code').value;
    const description = document.getElementById('description').value;
    fetch('/add_coupon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coupon_code: couponCode, description: description })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.status === 'success') {
            resultDiv.innerHTML = '<p>Coupon added successfully!</p>';
            fetchCoupons();
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    });
}

function swapCoupon() {
    const couponCode = document.getElementById('swap-coupon-code').value;
    fetch('/swap_coupon', {
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
            resultDiv.innerHTML = `<p>Coupon swapped successfully! You received: ${data.coupon.coupon_code} - ${data.coupon.description}</p>`;
            fetchCoupons();
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    });
}
