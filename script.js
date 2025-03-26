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
  
  function renderHotels() {
    const starValue = starFilter.value;
    const checkinDate = checkinInput.value;
    hotelGrid.innerHTML = "";
  
    const filtered = hotels.filter(hotel => {
      const matchesStar = starValue === "all" || hotel.stars == starValue;
      const matchesDate = !checkinDate || hotel.availableDates.includes(checkinDate);
      return matchesStar && matchesDate;
    });
  
    filtered.forEach(hotel => {
      const card = document.createElement("div");
      card.className = "hotelCard";
      card.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}" />
        <h3>${hotel.name}</h3>
        <p>${"★".repeat(hotel.stars)}</p>
      `;
      hotelGrid.appendChild(card);
    });
  }
  
  // Star filter updates immediately
  starFilter.addEventListener("change", renderHotels);
  
  // Date filter applies only when button is clicked
  applyFilters.addEventListener("click", renderHotels);
  
  // Initial render: show all hotels
  checkinInput.value = "";
  renderHotels();
  