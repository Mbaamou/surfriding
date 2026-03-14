const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function verify() {
  console.log('--- Verifying Backend API ---');
  try {
    const health = await axios.get(`${API_URL}/healthz`);
    console.log('✅ Health check:', health.data.message);
  } catch (err) {
    console.log('❌ Health check failed:', err.message);
  }

  try {
    const equipment = await axios.get(`${API_URL}/equipment`);
    console.log('✅ Equipment fetch: Found', equipment.data.data.length, 'items');
  } catch (err) {
    console.log('❌ Equipment fetch failed:', err.message);
  }

  console.log('--- Verification Complete ---');
}

verify();
