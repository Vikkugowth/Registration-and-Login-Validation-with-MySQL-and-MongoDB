document.addEventListener("DOMContentLoaded", function() {
    
    let token = localStorage.getItem("session_token");
    console.log("Token generated successfully:", token)

       
       
   
        // First-time login: fetch name & email from MySQL
        $.ajax({
            url: "/Guvi-Intern/php/profile.php",
            type: "POST",
            data: { action: "fetch", token: token },
            dataType: 'json',
            success: function(response) {
                console.log("Fetch response", response);
                if (response.success === true) {
                    $("#input1").val(response.name);
                    $("#input2").val(response.email);
                
                    localStorage.setItem("user_data", JSON.stringify(response));
                   
                    fetchUpdatedUserData(token);
                  
                } else {
                    alert(response.message);
                    window.location.href = "login.html";
                    console.log(response.message);
                }
            },
            
        });
    

       
    

    $("#update-btn").click(function() {
        
        
        if (!validateForm()) {
            return; 
        }

        let profiledata = {
            name: $("#input1").val(),
            age: $("#input3").val(),
            contact: $("#input4").val()
        };   
    
        $.ajax({
            url: "/Guvi-Intern/php/profile.php",
            type: "POST",   
            data: { 
                action: "updateuser", 
                token: token, 
                profiledata: JSON.stringify(profiledata) // Properly serialize profiledata
            },
            dataType: 'json',
            success: function(response) {
                console.log("Update response", response);
                if (response.success === true) {
                    alert("Profile updated successfully!")
                    fetchUpdatedUserData(token);  
                    

                } else {
                   alert(response.message);
               }

            
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
                console.log("XHR Response:", xhr.responseText);
                alert("Failed to update user details. Try again.");
            }
        });
    });


    function validateForm(){

    let isValid = true;

     // Clear previous error messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("AgeError").innerText = "";
    document.getElementById("ContactError").innerText ="";
    
  
    // Get user input
    let name = document.getElementById("input1").value.trim();
    let age = document.getElementById("input3").value.trim();
    let contact = document.getElementById("input4").value.trim();


  
    if (name === "") {
        setError(document.getElementById("input1"), "Enter your full name");
        isValid = false;
   
    }
    else{
        setSuccess(document.getElementById("input1"));
    }

    if (age === "" || age <= 0) {
        setError(document.getElementById("input3"), "Enter a valid age");
        isValid = false;
   
    }
    else{
        setSuccess(document.getElementById("input3"));
    }

    
    
    let contactRegex = /^[0-9]{10}$/;

    if (contact === "" || !contactRegex.test(contact)) {
        setError(document.getElementById("input4"), "Enter a valid contact number");
        isValid = false;
   
    }
    else{
        setSuccess(document.getElementById("input4"));
    }
    
    return(isValid);

    }


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

    function fetchUpdatedUserData(token) {
        $.ajax({
            url: "/Guvi-Intern/php/profile.php",
            type: "POST",
            data: { action: "getuserdata", token: token },
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    $("#input1").val(response.user_data.name);
                    $("#input2").val(response.user_data.email);
                    $("#input3").val(response.user_data.age);
                    $("#input4").val(response.user_data.contact);
    
                } else if (response.message === "session expired") {
                    alert("Session expired, please log in again.");
                    window.location.href = "login.html";
                } else (response.message)
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
            }
        });
    }
    
    
    $("#logout-btn").click(function() {
     
    
        $.ajax({
            url: "/Guvi-Intern/php/profile.php",
            type: "POST",
            data: { action: "logout", token: token },
            dataType: "json",
            success: function(response) {
                console.log("Logout Response:", response);
                if (response.success === true) {
                    localStorage.removeItem("session_token");      // Clear LocalStorage
                    localStorage.removeItem("user_data");
                    alert("Logout successful!");
                    window.location.href = "login.html";
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
                console.log("XHR Response:", xhr.responseText);
                alert("Logout failed. Try again.");
            }
        });
    });
   
        

});  