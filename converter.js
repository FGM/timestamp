/**
 * @file
 * Scripts for the Timestamp extension for Chrome
 *
 * @copyright (C) 2011 Ouest Systèmes Informatiques (OSInet)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program, in file LICENSE.txt. If not, see <http://www.gnu.org/licenses/>.
 *
 * Contact information:
 *   http://www.osinet.fr/osi/contact.asp
 */

/**
 * Update #now from string representation of parameter.
 * 
 * @param ts
 *   A UNIX timestamp
 */
function updateNow(ts) {
  var element = document.getElementById('now');
  element.innerHTML = ts.toString();
}

/**
 * Update #now based on date/time input values
 */
function tsChangeDateTime() {
  var fields = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minutes: 0,
    seconds: 0
  };
  for (field in fields) {
    fields[field] = document.getElementById(field).value;
  }
  var ts = new Date(fields.year, fields.month, fields.day, fields.hour, fields.minutes, fields.seconds, 0);
  var timestamp = document.getElementById('timestamp');
  timestamp.value = Math.round(ts.getTime() / 1000);
  updateNow(ts);
}

/**
 * Update date/time input elements based on #now or current time
 * 
 * @param useElement
 *   Use #now if true, otherwise use current time.
 */
function tsChangeTimestamp(useElement) {
  var fields = {};

  if (useElement) {
    var timestamp = document.getElementById('timestamp');
    var ts = new Date(timestamp.value * 1000);
  }
  else {
    var ts = new Date();
    fields['timestamp'] = Math.round(ts.getTime() / 1000);
  }

  var otherFields = {
    year: ts.getFullYear(),
    month: ts.getMonth(),
    day: ts.getDate(),
    hour: ts.getHours(),
    minutes: ts.getMinutes(),
    seconds: ts.getSeconds()
  };

  for (field in otherFields) {
    fields[field] = otherFields[field];
  };

  for (field in fields) {
    var element = document.getElementById(field);
    var value = fields[field];
    element.value = value;
  };
  updateNow(ts);
}

/**
 * Convert an underscore in the chosen property to an underlined span and accesskey attribute
 *  
 * @param element
 *   The element on which to act.
 * @param property
 *   The name of the property in which to look for an underscore.
 */
function buildSingleAccessKey(element, property) {
  var pos = element[property].indexOf('_'); 
  if (pos == -1) {
    return;
  }
  
 element.accessKey = element[property][pos + 1];
 element[property] = element[property].replace(/_(.)/, '<span class="underline">$1</span>');
}

/**
 * Build access keys on all input elements or the labels attached to them.
 */
function buildAccesskeys() {
  if (buildAccesskeys.alreadyRan) {
    return;
  }
  else {
    buildAccesskeys.alreadyRan = true;
  }
  
  var inputs = document.getElementsByTagName('input');
  
  if (inputs.length > 0) {
    for (var i = 0 ; i < inputs.length ; i++) {
      var element = inputs[i];
      var accessor = element.labels.length
        ? element.labels[0]
        : element;
      switch (accessor.tagName) {
        case 'LABEL':
          buildSingleAccessKey(accessor, 'innerHTML');
          break;
          
        case 'INPUT':
          buildSingleAccessKey(accessor, 'value');
          break;
      }     
    }
  }
}

/**
 * Initialize screen:
 * - build access keys
 * - fill input fields with default values
 */
function initialize() {
  buildAccesskeys();
  tsChangeTimestamp();
}
