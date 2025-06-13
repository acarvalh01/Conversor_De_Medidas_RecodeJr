const signInContainer = document.querySelector(".formSingin-Container");
const signUpContainer = document.querySelector(".formSingup-Container");
const signupLink = document.getElementById("singupLink");
const signinLink = document.getElementById("singinLink");

if (signupLink) {
    signupLink.onclick = (e) => {
        e.preventDefault();
        signInContainer.style.display = "none";
        signUpContainer.style.display = "flex";
    };
}

if (signinLink) {
    signinLink.onclick = (e) => {
        e.preventDefault();
        signUpContainer.style.display = "none";
        signInContainer.style.display = "flex";
    };
}

// LOGIN
const loginForm = document.querySelector(".formSingin");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = loginForm.querySelectorAll("input");
    const email = inputs[0].value;
    const password = inputs[1].value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            alert("Login falhou: " + (await response.json()).message);
            return;
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "historico.html"; // redireciona após login
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
});

// CADASTRO
const signupForm = document.querySelector(".formSingup");
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input");
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = prompt("Digite uma senha para cadastrar:");

    if (!password) return alert("Senha obrigatória");

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            alert("Cadastro falhou: " + (await response.json()).message);
            return;
        }

        alert("Cadastro realizado com sucesso. Faça login!");
        signinLink.click();
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
    }
});


