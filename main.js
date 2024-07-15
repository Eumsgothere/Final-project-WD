function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", async e => {
        e.preventDefault();

        const username = document.querySelector("#loginUsername").value;
        const password = document.querySelector("#loginPassword").value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (data.success) {
                setFormMessage(loginForm, "success", "Login successful!");
            } else {
                setFormMessage(loginForm, "error", "Invalid username/password combination");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault();

        const signupUsername = document.querySelector("#signupUsername").value;
        const signupEmail = document.querySelector("#signupEmail").value;
        const signupPassword = document.querySelector("#signupPassword").value;
        const signupConfirmPassword = document.querySelector("#signupConfirmPassword").value;

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ signupUsername, signupEmail, signupPassword, signupConfirmPassword }),
            });
            const data = await response.json();

            if (data.success) {
                setFormMessage(createAccountForm, "success", "Account created successfully. Please log in.");
                createAccountForm.classList.add("form--hidden");
                loginForm.classList.remove("form--hidden");
            } else {
                setFormMessage(createAccountForm, "error", data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
