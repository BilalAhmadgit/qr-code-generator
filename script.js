const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const imageUrl = reader.result;
        preview.innerHTML = `<img src="${imageUrl}" alt="Preview" />`;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Image uploaded successfully!');
                preview.innerHTML = '';
                fileInput.value = '';
            } else {
                throw new Error('Image upload failed.');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Image upload failed.');
        });
    }
});
