
function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message) {
    const msgObj = { text: message, time: new Date().toISOString() };
    firebase.database().ref("messages").push(msgObj);
    input.value = "";
  }
}

firebase.database().ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const div = document.createElement("div");
  div.textContent = `🗨️ ${msg.text}`;
  document.getElementById("messages").appendChild(div);
});
