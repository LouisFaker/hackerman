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
});
