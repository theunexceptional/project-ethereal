const axios = require("axios");
const baseURL = "http://localhost:5000"; // Update if needed

async function testAuth() {
  try {
    console.log("📝 Testing Signup...");
    let signupRes = await axios.post(`${baseURL}/signup`, {
      username: "testuser-bitch",
      password: "securepass",
    });
    console.log(signupRes.data);

    console.log("🔐 Testing Login...");
    let loginRes = await axios.post(`${baseURL}/login`, {
      username: "testuser-bitch",
      password: "securepass",
    });
    console.log(loginRes.data);

    const cookie = loginRes.headers["set-cookie"];
    
    console.log("🔒 Testing Protected Route...");
    let protectedRes = await axios.get(`${baseURL}/protected`, {
      headers: { Cookie: cookie },
    });
    console.log(protectedRes.data);

  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
  }
}

testAuth();
