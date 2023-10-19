function isDateTimeValid(date, time) {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  const scheduledTime = new Date(`${date} ${time}`);

  return (
    date.match(dateTimeRegex) &&
    scheduledTime instanceof Date &&
    scheduledTime > new Date()
  );
}

export { isDateTimeValid };
