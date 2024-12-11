class helpers {
  // Method to format a Date object to a string
  public formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  // Method to format a date string to a more readable format (Vietnam locale)
  public formatDateToVN(dateString: string): string {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  }

  // Method to format a number to VND currency format
  public formatCurrencyVND(amount: number): string {
    return amount.toLocaleString("vi-VN");
  }

  // Method to format duration from total minutes to days, hours, or minutes
  public formatDuration = (totalMinutes: number) => {
    if (totalMinutes >= 1440) {
      // 1440 minutes = 1 day
      const days = Math.floor(totalMinutes / 1440);
      const remainingHours = Math.floor((totalMinutes % 1440) / 60);
      return `${days}d ${remainingHours}h`;
    } else if (totalMinutes >= 60) {
      // 60 minutes = 1 hour
      const hours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    } else {
      // Less than 60 minutes
      return `${totalMinutes}m`;
    }
  };

  getDayOfWeek = (dateString: string): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayIndex = date.getDay();

    // Return the name of the day
    return daysOfWeek[dayIndex];
  };
}

export default new helpers();
