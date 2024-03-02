var backendURL = "https://192.168.2.32:443";
document.getElementById("previousButton").addEventListener("click", function() {
    window.location.href = backendURL + "/";
});
document.getElementById("user").addEventListener("click", function() {
    window.location.href = backendURL + "/adminUser";
});
document.getElementById("history").addEventListener("click", function() {
    window.location.href = backendURL + "/adminHistory";
});
document.getElementById("worksite").addEventListener("click", function() {
    window.location.href = backendURL + "/adminWorksite";
});
