const sendMessage = async (message, mode = "chat") => {
  let endpoint = "/api/ask";
  if (mode === "match") endpoint = "/api/match";
  if (mode === "skillgap") endpoint = "/api/skillgap";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  console.log("AI reply:", data.reply);
};
