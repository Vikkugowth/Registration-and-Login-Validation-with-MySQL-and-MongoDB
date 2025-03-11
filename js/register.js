document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("full-form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        let isValid = true;

        // Clear previous error messages
        document.getElementById("nameError").innerText = "";
        document.getElementById("emailError").innerText = "";
        document.getElementById("passwordError").innerText = "";
        document.getElementById("confirmPasswordError").innerText = "";
        document.getElementById("boxError").innerText = "";

        // Get user input
        let name = document.getElementById("input1").value.trim();
        let email = document.getElementById("input2").value.trim();
        let password = document.getElementById("input3").value.trim();
        let confirmPassword = document.getElementById("input4").value.trim();
        let checkbox_input = document.getElementById("last-input").checked; 

        if (name === "") {
            setError(document.getElementById("input1"), "Name is required");
            isValid = false;
        } else {
            setSuccess(document.getElementById("input1"));
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailPattern)) {
            setError(document.getElementById("input2"), "Enter a valid email ID");
            isValid = false;
        } else {
            setSuccess(document.getElementById("input2"));
        }

        
        if (password === "") {
            setError(document.getElementById("input3"), "Enter the password");
            isValid = false;
        } else if (password.length < 6) {
            setError(document.getElementById("input3"), "Password must be at least 6 characters");
            isValid = false;
        } else {
            setSuccess(document.getElementById("input3"));
        }

        
        if (confirmPassword === "") {
            setError(document.getElementById("input4"), "Please re-enter the password");
            isValid = false;
        } else if (confirmPassword !== password) {
            setError(document.getElementById("input4"), "Passwords do not match");
            isValid = false;
        } else {
            setSuccess(document.getElementById("input4"));
        }

    
        if (!checkbox_input) {
            setError(document.getElementById("last-input"), "Tick this box to continue");
            isValid = false;
        } else {
            setSuccess(document.getElementById("last-input"));
        }

        // If form is valid, send data using AJAX
        if (isValid) {
            upload_data (name, email, password);
        }
    });
});


// Function to show error message and add styling
function setError(element, message) {
    if (!element) return; 
    let inputGroup = element.parentElement;
    let errorElement = inputGroup.querySelector(".error");

    if (errorElement) {
        errorElement.innerText = message;
        inputGroup.classList.add("error");
        inputGroup.classList.remove("success");
    }
}

// Function to indicate success (clear error message)
function setSuccess(element) {
    if (!element) return;
    let inputGroup = element.parentElement;
    let errorElement = inputGroup.querySelector(".error");

    if (errorElement) {
        errorElement.innerText = '';
        inputGroup.classList.add("success");
        inputGroup.classList.remove("error");
    }
}



    function upload_data(name, email, password) {

        $.ajax({
            url: "/php/register.php",
            type: "POST",
            data: { full_name: name, email: email, password: password },
            dataType: "json",
            success: function (response) {
                
             if (response.success) {
                   
                    window.location.href = "login.html";
                } else  {

                   if (response.message === "Email already registered. Try logging in.") {
                        alert(" This email is already registered. Try logging in with different e-mail id.");
                    }
                
                else {
                    alert("Error: " + response.message);
                    }

                }
            }
        });
    }


