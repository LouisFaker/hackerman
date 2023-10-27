/* eslint-disable no-undef */

const emailInput = document.querySelector("#floatingInput");
const senhaInput = document.querySelector("#floatingPassword");
const rememberMe = document.querySelector("#flexCheckDefault");
const mensagemErro = document.querySelector("#mensagemErro");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (emailInput.value === "" || senhaInput.value === "") {
        mensagemErro.style.display = "block";
        mensagemErro.textContent = "Preencha todos os campos";
        return;
    }

    mensagemErro.style.display = "none";
    console.log(
        "Enviado!",
        emailInput.value,
        senhaInput.value,
        rememberMe.checked
    );
});
