const send_otp = async (data) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: data.message,
      from: "+15752167722",
      to: data.emailormobile,
    });

    console.log(`Otp sent on: ${data.emailormobile}`); 
    return { status: true };
  } catch (err) {
    console.error("Error in send otp:", err.message);
    return { status: false, error: `Failed to send OTP: ${data.emailormobile}` };
  }
};

module.exports = {
  send_otp,
};