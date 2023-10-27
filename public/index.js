/* eslint-disable no-undef */

const emailInput = document.querySelector("#floatingInput");
const senhaInput = document.querySelector("#floatingPassword");
const rememberMe = document.querySelector("#flexCheckDefault");
const mensagemErro = document.querySelector("#mensagemErro");
const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (emailInput.value === "" || senhaInput.value === "") {
        mensagemErro.style.display = "block";
        mensagemErro.textContent = "Preencha todos os campos";
        return;
    }

    if (senhaInput.value.length < 6) {
        mensagemErro.style.display = "block";
        mensagemErro.textContent = "A senha deve ter no mínimo 6 caracteres";
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailInput.value,
            senha: senhaInput.value,
            hasConnect: rememberMe.checked,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error === false) {
                window.location.href = "/home";
            } else {
                mensagemErro.style.display = "block";
                mensagemErro.textContent = data.error;
            }
        })
        .catch((err) => {
            console.log(err);
            mensagemErro.style.display = "block";
            mensagemErro.textContent = "Erro ao fazer login";
        });

    mensagemErro.style.display = "none";
    console.log(
        "Enviado!",
        emailInput.value,
        senhaInput.value,
        rememberMe.checked
    );
});
