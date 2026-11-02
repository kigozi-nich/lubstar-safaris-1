export type ItineraryDay = { title: string; text: string };

export type Tour = {
  slug: string;
  name: string;
  destination: string;
  type: "Primates" | "Big Game" | "Scenery";
  days: number;
  offer?: { label: string; percent: number };
  departures: string[];
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  image: string;
  imageAlt: string;
};

export type Destination = {
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

// Sample departure schedule: one departure per listed month on the given day.
const schedule = (day: number, months: number[]) =>
  months.map((m) => `2027-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`);

const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
].map((label, i) => ({ value: `2027-${String(i + 1).padStart(2, "0")}`, label: `${label} 2027` }));

export const destinations: Destination[] = [
  {
    name: "Bwindi Impenetrable",
    blurb: "Home of the mountain gorillas.",
    image: "/images/gorilla.jpg",
    imageAlt: "Mountain gorilla in Bwindi, Uganda",
  },
  {
    name: "Kibale",
    blurb: "The primate capital of the world.",
    image: "/images/chimp.jpg",
    imageAlt: "Chimpanzee in Kibale Forest, Uganda",
  },
  {
    name: "Queen Elizabeth",
    blurb: "Tree-climbing lions and crater lakes.",
    image: "/images/lion.jpg",
    imageAlt: "Tree-climbing lions in Queen Elizabeth National Park",
  },
  {
    name: "Murchison Falls",
    blurb: "The Nile at full force, plus big game.",
    image: "/images/falls.jpg",
    imageAlt: "Murchison Falls on the Nile, Uganda",
  },
];

export const tours: Tour[] = [
  {
    slug: "bwindi-gorilla-trek",
    name: "Bwindi Gorilla Trek",
    destination: "Bwindi Impenetrable",
    type: "Primates",
    days: 3,
    departures: schedule(5, ALL),
    summary: "Trek through ancient rainforest to spend an hour with mountain gorillas.",
    highlights: ["Gorilla trekking permit", "Expert ranger guides", "Forest lodge stay"],
    itinerary: [
      { title: "Arrival and transfer", text: "Meet your guide and travel to Bwindi, with scenic stops en route." },
      { title: "Gorilla trekking", text: "Trek with rangers and spend one magical hour with a gorilla family." },
      { title: "Return journey", text: "Relax over breakfast, then transfer back with lasting memories." },
    ],
    image: "/images/gorilla.jpg",
    imageAlt: "Mountain gorilla in Bwindi Impenetrable National Park, Uganda",
  },
  {
    slug: "kibale-chimpanzee-tracking",
    name: "Kibale Chimpanzee Tracking",
    destination: "Kibale",
    type: "Primates",
    days: 2,
    offer: { label: "Early booking", percent: 10 },
    departures: schedule(12, ALL),
    summary: "Follow habituated chimpanzees through the forests of Kibale.",
    highlights: ["Chimpanzee tracking permit", "Bigodi Wetland walk", "Birdwatching"],
    itinerary: [
      { title: "Travel to Kibale", text: "Transfer to the forest and enjoy an afternoon nature walk." },
      { title: "Chimpanzee tracking", text: "Track chimpanzees with a ranger, then return." },
    ],
    image: "/images/chimp.jpg",
    imageAlt: "Chimpanzee in Kibale Forest National Park, Uganda",
  },
  {
    slug: "queen-elizabeth-tree-climbing-lions",
    name: "Queen Elizabeth Lion Safari",
    destination: "Queen Elizabeth",
    type: "Big Game",
    days: 3,
    departures: schedule(18, [1, 2, 6, 7, 8, 9, 12]),
    summary: "Game drives in Ishasha, home of the famous tree-climbing lions.",
    highlights: ["Ishasha game drives", "Kazinga Channel boat cruise", "Hippos and elephants"],
    itinerary: [
      { title: "Drive to Queen Elizabeth", text: "Evening game drive across the Kasenyi plains." },
      { title: "Kazinga cruise and Ishasha", text: "Boat cruise, then search for tree-climbing lions." },
      { title: "Morning drive and return", text: "A final sunrise game drive before heading home." },
    ],
    image: "/images/lion.jpg",
    imageAlt: "Tree-climbing lions in Queen Elizabeth National Park, Uganda",
  },
  {
    slug: "murchison-falls-safari",
    name: "Murchison Falls Safari",
    destination: "Murchison Falls",
    type: "Scenery",
    days: 4,
    departures: schedule(8, [1, 2, 3, 6, 7, 8, 9, 10, 12]),
    summary: "See the Nile thunder through a narrow gorge, with game drives and a boat cruise.",
    highlights: ["Boat trip to the falls", "Northern bank game drives", "Hike to the top of the falls"],
    itinerary: [
      { title: "Journey north", text: "Travel to Murchison, with a stop at the Ziwa Rhino Sanctuary." },
      { title: "Game drive", text: "Morning drive among elephants, buffalo and antelope." },
      { title: "Nile boat cruise", text: "Cruise to the base of the falls and hike to the top." },
      { title: "Return", text: "Breakfast, then transfer back." },
    ],
    image: "/images/falls.jpg",
    imageAlt: "Murchison Falls on the Nile, Uganda",
  },
  {
    slug: "giraffe-game-drive",
    name: "Rothschild Giraffe Game Drive",
    destination: "Murchison Falls",
    type: "Big Game",
    days: 2,
    offer: { label: "Weekend special", percent: 15 },
    departures: schedule(22, [1, 2, 3, 6, 7, 8, 9, 10, 12]),
    summary: "Meet the endangered Rothschild's giraffe on the northern savanna.",
    highlights: ["Giraffe viewing", "Savanna game drive", "Photography stops"],
    itinerary: [
      { title: "Travel and afternoon drive", text: "Head to the park and begin your first game drive." },
      { title: "Sunrise drive", text: "Search for giraffes in the golden morning light, then return." },
    ],
    image: "/images/giraffe.jpg",
    imageAlt: "Rothschild's giraffe in Murchison Falls National Park, Uganda",
  },
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
