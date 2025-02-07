// console.log("js/header/script.js = chargé")
document.addEventListener('DOMContentLoaded', function() {
    var closeButton = document.querySelector('.actus .btn-close');
    closeButton.addEventListener('click', function() {
        var actus = this.closest('.actus');
        actus.parentNode.removeChild(actus);
    });
});