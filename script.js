// Mock data array
const hotelsData = [
  {
    id: 1,
    name: "Marriot Downtown",
    roomType: "Single Queen",
    capacity: 2,
    location: "Ottawa",
    price: 120,
    roomsInHotel: 25,
    hotelType: "Hotel",
    hotelChain: "Marriot",
    image: "https://www.ottawabestwestern.com/Content/images/singleQueen_o_new.jpg"
  },
  {
    id: 2,
    name: "Ritz Luxury",
    roomType: "Double Queen",
    capacity: 4,
    location: "London",
    price: 320,
    roomsInHotel: 40,
    hotelType: "Hotel",
    hotelChain: "Ritz",
    image: "https://www.ottawabestwestern.com/Content/images/singleQueen_o_new.jpg"
  },
  {
    id: 3,
    name: "Super8 Budget",
    roomType: "Single King",
    capacity: 2,
    location: "Ottawa",
    price: 80,
    roomsInHotel: 15,
    hotelType: "Motel",
    hotelChain: "Super8",
    image: "https://www.ottawabestwestern.com/Content/images/singleQueen_o_new.jpg"
  },
  {
    id: 4,
    name: "Marriot Cityview",
    roomType: "Suite",
    capacity: 4,
    location: "Ottawa",
    price: 250,
    roomsInHotel: 35,
    hotelType: "Hotel",
    hotelChain: "Marriot",
    image: "https://www.ottawabestwestern.com/Content/images/singleQueen_o_new.jpg"
  },
  {
    id: 5,
    name: "Ritz Deluxe",
    roomType: "Suite",
    capacity: 6,
    location: "London",
    price: 450,
    roomsInHotel: 50,
    hotelType: "Hotel",
    hotelChain: "Ritz",
    image: "https://www.ottawabestwestern.com/Content/images/singleQueen_o_new.jpg"
  },
  {
    id: 6,
    name: "Super8 Cozy",
    roomType: "Single Queen",
    capacity: 2,
    location: "London",
    price: 70,
    roomsInHotel: 8,
    hotelType: "Motel",
    hotelChain: "Super8",
    image: "https://www.ottawabestwestern.com/Content/images/singleQueen_o_new.jpg"
  },
];

// DOM Elements
const hotelGrid = document.getElementById("hotelGrid");
const applyFiltersBtn = document.getElementById("applyFilters");

// Modal elements
const hotelModal = document.getElementById("hotelModal");
const closeModalBtn = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalDates = document.getElementById("modalDates");
const modalCapacity = document.getElementById("modalCapacity");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalRoomsInHotel = document.getElementById("modalRoomsInHotel");
const modalHotelType = document.getElementById("modalHotelType");
const modalHotelChain = document.getElementById("modalHotelChain");
const modalTotalPrice = document.getElementById("modalTotalPrice");

// Filter fields
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const capacity = document.getElementById("capacity");
const locationSelect = document.getElementById("location");
const priceSelect = document.getElementById("price");
const roomsInHotelSelect = document.getElementById("roomsInHotel");
const hotelTypeSelect = document.getElementById("hotelType");
const hotelChainSelect = document.getElementById("hotelChain");

// Renders the hotel cards in the grid
function renderHotels(hotels) {
  hotelGrid.innerHTML = ""; // Clear any existing content

  hotels.forEach((hotel) => {
    const card = document.createElement("div");
    card.className = "hotel-card";
    card.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.name}" />
      <div class="hotel-info">
        <h3>${hotel.name}</h3>
        <p>${hotel.roomType}</p>
        <p>Price: $${hotel.price}</p>
      </div>
    `;

    // On click, open modal
    card.addEventListener("click", () => {
      openModal(hotel);
    });

    hotelGrid.appendChild(card);
  });
}

// Opens the modal and populates it with hotel data
function openModal(hotel) {
  hotelModal.style.display = "block";
  modalImage.src = hotel.image;
  modalDates.textContent = `Dates: ${startDate.value || "N/A"} - ${endDate.value || "N/A"}`;
  modalCapacity.textContent = `Capacity: ${hotel.capacity}`;
  modalLocation.textContent = `Location: ${hotel.location}`;
  modalPrice.textContent = `Price: $${hotel.price}`;
  modalRoomsInHotel.textContent = `Rooms in the Hotel: ${hotel.roomsInHotel}`;
  modalHotelType.textContent = `Hotel Type: ${hotel.hotelType}`;
  modalHotelChain.textContent = `Hotel Chain: ${hotel.hotelChain}`;
  modalTotalPrice.textContent = `$${hotel.price}`;
}

// Close modal event
closeModalBtn.onclick = function() {
  hotelModal.style.display = "none";
};

// Close modal if user clicks anywhere outside the modal content
window.onclick = function(event) {
  if (event.target === hotelModal) {
    hotelModal.style.display = "none";
  }
};

// Filter logic
function applyFilters() {
  let filteredHotels = [...hotelsData];

  // Capacity filter
  const capacityValue = capacity.value;
  if (capacityValue !== "any") {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.capacity.toString() === capacityValue
    );
  }

  // Location filter
  const locationValue = locationSelect.value;
  if (locationValue !== "any") {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.location === locationValue
    );
  }

  // Price filter
  const priceValue = priceSelect.value;
  if (priceValue !== "all") {
    if (priceValue === "300plus") {
      filteredHotels = filteredHotels.filter((hotel) => hotel.price >= 300);
    } else {
      // Convert string to number (e.g. "100" -> 100)
      const priceNum = Number(priceValue);
      filteredHotels = filteredHotels.filter((hotel) => hotel.price < priceNum);
    }
  }

  // Rooms in Hotel filter
  const roomsValue = roomsInHotelSelect.value;
  if (roomsValue !== "all") {
    if (roomsValue === "30plus") {
      filteredHotels = filteredHotels.filter((hotel) => hotel.roomsInHotel >= 30);
    } else {
      const roomsNum = Number(roomsValue);
      filteredHotels = filteredHotels.filter((hotel) => hotel.roomsInHotel < roomsNum);
    }
  }

  // Hotel Type filter
  const hotelTypeValue = hotelTypeSelect.value;
  if (hotelTypeValue !== "all") {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.hotelType === hotelTypeValue
    );
  }

  // Hotel Chain filter
  const hotelChainValue = hotelChainSelect.value;
  if (hotelChainValue !== "all") {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.hotelChain === hotelChainValue
    );
  }

  // Render the filtered hotels
  renderHotels(filteredHotels);
}

// Initial render of all hotels
renderHotels(hotelsData);

// Event listener for applying filters
applyFiltersBtn.addEventListener("click", applyFilters);
