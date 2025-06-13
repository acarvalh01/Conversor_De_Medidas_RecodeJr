// perfil.js - Lógica da página de perfil

document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.getElementById('file-upload');
    const profilePicPreview = document.getElementById('profile-pic-preview');

    // Quando um arquivo for escolhido no input...
    fileUpload.onchange = () => {
        const file = fileUpload.files[0];
        if (file) {
            // Cria uma URL temporária para o arquivo e a coloca como fonte da imagem
            profilePicPreview.src = URL.createObjectURL(file);
        }
    };
});