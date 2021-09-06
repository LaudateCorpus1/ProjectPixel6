var firstname=document.getElementById("txtFirstName");
var email=document.getElementById("txtEmail");
var phone=document.getElementById("txtPhone");
var image=document.getElementById("txtimg");
var randomNumber;

//To restrict user entering special char or numeric value
function validateFullName(event){ 
  var key = event.keyCode; 
  return ((key >= 65 && key <= 90) || (key >= 95 && key <= 122)|| key == 8 || key==32);
}

//To validate email entered by user
function validateEMail(value){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
    {
    return true;
    }
    else{
       return false;
    }
}

//To accpet only numeric value from user for phone number
function validatePhone(event){

  var ASCIICode = (event.which) ? event.which : event.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
  {
      return false;
  }
  else{
    //Code to show phone logo based on first three digit
    var first3digit= document.getElementById("txtPhone").value.substring(1, 4);
    formatPhoneNumber(event);
    if(first3digit>=621 && first3digit<=799){
      //jio
    document.getElementById('imageLogo').src="../images/jio.png"
    document.getElementById('imageLogo').style.visibility='visible';
    } 
    else if(first3digit>=801 && first3digit<=920){
 //idea
    document.getElementById('imageLogo').src="../images/idea.png"
    document.getElementById('imageLogo').style.visibility='visible';
    }
    else if(first3digit>=921 && first3digit<=999){
      //vodaphone
     document.getElementById('imageLogo').src="../images/voda.png"
     document.getElementById('imageLogo').style.visibility='visible';
     }
    else{
     document.getElementById('imageLogo').style.visibility='hidden';
    }
    return true;
  }

}

//to format phone number is given format
function formatPhoneNumber(e){
  if(document.getElementById("txtPhone").value!=undefined && document.getElementById("txtPhone").value!="" 
     && document.getElementById("txtPhone").value!=''){
   var txtValue=document.getElementById("txtPhone").value;
   var y=(typeof(e.target)!=='undefined')?e.target:e[0];
   var x=y.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);      
   document.getElementById("txtPhone").value=!x[2] ? x[1] :'(' + x[1] + ') '
   + (x[2] ? '-' +x[2] :'') + (x[3] ? '-' +x[3] :'');
  }
}
function formatPhoneNumberonchange(){
  if(phone.value.replace(/\D/g, "").length<=10){
    if(document.getElementById("txtPhone").value!=undefined && document.getElementById("txtPhone").value!="" 
    && document.getElementById("txtPhone").value!=''){
  var txtValue=document.getElementById("txtPhone").value;
  var x=txtValue.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);      
  document.getElementById("txtPhone").value=!x[2] ? x[1] :'(' + x[1] + ') '
                                              + (x[2] ? '-' +x[2] :'') + (x[3] ? '-' +x[3] :'');
  }
 
 }
 else{
  document.getElementById("errorTelephone").innerHTML="Please enter only 10 digit phone number";
 }
}


//button
function SubmitVal(){
    var validateName=/^[A-Za-z ]+$/;
    var allValidate=true;
    
    //Validate Name
      if(firstname.value.match(validateName))
      {
        var namearr=firstname.value.split(" ");
        if(namearr!=undefined && namearr.length>=2){
          for(var i=0;i<namearr.length;i++){
            if(namearr[i].length<4){
              allValidate=false;
              document.getElementById("errorFirstName").innerHTML="Please enter valid name, each word should have alteast 4 charcters";
              break;
            }
            else{
              document.getElementById("errorFirstName").innerHTML="";
            }
          }
        }
        else{
          allValidate=false;
          document.getElementById("errorFirstName").innerHTML="Please enter valid name, each word should have alteast 4 charcters";
        } 
      }
      else{
        allValidate=false;
          document.getElementById("errorFirstName").innerHTML="Please enter valid name, each word should have alteast 4 charcters";
        }


  //Validate Email
     if(!validateEMail(email.value))
      {
          allValidate=false
        document.getElementById("errorEmail").innerHTML="Please enter valid email id";
      }
      else if(validateEMail(email.value)){
        document.getElementById("errorEmail").innerHTML="";
      }

  //Validate Phone
      if((phone.value!=null || phone.value!="") && allValidate) {
        var res = phone.value.replace(/\D/g, "");
          if(res.length==10){
             document.getElementById("errorTelephone").innerHTML="";
            allValidate=true;
           }
          else{
        allValidate=false;
        document.getElementById("errorTelephone").innerHTML="Please enter only 10 digit phone number";
           }
      }
      else if(phone.value==null || phone.value==""){
        allValidate=false;
        document.getElementById("errorTelephone").innerHTML="Please enter only 10 digit phone number";

      }

  //if every condition passed then it will go to nextx page
      if(allValidate){
        clearAllError();
        randomNumber= Math.floor(1000 + Math.random() * 9000);
        console.log(randomNumber);
        localStorage.setItem("randomNumber", randomNumber);  
        localStorage.setItem("fullname",firstname.value);
        localStorage.setItem("phone",phone.value);
        console.log(localStorage.getItem("randomNumber"));
        alert("Your otp is-    " +localStorage.getItem("randomNumber"));
        location.href ="../HTML/OTPValidate.html";
       
      }
      else{

      }

}

//to cllear all errors
function clearAllError(){
  document.getElementById("errorFirstName").innerHTML="";
  document.getElementById("errorEmail").innerHTML="";
  document.getElementById("errorTelephone").innerHTML="";
}

//to show it on lael once page is ready
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.getElementById("lblFullName").innerHTML=localStorage.getItem("fullname");
        document.getElementById("lblPhoneNumber").innerHTML=localStorage.getItem("phone");  
    }
  };


//to validate entered otp
function ValidateOTP(){
    var txtOTP=document.getElementById("enterOTP");
    if(txtOTP.value==localStorage.getItem("randomNumber")){
        location.href ="../HTML/Pixel6Home.html";
    }
    else{
console.log("Cant redirect");
alert("invalid otp");
    }
}
