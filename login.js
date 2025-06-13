// Seleciona os elementos principais dos contêineres de formulário
        const signInContainer = document.querySelector(".formSingin-Container");
        const signUpContainer = document.querySelector(".formSingup-Container");

        // Seleciona os links para alternar entre os formulários
        // Certifique-se de que as IDs no HTML (singupLink, singinLink) correspondam exatamente aqui.
        const signupLink = document.getElementById("singupLink"); // Link "Cadastre-se" do form de login
        const signinLink = document.getElementById("singinLink"); // Link "Entrar" do form de cadastro

        // Função para mostrar o formulário de Cadastro e esconder o de Login
        if (signupLink) { // Boa prática: verificar se o elemento foi encontrado
            signupLink.onclick = (e) => {
                e.preventDefault(); // Evita que a página recarregue
                signInContainer.style.display = "none";
                signUpContainer.style.display = "flex"; // Ou "block" dependendo do seu layout
            };
        }

        // Função para mostrar o formulário de Login e esconder o de Cadastro
        if (signinLink) { // Boa prática: verificar se o elemento foi encontrado
            signinLink.onclick = (e) => {
                e.preventDefault(); // Evita que a página recarregue
                signUpContainer.style.display = "none";
                signInContainer.style.display = "flex"; // Ou "block" dependendo do seu layout
            };
        }

        
        const loginButton = document.querySelector(".formSingin .singIn");
        if (loginButton) { // Boa prática: verificar se o elemento foi encontrado
            loginButton.onclick = (e) => {
                e.preventDefault();
                if (signupLink) { // Simula o clique no link "Cadastre-se"
                    signupLink.click();
                } else {
                    console.warn("Link 'Cadastre-se' (ID singupLink) não encontrado. O botão de login não pode alternar.");
                }
            };
        }