export function getFormattedDate() {
    const currentDate = new Date().toLocaleDateString("en-CA");
    return currentDate;
}

export function getFormattedTime() {
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours().toString().padStart(2, "0");
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
  
    return `${hours}:${minutes}`;
  }

export function formatStringToDate(string) {    // expected YYYY-MM-DD
    const stringArray = string.split('-')
    return `${stringArray[2]}/${stringArray[1]}/${stringArray[0]}`
}