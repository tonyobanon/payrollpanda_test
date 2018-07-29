

/** Add click listener to hide and show accordion */

var accordionHeader = document.querySelectorAll('.padded-container.help .header');
for (var i in accordionHeader) {
    accordionHeader[i].addEventListener('click', toggleAccordion);
    break;
}

/**
 * This function toggles the accordion content
 */
function toggleAccordion() {
    this.parentElement.classList.toggle('visible');
    var childNodes = this.parentElement.querySelectorAll('.ic i, .ic span');
    for (var i in childNodes) {
        if (i == 'length') {
            break;
        }
        childNodes[i].classList.toggle('visible');
    }
}


/** Add click listener to existing delete icons on the bikers table */

var deleteIcons = document.querySelectorAll('.table tbody tr td i');
for (var i in deleteIcons) {
    if (i == 'length') {
        break;
    }
    deleteIcons[i].addEventListener('click', deleteBiker);
}

/**
 * This function delete a row from the bikers table
 */
function deleteBiker() {
    var row = this.parentElement.parentNode;
    row.parentElement.removeChild(row);
}


/** Add click listener to the save button */

document.getElementById('biker-form-save-btn').addEventListener('click', createBiker);

/**
 * This function parses and validates the biker data from the inputs, then updates
 * the bikers table
 */
function createBiker() {

    var biker_name = document.getElementById('biker-name').value;
    var biker_email = document.getElementById('biker-email').value;
    var biker_city = document.getElementById('biker-city').value;
    var biker_group_ride = getBikerGroupRide();
    var biker_days = getBikerDaysOfWeek();

    // Implode all input values, for easy validation
    var inputs = [].concat(biker_name.trim())
        .concat(biker_email.trim())
        .concat(biker_city.trim());

    if (inputs.indexOf('') !== -1) {
        alert('Please enter all required fields');
        return;
    }

    // Perform other input validations

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
    appendBikerInTable(id, biker_name, biker_email, biker_city, biker_group_ride, parseDays(biker_days));
}

/**
 * 
 * This function appends the given biker information to the bikers table
 * 
 * @param {Number} id Server generated Id
 * @param {String} name Biker's name
 * @param {String} email Biker's email
 * @param {String} city Biker's city
 * @param {String} group_ride Biker's "ride in group" setting
 * @param {Array<String>} days Biker's availability days
 */
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

/**
 * This function returns the "Group ride" setting from the selected radio buttons in the
 * registration form
 */
function getBikerGroupRide() {
    var radios = document.getElementsByName('biker-group-ride');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
}

/**
 * This function returns the availability days from the selected checkboxes in the
 * registration form
 */
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

/**
 * This functions parses the array of biker availability days such that it tries to
 * detect whether they are weekdays, weekends or everyday
 * @param {Array<String>} days 
 */
function parseDays(days) {

    if (days.length == 7) {
        days = ['Every day'];
    }
    if (days.length == 2 && days.indexOf('Sat') != -1 && days.indexOf('Sun') != -1) {
        days = ['Weekends'];
    }
    if (days.length == 5 && days.indexOf('Sat') == -1 && days.indexOf('Sun') == -1) {
        days = ['Week days'];
    }

    return days;
}