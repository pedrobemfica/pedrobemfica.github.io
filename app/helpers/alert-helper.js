export const alertMessage = (title, message) => {
        const alertTitle = document.getElementById('alertTitle');
        const alertMessage = document.getElementById('alertMessage');
        const toastAlert = document.getElementById('toastAlert')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastAlert)

        alertTitle.innerHTML = title;
        alertMessage.innerHTML = message;
        toastBootstrap.show()
    }