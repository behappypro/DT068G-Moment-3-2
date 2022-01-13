"use strict";


// Code for FAQ
var faq = document.getElementsByClassName("faq");
let daysArray = ["Lördag", "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
let monthArray = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December", "Januari", "Februari"];
let savedAddressArray = [];
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
/*

window.addEventListener("error", handleError, true);

function handleError(evt) {
    if (evt.message) { // Chrome sometimes provides this
        alert("error: " + evt.message + " at linenumber: " + evt.lineno + " of file: " + evt.filename);
    } else {
        alert("error: " + evt.type + " from element: " + (evt.srcElement || evt.target));
    }
}

window.onerror = function(msg, url, linenumber) {
    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
}
*/

/*JS för menyn*/
var menu = document.querySelector(".menu")
var ham = document.querySelector(".ham")
var xIcon = document.querySelector(".xIcon")
var menuIcon = document.querySelector(".menuIcon")
var body = document.getElementsByTagName("BODY")[0];
var menuLinks = document.querySelectorAll(".menu-item")

ham.addEventListener("click", toggleMenu)

menuLinks.forEach(
    function(menuLink) {
        menuLink.addEventListener("click", toggleMenu)
    }
)

function getElements() {
    const fromAdress = document.getElementById('fromAdress');
    const toAdress = document.getElementById('toAdress');
    const fromAdress2 = document.getElementById('fromAdress2');
    const toAdress2 = document.getElementById('toAdress2');
    const persons = document.getElementById('persons');
    const information = document.getElementById('information');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const formTime = document.getElementById('time');
    const extra = document.getElementById('extra');
    const animal = document.getElementById('option1');
    const wheelchair = document.getElementById('option3');
    const repeatTransport = document.getElementById('repeatTransport');

}

function getFormData() {
    IsEmpty();
    if(window.location.href.indexOf("aterkommanderesa") != -1){
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        if(checkboxes.length == 0) {
        alert("Ingen dag vald");
        }
    }
    if (document.getElementById('startweek') != null) {
        const startWeek = document.getElementById('startweek');
        const endWeek = document.getElementById('endweek');
        data.startWeek = startWeek.value;
        data.endWeek = endWeek.value;
        data.time = time.value;
    } else if (document.getElementById('startmonth') != null) {
        const startMonth = document.getElementById('startmonth');
        const endMonth = document.getElementById('endmonth');
        data.startMonth = startMonth.value;
        data.endMonth = endMonth.value;
        data.time = time.value;
    }

    getElements();
    data.fromAdress = fromAdress.value;
    data.toAdress = toAdress.value;
    data.persons = persons.value;
    data.information = information.value;
    data.phone = phone.value;

    if (typeof(repeatTransport) != 'undefined' && repeatTransport != null) {
        data.repeatTransport = repeatTransport.value;
    }

    if (document.getElementById('option1').checked) {
        data.animal = "Sällskapsdjur";
    }

    if (document.getElementById('option3').checked) {
        data.wheelchair = "Rullstolsanpassat";
    }

    if (window.location.href.indexOf("aterkommanderesa") != -1) {
        var days = '';
        for (var i = 0; i <= 6; i++) {
            var element = document.getElementById('day' + i)

            if (element.checked) {
                var day = element.value;
                days += ' ' + day + ',';
                data.date = days;
            }
        }
        localStorage.setItem('unAcceptedRepeatedBooking', JSON.stringify(data));
    } 
    
    else if (window.location.href.indexOf("turoreturresa") != -1) {
        var date = document.getElementById('datepicker').value;
        const dateArray = date.split(' - ');
        data.fromDate = dateArray[0];
        data.toDate = dateArray[1];
        data.time1 = document.getElementById('time1').value;
        data.time2 = document.getElementById('time2').value;
        localStorage.setItem('unAcceptedTwoWayBooking', JSON.stringify(data));
    } 
    
    else {
        data.date = document.getElementById('date').value;
        data.time = time.value;
        localStorage.setItem('unAcceptedBooking', JSON.stringify(data));
    }

}

function printData() {
    getElements();

    if (window.location.href.indexOf("bekraftaresa") != -1) {
        var data = JSON.parse(localStorage.getItem('unAcceptedBooking'));
    } else if (window.location.href.indexOf("bekraftaaterkommanderesa") != -1 ||
        window.location.href.indexOf("aterkommanderesor") != -1) {

        if (window.location.href.indexOf("bekraftaaterkommanderesa") != -1) {
            var data = JSON.parse(localStorage.getItem('unAcceptedRepeatedBooking'));
        } else {
            var data = JSON.parse(localStorage.getItem('repeatedBooking'));
        }
        if (data.startWeek != null) {
            var startWeek = data.startWeek;
            const startWeekArray = startWeek.split('W');
            var endWeek = data.endWeek;
            const endWeekArray = endWeek.split('W');
            document.getElementById('week').innerHTML = `<h3>
          <svg width="16px" id="weekIcon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-calendar2-week-fill">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
          </svg>Vecka: ` + startWeekArray[1] + '-' + endWeekArray[1];
        } else if (data.startMonth != null) {
            let monthArray = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];

            var startMonth = data.startMonth;
            const startMonthArray = startMonth.split('-');
            var endMonth = data.endMonth;
            const endMonthArray = endMonth.split('-');
            document.getElementById('month').innerHTML = `<h3>
          <svg width="16px" id="weekIcon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-calendar2-week-fill">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
          </svg>` + monthArray[startMonthArray[1] - 1] + '-' + monthArray[endMonthArray[1] - 1];
        }
    } else if (window.location.href.indexOf("aterkommanderesor") != -1) {
        var data = JSON.parse(localStorage.getItem('repeatedBooking'));

    } else {
        var data = JSON.parse(localStorage.getItem('regularBooking'));
    }

    if (window.location.href.indexOf("bekraftaturoreturresa") != -1 || window.location.href.indexOf("bokadturoretur") != -1  ) {
      if(window.location.href.indexOf("bekraftaturoreturresa") != -1){
        var data = JSON.parse(localStorage.getItem('unAcceptedTwoWayBooking'));
      }
      else{
        var data = JSON.parse(localStorage.getItem('twoWayBooking'));
      }
        var splitFirstDate = data.fromDate;
        const firstDateArray = splitFirstDate.split('-');
        let year1 = firstDateArray[0];
        let originalYear1 = year1;
        let month1 = parseInt(firstDateArray[1]);
        let day1 = parseInt(firstDateArray[2]);
        

        var splitSecondDate = data.toDate;
        const secondDateArray = splitSecondDate.split('-');
        let year2 = secondDateArray[0];
        let originalYear2 = year2;
        let month2 = parseInt(secondDateArray[1]);
        let day2 = parseInt(secondDateArray[2]);
        

        document.getElementById('time1').textContent = data.time1;
        document.getElementById('date1').textContent = daysArray[calculateDay(day1,month1,year1) + 1] + ' ' + day1 + ' ' + monthArray[month1 - 1] + ' ' + originalYear1;

        document.getElementById('time2').textContent = data.time2;
        document.getElementById('date2').textContent = daysArray[calculateDay(day2,month2,year2) + 1] + ' ' + day2 + ' ' + monthArray[month1 - 1] + ' ' + originalYear2;

        fromAdress2.innerHTML = data.toAdress;
        toAdress2.innerHTML = data.fromAdress;


        persons.innerHTML = data.persons;

    } else {
        var splitDate = data.date;
        const dateArray = splitDate.split('-');
        let year = dateArray[0];
        let originalYear = year;
        let month = parseInt(dateArray[1]);
        let day = parseInt(dateArray[2]);

       /*  if (month < 3) {
            month = month + 12;
            year = year - 1;
        }

        let partOfYear = Math.floor(year / 100);
        let yearOfCentury = year % 100;

        var S = Math.floor(2.6 * month - 5.39) + Math.floor(yearOfCentury / 4) + Math.floor(partOfYear / 4) + day + yearOfCentury - (2 * partOfYear);

        var dayOfWeek = S - (7 * Math.floor(S / 7)); */

        persons.innerHTML = data.persons;

        if (window.location.href.indexOf("bekraftaaterkommanderesa") != -1) {
            if (data.repeatTransport == "Varje-vardag") {
                date.innerHTML = "Måndag-Fredag";
            } else {
                date.innerHTML = data.date;
            }
            time.innerHTML = data.time;
            repeatTransport.innerHTML = data.repeatTransport;

        } else if (window.location.href.indexOf("aterkommanderesor") != -1) {
            date.innerHTML = data.date;
            time.innerHTML = data.time;
            repeatTransport.innerHTML = data.repeatTransport;
        } else if (window.location.href.indexOf("bekraftaresa") != -1) {
            date.innerHTML = daysArray[calculateDay(day,month,year) + 1] + ' ' + day + ' ' + monthArray[month - 1] + ' ' + originalYear;
            time.innerHTML = data.time;
        } else {
            date.innerHTML = data.date;
            time.innerHTML = data.time;
        }
    }

    phone.innerHTML = data.phone;
    //' ' nedan
    fromAdress.innerHTML = data.fromAdress;
    toAdress.innerHTML = data.toAdress;
    if (data.animal != undefined && data.wheelchair != undefined) {
        extra.innerHTML += data.animal + ', ';
    } else if (data.animal != undefined) {
        extra.innerHTML += data.animal;
    }

    if (data.wheelchair != undefined) {
        extra.innerHTML += data.wheelchair;
    }

    if (data.animal == undefined && data.wheelchair == undefined) {
        extra.innerHTML = "Inga";
    }

}
function clearBooking() {
    if (window.location.href.indexOf("aterkommanderesor") != -1) {
        localStorage.removeItem('repeatedBooking');
    } 
    
    else if (window.location.href.indexOf("kommanderesor") != -1) {
        localStorage.removeItem('regularBooking');
    }

    else if(window.location.href.indexOf("bokadturoretur") != -1 ){
        localStorage.removeItem('twoWayBooking');
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/ingaturoreturresor.html");
    }

    else if (localStorage.getItem('regularBooking') == null) {
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/ingaresor.html");
    }

    if(window.location.href.indexOf("bekraftaresa") != -1){
      checkIfRideBooked();
    }

    if(window.location.href.indexOf("bekraftaturoreturresa") != -1){
      checkIfTwoWayRideBooked();
    }

    localStorage.removeItem('unAcceptedBooking');
    localStorage.removeItem('unAcceptedRepeatedBooking');
    localStorage.removeItem('unAcceptedTwoWayBooking');
}

