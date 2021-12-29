"use strict";


// Code for FAQ
var faq = document.getElementsByClassName("faq");

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

  // Code for form
  var data = {};
      // Get the data from each element on the form.

  function readData(){
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
  }
   function getFormData(){
    readData();
    data.fromAdress = fromAdress.value;
    data.toAdress = toAdress.value;
    data.persons = persons.value;
    data.information = information.value;
    data.phone = phone.value;
    data.date = date.value;
    data.time = time.value;
    
    if (document.getElementById('option1').checked) {
        data.animal = "Sällskapsdjur";
      }

      
    if(document.getElementById('option3').checked){
        data.wheelchair = "Rullstolsanpassat";
      }

    localStorage.setItem('formData', JSON.stringify(data));
   }

   function printData(){
    let daysArray = ["Lördag","Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag"];
    let monthArray = ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December","Januari","Februari"];
    var data = JSON.parse(localStorage.getItem('formData'));
    readData();
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
    if(window.location.href.indexOf("aterkommanderesor") != -1){
      date.innerHTML = daysArray[dayOfWeek+1]+'ar';
      time.innerHTML = data.time;
    }

    else{
      date.innerHTML = daysArray[dayOfWeek+1] + ' ' + day + ' ' +monthArray[month-1] + ' ' + originalYear;
      time.innerHTML = data.time + ',';
    }

    
    phone.innerHTML = data.phone;
    fromAdress.innerHTML = ' '+ data.fromAdress;
    toAdress.innerHTML = ' '+ data.toAdress;
    if(data.animal!=undefined){
      extra.innerHTML += data.animal + ', ';
    }

    if(data.wheelchair!=undefined){
      extra.innerHTML += data.wheelchair;
    }
    
   }

   function cancelBooking(){
     localStorage.clear();
   }

   function confirmDelete(){
    const boxFromAdress = document.getElementById('box-fromAdress');
    const boxToAdress = document.getElementById('box-toAdress');
    const boxTime = document.getElementById('box-time')
    var data = JSON.parse(localStorage.getItem('formData'));
    readData();
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

   function showModal(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("order");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementsByClassName("close")[1];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
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

   function checkIfRideBooked(){
     if(localStorage.getItem('formData')!=null){
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

    localStorage.setItem('repeatedBooking', JSON.stringify(data));
   }

/*
   function getBreadcrumbs() {
    const here = location.href.split('/').slice(3);
    // console.log(here)
    const parts = [{"text": 'Home', "link": '/'}];
    // console.log(parts)

    for (let i = 0; i < here.length; i++) {
        const part = here[i];
        // console.log(part)
        const text = decodeURIComponent(part).split('.')[0];
        // console.log(text)
        const link = '/' + here.slice(0, i + 1).join('/');
        console.log(link)
        parts.push({"text": text, "link": link});
        // console.log(parts)
    }
    return parts.map((part) => {
        return "<a href=\"" + part.link + "\">" + part.text + "</a>"
    }).join('<span style="padding: 5px">/</span>')
}

document.getElementById("demo").innerHTML = getBreadcrumbs();
*/


