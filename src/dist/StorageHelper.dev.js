"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReminders = setReminders;
exports.getReminders = getReminders;
exports.functiondeleteAllReminders = functiondeleteAllReminders;

function setReminders(reminders) {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

;

function getReminders() {
  var reminders = localStorage.getItem('reminders');
  return reminders !== null ? JSON.parse(reminders) : [];
}

;

function functiondeleteAllReminders(params) {
  localStorage.removeItem('reminders');
}

;