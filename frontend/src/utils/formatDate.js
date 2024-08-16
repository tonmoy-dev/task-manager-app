export default function formatDate(dateStr) {

    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
    // console.log(formattedDate); // Output: "13 August, 2024"
}

