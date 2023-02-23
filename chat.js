// Firebase Realtime Databaseに接続する
var database = firebase.database();

// メッセージを読み込んで表示する
database.ref("messages").on("child_added", function(snapshot) {
	var message = snapshot.val();
	var name = message.name;
	var text = message.text;
	var messageElement = document.createElement("div");
	messageElement.innerText = name + ": " + text;
	document.getElementById("messagesDiv").appendChild(messageElement);
});

// ページが読み込まれた時に、ローカルストレージに保存された名前があれば、名前入力欄を変更不可能にする
window.addEventListener("load", function() {
	var savedName = localStorage.getItem("name");
	if (savedName) {
	var nameInput = document.getElementById("nameInput");
	nameInput.value = savedName;
	nameInput.disabled = true;
	}
	});
	
	// メッセージを送信する
document.getElementById("messageForm").addEventListener("submit", function(event) {
	event.preventDefault();
	var nameInput = document.getElementById("nameInput");
	var messageInput = document.getElementById("messageInput");
	var name = nameInput.value;
	var text = messageInput.value;
	if (name === "" || text === "") {
	  alert("名前とメッセージを入力してください。");
	} else {
	  // 名前がすでに保存されているかどうかを確認する
	  var savedName = localStorage.getItem("name");
	  if (savedName && savedName !== name) {
		alert("名前を変更するには、ページをリロードしてください。");
		nameInput.value = savedName; // 入力欄に保存された名前を表示する
		nameInput.disabled = true; // 名前を変更できないようにする
	  } else {
		database.ref("messages").push({
		  name: name,
		  text: text
		});
		localStorage.setItem("name", name); // 名前を保存する
		nameInput.disabled = true; // 名前を変更できないようにする
		messageInput.value = ""; // メッセージ欄をリセットする
		messageInput.focus(); // メッセージ入力欄にフォーカスする
	  }
	}
  });
  
