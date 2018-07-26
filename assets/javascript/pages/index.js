

/** Listener to hide and show accordion */

var accordionHeader = document.querySelectorAll('.padded-container.help .header');
for (var i in accordionHeader) {
    accordionHeader[i].addEventListener('click', toggleAccordion);
    break;
}

function toggleAccordion() {
    this.parentElement.classList.toggle('visible');
    var childNodes = this.parentElement.querySelectorAll('.ic i, .ic span');
    for (var i in childNodes) {
        if(i == 'length') {
            break;
        }
        childNodes[i].classList.toggle('visible');
    }
}


/** Add click listener to existing delete icons */
var deleteIcons = document.querySelectorAll('.table tbody tr td i');
for (var i in deleteIcons) {
    if(i == 'length') {
        break;
    }
    deleteIcons[i].addEventListener('click', deleteBiker);
}

function deleteBiker() {
    var row = this.parentElement.parentNode;
    row.parentElement.removeChild(row);

    // if() {
        // No child exists
    // }

}


/** Biker registration logic */

document.getElementById('biker-form-save-btn').addEventListener('click', createBiker);

function createBiker() {

    var biker_name = document.getElementById('biker-name').value;
    var biker_email = document.getElementById('biker-email').value;
    var biker_city = document.getElementById('biker-city').value;
    var biker_group_ride = getBikerGroupRide();
    var biker_days = getBikerDaysOfWeek();

    var inputs = [].concat(biker_name.trim())
        .concat(biker_email.trim())
        .concat(biker_city.trim());

    if (inputs.indexOf('') !== -1) {
        alert('Please enter all required fields');
        return;
    }

    if (!biker_group_ride) {
        alert('Please specify whether you ride in group?');
        return;
    }

    if (!biker_days.length) {
        alert('Please specify at least one day of the week');
        return;
    }

    // Call server (An id should be created and returned)
    var id = generateShortId();

    // Update DOM
    appendBikerInTable(id, biker_name, biker_email, biker_city, biker_group_ride, biker_days);
}

function appendBikerInTable(id, name, email, city, group_ride, days) {
    
    var newRow = document.createElement('tr');

    var jsDate = new Date();

    var lastColumn = document.createElement('td');
    var date = getFormattedDate(jsDate);
    var time = '<span>' + getFormattedTime(jsDate) + '</span>';
    lastColumn.innerHTML = date + time;

    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'icon fa-trash-o';
    deleteIcon.innerHTML = '&#xe802;';
    deleteIcon.addEventListener('click', deleteBiker);

    lastColumn.appendChild(deleteIcon);

    var columns = [name, email, city, group_ride, days.join(',')];
    newRow.innerHTML = '<td>' + columns.join('</td><td>') + '</td>';
    newRow.appendChild(lastColumn);

    document.getElementById('bikers-table-body').appendChild(newRow);
}

function getBikerGroupRide() {
    var radios = document.getElementsByName('biker-group-ride');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
}

function getBikerDaysOfWeek() {
    var bikerDays = [];
    var checkboxes = document.getElementsByName('biker-days');
    for (var i = 0, length = checkboxes.length; i < length; i++) {
        if (checkboxes[i].checked) {
            bikerDays.push(checkboxes[i].value);
        }
    }
    return bikerDays;
}