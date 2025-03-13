document.addEventListener("DOMContentLoaded", function () {
 document.getElementById("full-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    

    let isValid = true;

     // Clear previous error messages
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
  
    // Get user input
    let email = document.getElementById("input1").value.trim();
    let password = document.getElementById("input2").value.trim();


   
    if (email === "") {
        setError(document.getElementById("input1"), "Enter a email ID");
        isValid = false;
   
    }
    else{
        setSuccess(document.getElementById("input1"));
    }


    if (password === "") {
        setError(document.getElementById("input2"), "Enter the password");
        isValid = false;
    } else if (password.length < 6) {
        setError(document.getElementById("input2"), "Password must be at least 6 characters");
        isValid = false;
    }
    else{
        setSuccess(document.getElementById("input2"));
    }
    
    
    if(isValid){
        login_data(email,password);
      
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


    
function login_data(email, password) {
    
    $.ajax({
        url: "/Guvi-Intern/php/login.php",
        type: "POST",
        data: { email: email, password: password },
        dataType: "json",
        
        success: function(response) {
            
            let res = response
            if (res.success === true) {
                localStorage.setItem("session_token", res.token); 
                console.log(res)
                window.location.href = "profile.html"; 
            } else {
               
                if (response.message === "User not found") {
                    alert("User not found. Please register first.");
                } else if (response.message === "Invalid password") {
                    alert("Invalid password. Please try again.");
                } 
            }   
        },

        error: function(xhr, status, error) {
            console.log("XHR Response:", xhr);
            console.log("Status:", status);
            console.log("Error:", error);

            let errorMsg = xhr.responseJSON?.message || xhr.responseText || "Unknown error occurred";
            alert("Error: " + errorMsg);
        }
    });
}