function confirmDelete() {

    getElements();
    // Get the modal
    var modal = document.getElementById("modal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementsByClassName("close")[1];

    modal.style.display = "block";

    if (window.location.href.indexOf("aterkommanderesor") != -1 ||
        window.location.href.indexOf("kommanderesor") != -1) {
        if (window.location.href.indexOf("aterkommanderesor") != -1) {
            var data = JSON.parse(localStorage.getItem('repeatedBooking'));
        } else {
            var data = JSON.parse(localStorage.getItem('regularBooking'));
        }

        const boxFromAdress = document.getElementById('box-fromAdress');
        const boxToAdress = document.getElementById('box-toAdress');
        const boxTime = document.getElementById('box-time');
        const boxRepeat = document.getElementById('box-repeat');

        boxFromAdress.innerHTML = data.fromAdress;
        boxToAdress.innerHTML = data.toAdress;
        boxTime.innerHTML = data.time;

        if (boxRepeat != undefined) {
            boxRepeat.innerHTML = data.repeatTransport;
        }
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

function confirmBooking() {
    if (document.getElementById('week') != null) {
        var weekdata = JSON.parse(localStorage.getItem('unAcceptedRepeatedBooking'));
        data.startWeek = weekdata.startWeek;
        data.endWeek = weekdata.endWeek;
    } else if (document.getElementById('month') != null) {
        var monthdata = JSON.parse(localStorage.getItem('unAcceptedRepeatedBooking'));
        data.startMonth = monthdata.startMonth;
        data.endMonth = monthdata.endMonth;
    }
    getElements();
    
    data.fromAdress = fromAdress.textContent;
    data.toAdress = toAdress.textContent;
    data.persons = persons.textContent;
    data.phone = phone.textContent;

    if(document.getElementById('fromAdress2') != null ){
      var unAcceptedTwoWayBooking = JSON.parse(localStorage.getItem('unAcceptedTwoWayBooking'));
      data.fromDate = unAcceptedTwoWayBooking.fromDate;
      data.toDate = unAcceptedTwoWayBooking.toDate;
      data.time1 = unAcceptedTwoWayBooking.time1;
      data.time2 = unAcceptedTwoWayBooking.time2;
    
      window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/bokadturoretur.html");
    }
    else{
    data.date = date.textContent;
    data.time = time.textContent;
    }
    clearBooking();

    if (extra.textContent == "Sällskapsdjur") {
        data.animal = "Sällskapsdjur";
    } else if (extra.textContent == "Rullstolsanpassat") {
        data.wheelchair = "Rullstolsanpassat";
    } else if (extra.textContent == "Sällskapsdjur, Rullstolsanpassat") {
        data.animal = "Sällskapsdjur";
        data.wheelchair = "Rullstolsanpassat";
    }

    if (typeof(repeatTransport) != 'undefined' && repeatTransport != null) {
        data.repeatTransport = repeatTransport.textContent;
    }

    if (window.location.href.indexOf("bekraftaaterkommanderesa") != -1) {
        localStorage.setItem('repeatedBooking', JSON.stringify(data));
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/aterkommanderesor.html");
    } 
    
    else if(window.location.href.indexOf("bekraftaresa") != -1) {
        localStorage.setItem('regularBooking', JSON.stringify(data));
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/kommanderesor.html");

    }

    else{
      localStorage.setItem('twoWayBooking', JSON.stringify(data));
      window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/bokatturoreturresa.html");

    }

}

function showModal() {
    // Get the modal
    var modal = document.getElementById("modal");


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementsByClassName("addButton")[0];

    // When the user clicks the button, open the modal 

    modal.style.display = "block";
    if (window.location.href.indexOf("bekraftaresa") != -1 ||
        window.location.href.indexOf("bekraftaaterkommanderesa") != -1||
        window.location.href.indexOf("bekraftaturoreturresa") != -1) {
        countDown();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    closeButton.onclick = function() {
        if (window.location.href.indexOf("sparadeadresser") != -1) {
            if (document.getElementById('newaddress').value > '') {
                addAddress();
                modal.style.display = "none";
            }
        }

        if (window.location.href.indexOf("bekraftaaterkommanderesa") != -1) {
            confirmBooking();
        }

        if (window.location.href.indexOf("bekraftaturoreturresa") != -1) {
          confirmBooking();
      }

        if (window.location.href.indexOf("bekraftaresa") != -1) {
            if (JSON.parse(localStorage.getItem('regularBooking') != null)) {
                localStorage.removeItem('regularBooking');
            }
            confirmBooking();
        }

        if (JSON.parse(localStorage.getItem('unAcceptedBooking') != null)) {
            localStorage.removeItem('unAcceptedBooking');
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function checkIfRideBooked() {
    if (localStorage.getItem('regularBooking') != null) {
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/kommanderesor.html");
    } else {
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/ingaresor.html");
    }
}

function checkIfRepeatedRideBooked() {
    if (localStorage.getItem('repeatedBooking') != null) {
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/aterkommanderesor.html");
    } else {
        window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/ingaaterkommanderesor.html");
    }
}

function checkIfTwoWayRideBooked() {
  if (localStorage.getItem('twoWayBooking') != null) {
      window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/bokadturoretur.html");
  } else {
      window.location.replace("http://studenter.miun.se/~asha1900/dt068g/moment3-2/ingaturoreturresor.html");
  }
}

function reBook() {
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
    data.fromAdress = fromAdress.textContent;
    data.toAdress = toAdress.textContent;
    data.persons = persons.value;
    data.phone = phone.textContent;
    data.information = information.value;
    data.wheelchair = wheelchair.textContent;

    if (date.value > "" && formTime.value > "") {
        localStorage.setItem('regularBooking', JSON.stringify(data));
    }

}

function countDown() {
    var timeleft = 2;
    var downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            confirmBooking();
          
        } else {}
        timeleft -= 1;
    }, 1000);
}

function showDays() {

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
    <label for="day6">Söndag</label>
    <span></span><span></span><span></span><span></span><span></span><span></span>
                    <span>Fältet 'Dagar' krävs.<br></span>`;

    var showWeeks = `<label for="startweek">Startvecka</label>
    <input type="week" name="week" id="startweek" required>
    <span>Fältet 'Startvecka' krävs.<br></span>
    <label for="endweek">Slutvecka</label>
    <input type="week" name="week" id="endweek" required>
    <span>Fältet 'Slutvecka' krävs.<br></span>
    `;

    var showMonths = `<label for="startmonth">Startmånad</label>
    <input type="month" name="month" id="startmonth" required>
    <label for="endmonth">Slutmånad</label>
    <input type="month" name="endmonth" id="endmonth" required>`;

    switch (document.getElementById('repeatTransport').value) {
        case "Valfria dagar":
            document.getElementById('days').innerHTML = showDays;
            document.getElementById('weeks').innerHTML = showWeeks;
            document.getElementById('days').style.display = "block";
            document.getElementById('months').innerHTML = "";
            break;

        case "Varje vardag":
            document.getElementById("day0").checked = true;
            document.getElementById("day1").checked = true;
            document.getElementById("day2").checked = true;
            document.getElementById("day3").checked = true;
            document.getElementById("day4").checked = true;
            document.getElementById('weeks').innerHTML = showWeeks;
            document.getElementById('days').style.display = "none";
            document.getElementById('months').style.display = "none";
            break;

        case "Varje vecka":
            document.getElementById('days').innerHTML = showDays;
            document.getElementById('weeks').innerHTML = showWeeks;
            document.getElementById('days').style.display = "block";
            document.getElementById('months').innerHTML = "";
            document.getElementById('months').style.display = "none";
            break;

        case "Varannan vecka":
            document.getElementById('days').innerHTML = showDays;
            document.getElementById('weeks').innerHTML = showWeeks;
            document.getElementById('days').style.display = "block";
            document.getElementById('months').innerHTML = "";
            document.getElementById('months').style.display = "none";
            break;

        case "En gång i månaden":
            document.getElementById('days').innerHTML = showDays;
            document.getElementById('days').style.display = "block";
            document.getElementById('months').style.display = "block";
            document.getElementById('months').innerHTML = showMonths;
            document.getElementById('weeks').innerHTML = "";
            document.getElementById('weeks').style.display = "none";
            editAterkommandeResa();
            break;

        default:
            document.getElementById('days').innerHTML = showDays;
            document.getElementById('weeks').innerHTML = showWeeks;
            document.getElementById('days').style.display = "block";
            document.getElementById('months').style.display = "none";
            document.getElementById('months').innerHTML = "";

    }
}

function showAddress() {
    document.getElementById("saved-addresses").innerHTML = "";
    document.getElementById("error-msg").innerHTML = "";
    if (localStorage.getItem('savedAddresses') != null) {
        var addresses = JSON.parse(localStorage.getItem('savedAddresses'));
        for (i = 0; i <= 4; i++) {
            if (addresses[i] != undefined) {
                var p = document.createElement("p");
                var hr = document.createElement("hr");
                var remove = document.createElement("BUTTON");
                p.innerHTML = [i + 1] + '. ' + addresses[i];
                p.className = "addresses";
                remove.innerHTML = "Radera";
                remove.addEventListener("click", removeAddress, false);
                remove.id = i;
                remove.className = "remove-button";
                document.getElementById("saved-addresses").appendChild(p);
                document.getElementById("saved-addresses").appendChild(remove);
                document.getElementById("saved-addresses").appendChild(hr);
            }
        }
    }
}

function addAddress() {
    var newAddress = document.getElementById('newaddress').value;

    if (localStorage.getItem('savedAddresses') == null) {
        localStorage.setItem('savedAddresses', '[]');
    }

    var oldAddresses = JSON.parse(localStorage.getItem('savedAddresses'));

    if (oldAddresses.length < 5) {
        oldAddresses.push(newAddress);
        localStorage.setItem('savedAddresses', JSON.stringify(oldAddresses));
        showAddress();
        document.getElementById('newaddress').value = "";
    } else {
        document.getElementById("error-msg").innerHTML = "Max antal adresser sparade";
    }

}

function removeAddress(e) {
    var localAddresses = JSON.parse(localStorage.getItem('savedAddresses'));
    localAddresses.splice(e.currentTarget.id, 1);
    localStorage.setItem('savedAddresses', JSON.stringify(localAddresses));
    showAddress();
}

function addressList() {
    var addresses = JSON.parse(localStorage.getItem('savedAddresses'));
    var dl = document.getElementById('adressList');
    for (i = 0; i < addresses.length; i += 1) {
        var option = document.createElement('option');
        option.value = addresses[i];
        dl.appendChild(option);
    }
}

function editBooking() {
    let monthArray = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];

    if (JSON.parse(localStorage.getItem('unAcceptedBooking')) != null || JSON.parse(localStorage.getItem('regularBooking')) != null) {
        if (JSON.parse(localStorage.getItem('unAcceptedBooking')) != null) {
            var data = JSON.parse(localStorage.getItem('unAcceptedBooking'));
            document.getElementById("date").value = data.date;
        } else if (JSON.parse(localStorage.getItem('regularBooking')) != null) {
            var data = JSON.parse(localStorage.getItem('regularBooking'));
            if (data.date.includes("-")) {
                document.getElementById("date").value = data.date;
            } else {
                var splitDate = data.date;
                const dateArray = splitDate.split(' ');
                let year = dateArray[3];
                let month = dateArray[2];
                let day = parseInt(dateArray[1]);

                if (day < 10) {
                    day = "0" + day;
                }

                for (var i = 0; i < monthArray.length; i++) {
                    if (month == monthArray[i]) {
                        month = i + 1;
                        if (month < 10) {
                            month = "0" + month;
                        }
                    }
                }

                var newDate = year + '-' + month + '-' + day;

                document.getElementById("date").value = newDate;
            }
        }
        document.getElementById("fromAdress").value = data.fromAdress;
        document.getElementById("toAdress").value = data.toAdress;
        document.getElementById("time").value = data.time;
        document.getElementById("persons").value = data.persons;
        if (data.information > "") {
            document.getElementById("information").value = data.information;
        }
        document.getElementById("phone").value = data.phone;
        if (data.animal > "" && data.animal != undefined) {
            document.getElementById("option1").checked = true;;
        }
        if (data.wheelchair > "" && data.wheelchair != undefined) {
            document.getElementById("option3").checked = true;;
        }
    }

}

function editAterkommandeResa() {
    if (JSON.parse(localStorage.getItem('unAcceptedRepeatedBooking')) != null || JSON.parse(localStorage.getItem('repeatedBooking')) != null) {

        if (JSON.parse(localStorage.getItem('unAcceptedRepeatedBooking')) != null) {
            var data = JSON.parse(localStorage.getItem('unAcceptedRepeatedBooking'));
        } else if (JSON.parse(localStorage.getItem('repeatedBooking')) != null) {
            var data = JSON.parse(localStorage.getItem('repeatedBooking'));
        }

        var splitDate = data.date;
        const dateArray = splitDate.split(',');

        for (var i = 0; i < dateArray.length; i++) {
            switch (dateArray[i]) {
                case " Måndag":
                    console.log("True");
                    document.getElementById("day0").checked = true;
                    break;

                case " Tisdag":
                    document.getElementById("day1").checked = true;
                    break;

                case " Onsdag":
                    document.getElementById("day2").checked = true;
                    break;

                case " Torsdag":
                    document.getElementById("day3").checked = true;
                    break;

                case " Fredag":
                    document.getElementById("day4").checked = true;
                    break;

                case " Lördag":
                    document.getElementById("day5").checked = true;
                    break;

                case " Söndag":
                    document.getElementById("day6").checked = true;
                    break;
                default:
                    console.log("False");
            }
        }

        if (data.startWeek != null) {
            document.getElementById('startweek').value = data.startWeek;
            document.getElementById('endweek').value = data.endWeek;
        } else if (data.startMonth != null) {

            if (document.getElementById('startmonth')) {

                document.getElementById('startmonth').value = data.startMonth;
                document.getElementById('endmonth').value = data.endMonth;
            }

        }


        document.getElementById('repeatTransport').value = data.repeatTransport;

        document.getElementById("fromAdress").value = data.fromAdress;
        document.getElementById("toAdress").value = data.toAdress;
        document.getElementById("time").value = data.time;
        document.getElementById("persons").value = data.persons;
        if (data.information > "") {
            document.getElementById("information").value = data.information;
        }
        document.getElementById("phone").value = data.phone;

        if (data.animal > "" && data.animal != undefined) {
            document.getElementById("option1").checked = true;;
        }
        if (data.wheelchair > "" && data.wheelchair != undefined) {
            document.getElementById("option3").checked = true;;
        }
    }
}

function editTurOReturResa(){
  if (JSON.parse(localStorage.getItem('unAcceptedTwoWayBooking')) != null || JSON.parse(localStorage.getItem('twoWayBooking')) != null) {

    if (JSON.parse(localStorage.getItem('unAcceptedTwoWayBooking')) != null) {
        var data = JSON.parse(localStorage.getItem('unAcceptedTwoWayBooking'));
    } else if (JSON.parse(localStorage.getItem('twoWayBooking')) != null) {
        var data = JSON.parse(localStorage.getItem('twoWayBooking'));
    }

    document.getElementById("datepicker").value = data.fromDate + ' - ' + data.toDate;
   
    document.getElementById("fromAdress").value = data.fromAdress;
    document.getElementById("toAdress").value = data.toAdress;
    document.getElementById("time1").value = data.time1;
    document.getElementById("time2").value = data.time2;
    document.getElementById("persons").value = data.persons;
    if (data.information > "") {
       document.getElementById("information").value = data.information;
    }
      document.getElementById("phone").value = data.phone;
    if (data.animal > "" && data.animal != undefined) {
        document.getElementById("option1").checked = true;;
    }
    if (data.wheelchair > "" && data.wheelchair != undefined) {
      document.getElementById("option3").checked = true;;
    }
}

}

function toggleMenu() {
    if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
        xIcon.style.display = "none";
        menuIcon.style.display = "block";
        body.style.overflow = "auto";
    } else {
        menu.classList.add("showMenu");

        xIcon.style.display = "block";
        menuIcon.style.display = "none";
        body.style.overflow = "hidden";
    }
}

function notifications() {
    if (localStorage.getItem('regularBooking') != null) {
        document.getElementsByClassName("badge")[0].innerHTML = 1;
        document.getElementsByClassName("badge")[0].style.display = "block";
    } else {
        document.getElementsByClassName("badge")[0].innerHTML = 0;
        document.getElementsByClassName("badge")[0].style.display = "block";
        document.getElementsByClassName("badge")[0].style.backgroundColor = "#b72222";
    }

    if (localStorage.getItem('twoWayBooking') != null) {
      document.getElementsByClassName("badge")[1].innerHTML = 1;
      document.getElementsByClassName("badge")[1].style.display = "block";
  } else {
      document.getElementsByClassName("badge")[1].innerHTML = 0;
      document.getElementsByClassName("badge")[1].style.display = "block";
      document.getElementsByClassName("badge")[1].style.backgroundColor = "#b72222";
  }

    if (localStorage.getItem('repeatedBooking') != null) {
        document.getElementsByClassName("badge")[2].innerHTML = 1;
        document.getElementsByClassName("badge")[2].style.display = "block";
    } else {
        document.getElementsByClassName("badge")[2].innerHTML = 0;
        document.getElementsByClassName("badge")[2].style.display = "block";
        document.getElementsByClassName("badge")[2].style.backgroundColor = "#b72222";
    }


    if (localStorage.getItem('savedAddresses') != null) {
        const addressArray = localStorage.getItem('savedAddresses').split(',');
        document.getElementsByClassName("badge")[4].innerHTML = addressArray.length;
        document.getElementsByClassName("badge")[4].style.display = "block";
    } else {
        document.getElementsByClassName("badge")[4].innerHTML = 0;
        document.getElementsByClassName("badge")[4].style.display = "block";
        document.getElementsByClassName("badge")[4].style.backgroundColor = "#b72222";
    }


}

function calculateDay(day,month,year) {
    if (month < 3) {
        month = month + 12;
        year = year - 1;
    }

    let partOfYear = Math.floor(year / 100);
    let yearOfCentury = year % 100;

    var S = Math.floor(2.6 * month - 5.39) + Math.floor(yearOfCentury / 4) + Math.floor(partOfYear / 4) + day + yearOfCentury - (2 * partOfYear);

    var dayOfWeek = S - (7 * Math.floor(S / 7));

    return dayOfWeek;
}

function IsEmpty() {
  
    var inputs = document.getElementsByTagName('input');
    var span = document.querySelectorAll('form span');
    
    
    for(var key in inputs) {
        var value = inputs[key].value;
        if(value < 1) {
        
            console.log(inputs[key]);
            inputs[key].className = "error";
            span[key].className='required';

        }
    }
}
    
    
  