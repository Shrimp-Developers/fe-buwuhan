import Swal from "sweetalert2";

export const alertSuccess = async (message, titles) => {
    return Swal.fire({
        imageUrl: '/icon-alert-success.png',
        imageWidth: 120,
        imageHeight: 120,
        title: titles,
        text: message,
        confirmButtonText: "Oke",
        customClass: {
            popup: "my-alert-popup",
            title: "my-alert-title",
            htmlContainer: "my-alert-text",
            confirmButton: "my-confirm-btn",
        },
        buttonsStyling: false,
    });
};

export const alertError = async (message, titles) => {
    return Swal.fire({
        imageUrl: '/icon-alert-error.png',
        imageWidth: 120,
        imageHeight: 120,
        title: titles,
        text: message,
        confirmButtonText: "Oke",
        customClass: {
            popup: "my-alert-popup",
            title: "my-alert-title",
            htmlContainer: "my-alert-text",
            confirmButton: "my-confirm-btn",
        },
        buttonsStyling: false,
    });
};

export const alertConfirm = async (message, titles) => {
    return Swal.fire({
        title: titles,
        text: message,
        imageUrl: '/icon-alert-confirm.png',
        imageWidth: 120,
        imageHeight: 120,
        showCancelButton: true,
        confirmButtonColor: "#8A86D5",
        cancelButtonColor: "#8A86D5",
        confirmButtonText: "Ya",
        customClass: {
            popup: "my-alert-popup",
            title: "my-alert-title",
            htmlContainer: "my-alert-text",
            confirmButton: "my-confirm-btn",
        },
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: titles,
                text: message,
                confirmButtonText: "Tidak",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 120,
                imageHeight: 120,
                customClass: {
                    popup: "my-alert-popup",
                    title: "my-alert-title",
                    htmlContainer: "my-alert-text",
                    confirmButton: "my-confirm-btn",
                },
                buttonsStyling: false,
            });
        }
    });
}