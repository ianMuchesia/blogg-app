export const formatMongoDate = (mongoDate:string) => {
    const dateObj = new Date(mongoDate);
    return dateObj.toLocaleString(); // Adjust the formatting option as per your requirement
  };
  