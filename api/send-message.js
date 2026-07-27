export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;
  const webhookURL = process.env.DISCORD_WEBHOOK_URL; // URL rahasia diambil dari sini

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    if (response.ok) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(500).json({ message: "Failed to send" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
