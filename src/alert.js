import Swal from "sweetalert2";

export const alertSuccess = async (message, titles, imageUrl) => {
    return Swal.fire({
        imageUrl: imageUrl,
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

export const alertError = async (message, titles, imageUrl) => {
    return Swal.fire({
        imageUrl: imageUrl,
        imageWidth: 100,
        imageHeight: 100,
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

export const alertConfirm = async (message, titles, imageUrl) => {
    return Swal.fire({
        title: titles,
        text: message,
        imageUrl: imageUrl,
        imageWidth: 100,
        imageHeight: 100,
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        customClass: {
            popup: "my-alert-popup",
            title: "my-alert-title",
            htmlContainer: "my-alert-text",
            confirmButton: "my-confirm-btn",
            cancelButton: "my-cancel-btn",
            image: "my-alert-image",
        },
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed) {
            return Swal.fire({
                title: "Berhasil!",
                text: "Aksi berhasil dikonfirmasi",
                imageUrl: '/icon-alert-success.png',
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: "Oke",
                customClass: {
                    popup: "my-alert-popup",
                    title: "my-alert-title",
                    htmlContainer: "my-alert-text",
                    confirmButton: "my-confirm-btn",
                    image: "my-alert-image",
                },
                buttonsStyling: false,
            });
        }
    });
}