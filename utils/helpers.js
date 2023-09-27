module.exports = {
  dateFormat: (date) => {
    const dateObj = date; // Convert the input string to a Date object

    const day = String(dateObj.getUTCDate()).padStart(2, '0'); // Get the day and pad it with leading zeros if needed
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Get the month (adding 1 as months are zero-based) and pad it
    const year = dateObj.getUTCFullYear(); // Get the year
    // Create the formatted date string
    return `${day}-${month}-${year}`;
  },
  isOwner: async (id) => {
    const owner = id;
    const loggedIn = await fetch('/api/users/user-logged', {
      method: 'GET'
    });
    return owner === loggedIn;
  },
  isEqual: (commentOwnerId, userLoggedInId, postOwnerId, commentId, options) => {
    if (commentOwnerId === userLoggedInId || postOwnerId === userLoggedInId) {
      return options.fn({id: commentId});
    }
    return options.inverse(this);
  },
  if_less_than: function (index, compare, options)  {
    if (index < compare) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
}