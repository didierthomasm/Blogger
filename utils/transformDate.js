const dateFormat = (date) => {
  const dateObj = date;

  const day = String(dateObj.getUTCDate()).padStart(2, '0'); // Get the day and pad it with leading zeros if needed
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Get the month (adding 1 as months are zero-based) and pad it
  const year = dateObj.getUTCFullYear(); // Get the year


   // Create the formatted date string
  return `${day}-${month}-${year}`; // Output: "13-09-2023"
}

module.exports = dateFormat;