/* eslint-disable no-undef */
const signOut = document.querySelector("#signOut");

function deleteTokenCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

signOut.addEventListener("click", async () => {
    deleteTokenCookie();
    window.location.href = "/";
});
