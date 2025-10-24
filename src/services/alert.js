import Swal from "sweetalert2";

export const alertSuccess = async (message, titles) => {
    return Swal.fire({
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 200,
        imageHeight: 200,
        title: titles,
        text: message,
        confirmButtonText: "Oke",
    })
}

export const alertError = async (message, titles) => {
    return Swal.fire({
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 200,
        imageHeight: 200,
        title: titles,
        text: message,
        confirmButtonText: "Oke",
    })
}

export const alertConfirm = async (message, titles) => {
    return Swal.fire({
        title: titles,
        text: message,
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#8A86D5",
        cancelButtonColor: "#8A86D5",
        confirmButtonText: "Ya"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: titles,
                text: message,
                confirmButtonText: "Tidak",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 200,
                imageHeight: 200,
            });
        }
    });
}