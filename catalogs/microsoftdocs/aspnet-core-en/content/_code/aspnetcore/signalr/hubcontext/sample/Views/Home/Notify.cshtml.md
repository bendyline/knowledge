# Source code: aspnetcore/signalr/hubcontext/sample/Views/Home/Notify.cshtml

Complete source file; linked examples may select a region or line range.

```

@{
    ViewData["Title"] = "Notify";
}

<h2>Notify</h2>
<ul id="messages-list"></ul>

@section Scripts {
    <script src="/lib/signalr/signalr.js"></script>
    <script type="text/javascript">

        var messagesList = document.getElementById("messages-list");

        function appendMessage(content) {
            var li = document.createElement("li");
            li.innerText = content;
            messagesList.appendChild(li);
        }

        var connection = new signalR.HubConnectionBuilder()
            .withUrl("/notificationHub")
            .build();

        connection.on("Notify", function (message) {
            appendMessage(message)
        });

        connection.start();

    </script>
}



```
