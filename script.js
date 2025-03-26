const hotels = [
    {
      name: "Sunrise Resort",
      stars: 5,
      image: "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
      availableDates: ["2025-04-01", "2025-04-02", "2025-04-03"]
    },
    {
      name: "Budget Inn",
      stars: 3,
      image: "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
      availableDates: ["2025-04-01", "2025-04-04"]
    },
    {
      name: "Cityscape Hotel",
      stars: 4,
      image: "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
      availableDates: ["2025-04-02", "2025-04-03"]
    }
  ];
  
  const hotelGrid = document.getElementById("hotelGrid");
  const starFilter = document.getElementById("starFilter");
  const checkinInput = document.getElementById("checkin");
  const applyFilters = document.getElementById("applyFilters");
  
  function renderHotels(applyDateFilter = false) {
    const starValue = starFilter.value;
    const checkinDate = checkinInput.value;
    hotelGrid.innerHTML = "";
  
    const filtered = hotels.filter(hotel => {
      const matchesStar = starValue === "all" || hotel.stars == starValue;
      const matchesDate = !applyDateFilter || hotel.availableDates.includes(checkinDate);
      return matchesStar && matchesDate;
    });
  
    if (filtered.length === 0) {
      hotelGrid.innerHTML = "<p>No hotels match the selected filters.</p>";
      return;
    }
  
    filtered.forEach(hotel => {
      const card = document.createElement("div");
      card.className = "hotelCard";
      card.innerHTML = `
        <img src="\${hotel.image}" alt="\${hotel.name}" />
        <h3>\${hotel.name}</h3>
        <p>\${"★".repeat(hotel.stars)}</p>
      `;
      hotelGrid.appendChild(card);
    });
  }
  
  // Only filters by star rating immediately
  starFilter.addEventListener("change", () => renderHotels(false));
  
  // Apply date filter only on button click
  applyFilters.addEventListener("click", () => renderHotels(true));
  
  // Initial render: show all hotels (no date filtering)
  checkinInput.value = "";
  renderHotels(false);
  