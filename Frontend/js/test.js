function sendData() {
    const name = document.getElementById("name").value;
  
    fetch("http://localhost:5000/test-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        "Saved with ID: " + data.insertedId;
    })
    .catch(err => {
      console.error(err);
      alert("Error sending data");
    });
  }