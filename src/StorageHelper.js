
export function setReminders(reminders){
    localStorage.setItem('reminders', JSON.stringify(reminders));
};


export function getReminders(){
    const reminders=localStorage.getItem('reminders');
    return (reminders!=null && reminders!=undefined)? JSON.parse(reminders):[];
};
export function functiondeleteAllReminders(params) {
    localStorage.removeItem('reminders');
};
