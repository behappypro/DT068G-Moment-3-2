"use strict";


// Code for FAQ
var faq = document.getElementsByClassName("faq");
let daysArray = ["Lördag","Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
let monthArray = ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December","Januari","Februari"];
let savedAddressArray=[];
var data = {};

for (var i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }

  window.addEventListener("error", handleError, true);

  function handleError(evt) {
    if (evt.message) { // Chrome sometimes provides this
      alert("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
    } else {
      alert("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
    }
}

window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}

  function getElements(){
    const fromAdress = document.getElementById('fromAdress');
    const toAdress = document.getElementById('toAdress');
    const persons = document.getElementById('persons');
    const information = document.getElementById('information');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const formTime = document.getElementById('time');
    const extra = document.getElementById('extra');
    const animal = document.getElementById('option1');
    const wheelchair = document.getElementById('option3');
    const repeatTransport =  document.getElementById('repeatTransport'); 
   }

   function getFormData(){
    getElements();
    data.fromAdress = fromAdress.value;
    data.toAdress = toAdress.value;
    data.persons = persons.value;
    data.information = information.value;
    data.phone = phone.value;
    
    data.time = time.value;
    
    
    
    if (typeof(repeatTransport) != 'undefined' && repeatTransport != null)
    {
      data.repeatTransport = repeatTransport.value;
    }
    
    if (document.getElementById('option1').checked) {
        data.animal = "Sällskapsdjur";
      }

    if(document.getElementById('option3').checked){
        data.wheelchair = "Rullstolsanpassat";
      }
      if(window.location.href.indexOf("aterkommanderesa") != -1){
        var days = '';
        for (var i = 0; i < 6; i++) {
          var element = document.getElementById('day' + i)
        
          if (element.checked) {
            var day = element.value;
            days += ' ' + day;
            data.date = days;
          }
        }
        
      }
      else{
        data.date = date.value;
      }
    localStorage.setItem('unAcceptedBooking', JSON.stringify(data));
   }

   function printData(){
    getElements();
    if(window.location.href.indexOf("bekraftaresa") != -1 ){
      var data = JSON.parse(localStorage.getItem('unAcceptedBooking'));
    }
    else if(window.location.href.indexOf("bekraftaaterkommanderesa") != -1){
      var data = JSON.parse(localStorage.getItem('unAcceptedBooking'));
    }
    else if(window.location.href.indexOf("aterkommanderesor") != -1){
      var data = JSON.parse(localStorage.getItem('repeatedBooking'));
    }
    else{
      var data = JSON.parse(localStorage.getItem('regularBooking'));
    }
    
    var splitDate = data.date;
    const dateArray = splitDate.split('-');
    let year = dateArray[0];
    let originalYear = year;
    let month = parseInt(dateArray[1]);
    let day = parseInt(dateArray[2]);
    

    if(month < 3){
      month = month + 12;
      year = year - 1;
    }

    let partOfYear = Math.floor(year / 100);
    let yearOfCentury = year % 100;

    var S = Math.floor(2.6 * month - 5.39) + Math.floor(yearOfCentury / 4) + Math.floor(partOfYear / 4) + day + yearOfCentury - (2 * partOfYear);

    var dayOfWeek = S - (7 * Math.floor(S / 7));
   
    persons.innerHTML = data.persons + ' ';

    if(window.location.href.indexOf("bekraftaaterkommanderesa")!= -1){
      date.innerHTML = data.date+"ar";
      time.innerHTML = data.time;
      repeatTransport.innerHTML = data.repeatTransport;
    }

    else if(window.location.href.indexOf("aterkommanderesor") != -1){
      date.innerHTML = data.date;
      time.innerHTML = data.time;
      repeatTransport.innerHTML = data.repeatTransport;
    }

    else if(window.location.href.indexOf("bekraftaresa")!= -1 || window.location.href.indexOf("kommanderesor") != -1){
      date.innerHTML = daysArray[dayOfWeek+1] + ' ' + day + ' ' + monthArray[month-1] + ' ' +originalYear;
      time.innerHTML = data.time;
    }

    else{
      date.innerHTML = data.date;
      time.innerHTML = data.time;
    }

    
    phone.innerHTML = data.phone;
    fromAdress.innerHTML = ' '+ data.fromAdress;
    toAdress.innerHTML = ' '+ data.toAdress;
    if(data.animal!=undefined&&data.wheelchair!=undefined){
      extra.innerHTML += data.animal + ', ';
    }
    else if(data.animal!=undefined){
      extra.innerHTML += data.animal;
    }

    if(data.wheelchair!=undefined){
      extra.innerHTML += data.wheelchair;
    }

    if(data.animal==undefined&&data.wheelchair==undefined){
      extra.innerHTML = "Inga";
    }
    
   }

   function showUnBookedData(){
   }

   function clearBooking(){
     if(window.location.href.indexOf("aterkommanderesor") != -1){
      localStorage.removeItem('repeatedBooking');
     }
     else if(window.location.href.indexOf("kommanderesor") != -1){
      localStorage.removeItem('regularBooking');
     }
     
     if(localStorage.getItem('repeatedBooking')==null){
      window.location.replace("http://127.0.0.1:5500/ingaaterkommanderesor.html");
     }
     else if(localStorage.getItem('regularBooking')==null){
      window.location.replace("http://127.0.0.1:5500/ingaresor.html");
     }

     localStorage.removeItem('unAcceptedBooking');
   }

   function confirmDelete(){
    const boxFromAdress = document.getElementById('box-fromAdress');
    const boxToAdress = document.getElementById('box-toAdress');
    const boxTime = document.getElementById('box-time');
    const boxRepeat = document.getElementById('box-repeat');
    if(window.location.href.indexOf("aterkommanderesor") != -1){
      var data = JSON.parse(localStorage.getItem('repeatedBooking'));
    }
    else{
      var data = JSON.parse(localStorage.getItem('regularBooking'));
    }
    
    getElements();
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("cancel");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementsByClassName("close")[1];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }

    if(boxFromAdress!=null){
      boxFromAdress.innerHTML = data.fromAdress;
      boxToAdress.innerHTML = data.toAdress;
      boxTime.innerHTML = data.time;
      boxRepeat.innerHTML = data.repeatTransport;
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    closeButton.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
   }

   function confirmBooking(){
    getElements();
    clearBooking();
    data.fromAdress = fromAdress.textContent;
    data.toAdress = toAdress.textContent;
    data.persons = persons.textContent;
    data.phone = phone.textContent;
    data.date = date.textContent;
    data.time = time.textContent;
    
    if (typeof(repeatTransport) != 'undefined' && repeatTransport != null)
    {
      data.repeatTransport = repeatTransport.textContent;
    }

    if(window.location.href.indexOf("bekraftaaterkommanderesa") != -1){
      localStorage.setItem('repeatedBooking', JSON.stringify(data));
      window.location.replace("http://127.0.0.1:5500/aterkommanderesor.html");
    }
    else{
      localStorage.setItem('regularBooking', JSON.stringify(data));
    }
    
   }

   function showModal(){
    // Get the modal
    var modal = document.getElementById("myModal");


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementsByClassName("addButton")[0];

    // When the user clicks the button, open the modal 
 
      modal.style.display = "block";
      if(window.location.href.indexOf("bekraftaresa") != -1 || 
      window.location.href.indexOf("bekraftaaterkommanderesa") != -1){
        countDown(); 
      }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    closeButton.onclick = function() {
      if(window.location.href.indexOf("sparadeadresser") != -1){
        if(document.getElementById('newaddress').value > ''){
          addAddress();
          modal.style.display = "none";
        }
        
      }
      
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    
   }

   function checkIfRideBooked(){
     if(localStorage.getItem('regularBooking')!=null){
      window.location.replace("http://127.0.0.1:5500/kommanderesor.html");
     }
     else{
      window.location.replace("http://127.0.0.1:5500/ingaresor.html");
     } 
   }

   function checkIfRepeatedRideBooked(){
    if(localStorage.getItem('repeatedBooking')!=null){
     window.location.replace("http://127.0.0.1:5500/aterkommanderesor.html");
    }
    else{
     window.location.replace("http://127.0.0.1:5500/ingaaterkommanderesor.html");
    } 
   }

   function reBook(){
    const fromAdress = document.getElementById('fromAdress');
    const toAdress = document.getElementById('toAdress');
    const persons = document.getElementById('persons');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const formTime = document.getElementById('time');
    const information = document.getElementById('information');
    const wheelchair = document.getElementById('extra');

    data.date = date.value;
    data.time = formTime.value;
    data.fromAdress = fromAdress.textContent ;
    data.toAdress = toAdress.textContent ;
    data.persons = persons.value;
    data.phone = phone.textContent;
    data.information = information.value;
    data.wheelchair = wheelchair.textContent ;

    localStorage.setItem('regularBooking', JSON.stringify(data));
   }

   function countDown(){
    var timeleft = 2;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        confirmBooking();
        if(window.location.href.indexOf("bekraftaresa") != -1){
          window.location.replace("http://127.0.0.1:5500/kommanderesor.html");
        }
        else{
          window.location.replace("http://127.0.0.1:5500/aterkommanderesor.html");
        }
        

      } else {
      }
      timeleft -= 1;
    }, 1000);
   }

   function showDays(){

    var showDays =
    `<input type="checkbox" id="day0" value="Måndag" name="monday">
    <label for="day0">Måndag</label><br>
    <input type="checkbox" id="day1" value="Tisdag" name="tuesday">
    <label for="day1">Tisdag</label><br>
    <input type="checkbox" id="day2" value="Onsdag" name="wednesday">
    <label for="day2">Onsdag</label><br>
    <input type="checkbox" id="day3" value="Torsdag" name="thursday">
    <label for="day3">Torsdag</label><br>
    <input type="checkbox" id="day4" value="Fredag" name="friday">
    <label for="day4">Fredag</label><br>
    <input type="checkbox" id="day5" value="Lördag" name="saturday">
    <label for="day5">Lördag</label><br>
    <input type="checkbox" id="day6" value="Söndag" name="sunday">
    <label for="day6">Söndag</label>`;

    var showWeeks =`<label for="startweek">Startvecka</label>
    <input type="week" name="week" id="startweek">
    <label for="endweek">Slutvecka</label>
    <input type="week" name="week" id="endweek">`;

    var showMonths = `<label for="startmonth">Startmånad</label>
    <input type="month" name="month" id="startmonth">
    <label for="endmonth">Slutmånad</label>
    <input type="month" name="endmonth" id="endmonth">`;

    switch(document.getElementById('repeatTransport').value){
      case "Valfria-dagar":
        document.getElementById('days').innerHTML = showDays;
        document.getElementById('weeks').innerHTML = showWeeks;
        document.getElementById('days').style.display="block";
        document.getElementById('months').innerHTML = "";
        break;

      case "Varje-vardag":
        document.getElementById("day0").checked = true;
        document.getElementById("day1").checked = true;
        document.getElementById("day2").checked = true;
        document.getElementById("day3").checked = true;
        document.getElementById("day4").checked = true;
        document.getElementById('weeks').innerHTML = showWeeks;
        document.getElementById('days').style.display="none";
        break;

      case "Varje-vecka":
        document.getElementById('days').innerHTML = showDays;
        document.getElementById('weeks').innerHTML = showWeeks;
        document.getElementById('days').style.display="block";
        document.getElementById('months').innerHTML = "";
        break;

      case "Varannan-vecka":
        document.getElementById('days').innerHTML = showDays;
        document.getElementById('weeks').innerHTML = showWeeks;
        document.getElementById('days').style.display="block";
        document.getElementById('months').innerHTML = "";
        break;

      case "En-gång-i-månaden":
        document.getElementById('days').innerHTML = showDays;
        document.getElementById('days').style.display="block";
        document.getElementById('months').innerHTML = showMonths;
        document.getElementById('weeks').innerHTML = "";
        break;
      
      default:
        document.getElementById('days').innerHTML = showDays;
        document.getElementById('weeks').innerHTML = showWeeks;
        document.getElementById('days').style.display="block";
        document.getElementById('months').innerHTML = "";

    }
  }

  function showAddress(){
    document.getElementById("saved-addresses").innerHTML = "";
    document.getElementById("error-msg").innerHTML="";
    if(localStorage.getItem('savedAddresses')!=null){
      var addresses = JSON.parse(localStorage.getItem('savedAddresses'));
      for(i=0;i<=4;i++){
        if(addresses[i]!=undefined){
          var p = document.createElement("p");
          var hr = document.createElement("hr");
          var remove = document.createElement("BUTTON");
          p.innerHTML = [i+1] + '. ' + addresses[i];
          p.className = "addresses";
          remove.innerHTML = "Radera";
          remove.addEventListener("click",removeAddress, false);
          remove.id = i;
          remove.className = "remove-button";
          document.getElementById("saved-addresses").appendChild(p); 
          document.getElementById("saved-addresses").appendChild(remove);
          document.getElementById("saved-addresses").appendChild(hr); 
        }   
      }  
    }
  }

  function addAddress(){
    var newAddress = document.getElementById('newaddress').value;

    if(localStorage.getItem('savedAddresses')==null){
      localStorage.setItem('savedAddresses','[]');
    }

    var oldAddresses = JSON.parse(localStorage.getItem('savedAddresses'));

    if(oldAddresses.length<5){
      oldAddresses.push(newAddress);
      localStorage.setItem('savedAddresses',JSON.stringify(oldAddresses));
      showAddress();
      document.getElementById('newaddress').value="";
    }

    else{
      document.getElementById("error-msg").innerHTML="Max antal adresser sparade";
    }
    
  }

  function removeAddress(e){
    var localAddresses = JSON.parse(localStorage.getItem('savedAddresses'));
    localAddresses.splice(e.currentTarget.id, 1);
    localStorage.setItem('savedAddresses',JSON.stringify(localAddresses));
    showAddress();
  }

  function addressList(){
    var addresses = JSON.parse(localStorage.getItem('savedAddresses'));
    var dl = document.getElementById('adressList');
    for (i=0; i < addresses.length; i += 1) {
      var option = document.createElement('option');
      option.value = addresses[i];
      dl.appendChild(option);
    }      
  }
    
  