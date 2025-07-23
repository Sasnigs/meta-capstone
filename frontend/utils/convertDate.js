export default function convertDate(commentCreatedDate) {
  const prismaDate = new Date(commentCreatedDate);
  const formattedDate = prismaDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = prismaDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    time: formattedTime,
    date: formattedDate,
  };
}