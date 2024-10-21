export const uploadFile = async (file: any) => {
    const urlUpload = "https://api.cloudinary.com/v1_1/dyh9yinxl/upload"

    let formData = new FormData();
    formData.append("upload_preset", "wikiTraining");
    formData.append("file", file);

    const response = await fetch(urlUpload, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    const status = response.status;
    return [data.secure_url, status];
};