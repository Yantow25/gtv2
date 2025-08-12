import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Directly include your bot token and chat IDs here
    const token = "7606338596:AAHgwEDswImgHBRseo3bz19geEyLOKiZcbI"; // Replace with your actual bot token
    const chatIds = ["6987171667"]; // Replace with your actual chat IDs

    try {
      for (const chatId of chatIds) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        });
      }
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      res
        .status(500)
        .json({ success: false, message: "Error sending message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
