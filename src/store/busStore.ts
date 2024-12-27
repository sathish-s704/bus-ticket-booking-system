import { create } from 'zustand';
import { Bus } from '../types';
import { TamilNaduCity } from '../data/cities';

interface BusSearchState {
  searchResults: Bus[];
  isLoading: boolean;
  error: string | null;
  searchBuses: (from: TamilNaduCity, to: TamilNaduCity, date: string) => Promise<void>;
}

// Expanded mock data with more Tamil Nadu routes
const mockBuses: Bus[] = [
  {
      "id": "1",
      "name": "KPN Travels",
      "from": "Chennai",
      "to": "Coimbatore",
      "departureTime": "22:20",
      "arrivalTime": "10:20",
      "price": 1098,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "2",
      "name": "Parveen Travels",
      "from": "Chennai",
      "to": "Madurai",
      "departureTime": "16:10",
      "arrivalTime": "04:10",
      "price": 536,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "3",
      "name": "SRS Travels",
      "from": "Chennai",
      "to": "Erode",
      "departureTime": "20:25",
      "arrivalTime": "05:25",
      "price": 1371,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "4",
      "name": "SRM Travels",
      "from": "Chennai",
      "to": "Salem",
      "departureTime": "05:25",
      "arrivalTime": "11:25",
      "price": 860,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "5",
      "name": "Orange Travels",
      "from": "Chennai",
      "to": "Tiruchirappalli",
      "departureTime": "10:43",
      "arrivalTime": "14:43",
      "price": 1212,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "6",
      "name": "Kallada Travels",
      "from": "Chennai",
      "to": "Tirunelveli",
      "departureTime": "12:43",
      "arrivalTime": "16:43",
      "price": 1342,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "7",
      "name": "Jeppiaar Travels",
      "from": "Chennai",
      "to": "Hosur",
      "departureTime": "11:45",
      "arrivalTime": "23:45",
      "price": 1280,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "8",
      "name": "Neeta Travels",
      "from": "Chennai",
      "to": "Kumbakonam",
      "departureTime": "13:01",
      "arrivalTime": "20:01",
      "price": 867,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "9",
      "name": "Jabbar Travels",
      "from": "Chennai",
      "to": "Thoothukudi",
      "departureTime": "06:55",
      "arrivalTime": "16:55",
      "price": 1359,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "10",
      "name": "VRL Travels",
      "from": "Chennai",
      "to": "Ooty",
      "departureTime": "12:56",
      "arrivalTime": "21:56",
      "price": 1105,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "11",
      "name": "AbhiBus",
      "from": "Madurai",
      "to": "Coimbatore",
      "departureTime": "16:13",
      "arrivalTime": "04:13",
      "price": 1345,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "12",
      "name": "Universal Travels",
      "from": "Madurai",
      "to": "Chennai",
      "departureTime": "13:07",
      "arrivalTime": "23:07",
      "price": 590,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "13",
      "name": "Rathimeena Travels",
      "from": "Madurai",
      "to": "Nagercoil",
      "departureTime": "06:49",
      "arrivalTime": "14:49",
      "price": 658,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "14",
      "name": "KPN Travels",
      "from": "Madurai",
      "to": "Salem",
      "departureTime": "08:04",
      "arrivalTime": "16:04",
      "price": 1148,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "15",
      "name": "Kavi Bharathi Travels",
      "from": "Madurai",
      "to": "Ooty",
      "departureTime": "21:50",
      "arrivalTime": "08:50",
      "price": 660,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "16",
      "name": "City Travels",
      "from": "Erode",
      "to": "Madurai",
      "departureTime": "19:37",
      "arrivalTime": "02:37",
      "price": 1333,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "17",
      "name": "Royal Travels",
      "from": "Erode",
      "to": "Chennai",
      "departureTime": "21:49",
      "arrivalTime": "07:49",
      "price": 700,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "18",
      "name": "Sharma Transport",
      "from": "Erode",
      "to": "Kanchipuram",
      "departureTime": "11:00",
      "arrivalTime": "15:00",
      "price": 743,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "19",
      "name": "ARC Travels",
      "from": "Erode",
      "to": "Kumbakonam",
      "departureTime": "20:38",
      "arrivalTime": "00:38",
      "price": 700,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "20",
      "name": "Madurai Radha Travels",
      "from": "Erode",
      "to": "Thoothukudi",
      "departureTime": "05:14",
      "arrivalTime": "09:14",
      "price": 1353,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "21",
      "name": "RKK Travels",
      "from": "Coimbatore",
      "to": "Chennai",
      "departureTime": "16:04",
      "arrivalTime": "00:04",
      "price": 965,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "22",
      "name": "Vaigai Travels",
      "from": "Coimbatore",
      "to": "Madurai",
      "departureTime": "11:05",
      "arrivalTime": "22:05",
      "price": 545,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "23",
      "name": "PSK Travels",
      "from": "Coimbatore",
      "to": "Thanjavur",
      "departureTime": "07:40",
      "arrivalTime": "18:40",
      "price": 1327,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "24",
      "name": "AVK Travels",
      "from": "Coimbatore",
      "to": "Nagercoil",
      "departureTime": "10:26",
      "arrivalTime": "15:26",
      "price": 1085,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "25",
      "name": "Vivegam Travels",
      "from": "Coimbatore",
      "to": "Hosur",
      "departureTime": "16:42",
      "arrivalTime": "00:42",
      "price": 1447,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "26",
      "name": "Kumaran Travels",
      "from": "Salem",
      "to": "Sivakasi",
      "departureTime": "19:00",
      "arrivalTime": "03:00",
      "price": 1386,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "27",
      "name": "Thunaivan Travels",
      "from": "Salem",
      "to": "Chennai",
      "departureTime": "16:32",
      "arrivalTime": "04:32",
      "price": 1132,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "28",
      "name": "Janatha Travels",
      "from": "Salem",
      "to": "Dindigul",
      "departureTime": "18:46",
      "arrivalTime": "04:46",
      "price": 1032,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "29",
      "name": "Jayalakshmi Travels",
      "from": "Salem",
      "to": "Madurai",
      "departureTime": "20:00",
      "arrivalTime": "08:00",
      "price": 621,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "30",
      "name": "Subramaniam Travels",
      "from": "Salem",
      "to": "Tirunelveli",
      "departureTime": "15:12",
      "arrivalTime": "20:12",
      "price": 619,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "31",
      "name": "GMS Travels",
      "from": "Hosur",
      "to": "Coimbatore",
      "departureTime": "08:01",
      "arrivalTime": "20:01",
      "price": 985,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "32",
      "name": "A1 Travels",
      "from": "Hosur",
      "to": "Chennai",
      "departureTime": "05:56",
      "arrivalTime": "11:56",
      "price": 869,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "33",
      "name": "Jayam Travels",
      "from": "Hosur",
      "to": "Madurai",
      "departureTime": "15:04",
      "arrivalTime": "23:04",
      "price": 1189,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "34",
      "name": "Chendur Murugan Travels",
      "from": "Hosur",
      "to": "Tiruchirappalli",
      "departureTime": "10:40",
      "arrivalTime": "18:40",
      "price": 708,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "35",
      "name": "National Travels",
      "from": "Hosur",
      "to": "Kumbakonam",
      "departureTime": "16:28",
      "arrivalTime": "03:28",
      "price": 720,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "36",
      "name": "Patel Travels",
      "from": "Tirunelveli",
      "to": "Coimbatore",
      "departureTime": "13:28",
      "arrivalTime": "00:28",
      "price": 728,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "37",
      "name": "Jayam Travels",
      "from": "Tirunelveli",
      "to": "Chennai",
      "departureTime": "20:45",
      "arrivalTime": "02:45",
      "price": 958,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "38",
      "name": "Jayalakshmi Travels",
      "from": "Tirunelveli",
      "to": "Thanjavur",
      "departureTime": "19:53",
      "arrivalTime": "23:53",
      "price": 1296,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "39",
      "name": "Thangam Travels",
      "from": "Tirunelveli",
      "to": "Tiruppur",
      "departureTime": "17:27",
      "arrivalTime": "23:27",
      "price": 1456,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "40",
      "name": "Air India Express",
      "from": "Tirunelveli",
      "to": "Madurai",
      "departureTime": "19:22",
      "arrivalTime": "23:22",
      "price": 578,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "41",
      "name": "Vaagai Travels",
      "from": "Tiruppur",
      "to": "Chennai",
      "departureTime": "22:04",
      "arrivalTime": "07:04",
      "price": 1164,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "42",
      "name": "ANR Travels",
      "from": "Tiruppur",
      "to": "Madurai",
      "departureTime": "06:38",
      "arrivalTime": "15:38",
      "price": 1392,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "43",
      "name": "Akash Travels",
      "from": "Tiruppur",
      "to": "Thoothukudi",
      "departureTime": "20:06",
      "arrivalTime": "00:06",
      "price": 1440,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "44",
      "name": "Sunline Travels",
      "from": "Tiruppur",
      "to": "Nagercoil",
      "departureTime": "07:36",
      "arrivalTime": "17:36",
      "price": 858,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "45",
      "name": "YBM Travels",
      "from": "Tiruppur",
      "to": "Kumbakonam",
      "departureTime": "22:44",
      "arrivalTime": "05:44",
      "price": 967,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "46",
      "name": "Universal Travels",
      "from": "Ooty",
      "to": "Chennai",
      "departureTime": "10:16",
      "arrivalTime": "21:16",
      "price": 1085,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "47",
      "name": "SEB Transports",
      "from": "Ooty",
      "to": "Madurai",
      "departureTime": "12:26",
      "arrivalTime": "21:26",
      "price": 1300,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "48",
      "name": "Manish Travels",
      "from": "Ooty",
      "to": "Tiruchirappalli",
      "departureTime": "12:53",
      "arrivalTime": "00:53",
      "price": 1251,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "49",
      "name": "Fathima Travels",
      "from": "Ooty",
      "to": "Hosur",
      "departureTime": "05:25",
      "arrivalTime": "14:25",
      "price": 612,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "50",
      "name": "Madurai Travels",
      "from": "Ooty",
      "to": "Dindigul",
      "departureTime": "22:55",
      "arrivalTime": "10:55",
      "price": 731,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "51",
      "name": "Sri Amarnath Travels",
      "from": "Chennai",
      "to": "Coimbatore",
      "departureTime": "19:39",
      "arrivalTime": "23:39",
      "price": 709,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "52",
      "name": "Ramana Travels",
      "from": "Chennai",
      "to": "Madurai",
      "departureTime": "22:53",
      "arrivalTime": "03:53",
      "price": 958,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "53",
      "name": "Vetri Travels",
      "from": "Chennai",
      "to": "Erode",
      "departureTime": "17:42",
      "arrivalTime": "22:42",
      "price": 721,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "54",
      "name": "Star Travels",
      "from": "Chennai",
      "to": "Salem",
      "departureTime": "20:02",
      "arrivalTime": "08:02",
      "price": 730,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "55",
      "name": "Sri Ganapathy Travels",
      "from": "Chennai",
      "to": "Tiruchirappalli",
      "departureTime": "11:23",
      "arrivalTime": "18:23",
      "price": 534,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "56",
      "name": "Meena Travels",
      "from": "Chennai",
      "to": "Tirunelveli",
      "departureTime": "16:51",
      "arrivalTime": "04:51",
      "price": 827,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "57",
      "name": "Viji Yathraa Travels",
      "from": "Chennai",
      "to": "Hosur",
      "departureTime": "12:53",
      "arrivalTime": "18:53",
      "price": 658,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "58",
      "name": "Surya Travels",
      "from": "Chennai",
      "to": "Kumbakonam",
      "departureTime": "13:24",
      "arrivalTime": "18:24",
      "price": 604,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "59",
      "name": "Benzy Tours and Travels",
      "from": "Chennai",
      "to": "Thoothukudi",
      "departureTime": "16:14",
      "arrivalTime": "03:14",
      "price": 1375,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "60",
      "name": "Kumari Travels",
      "from": "Chennai",
      "to": "Ooty",
      "departureTime": "16:32",
      "arrivalTime": "03:32",
      "price": 1164,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "61",
      "name": "Ajith Travels",
      "from": "Madurai",
      "to": "Coimbatore",
      "departureTime": "17:20",
      "arrivalTime": "02:20",
      "price": 1395,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "62",
      "name": "Good Will Travels",
      "from": "Madurai",
      "to": "Chennai",
      "departureTime": "15:35",
      "arrivalTime": "02:35",
      "price": 642,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "63",
      "name": "Dhanam Travels",
      "from": "Madurai",
      "to": "Nagercoil",
      "departureTime": "15:43",
      "arrivalTime": "00:43",
      "price": 1292,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "64",
      "name": "Thirumal Travels",
      "from": "Madurai",
      "to": "Salem",
      "departureTime": "18:07",
      "arrivalTime": "00:07",
      "price": 1068,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "65",
      "name": "Atlas Travels",
      "from": "Madurai",
      "to": "Ooty",
      "departureTime": "10:05",
      "arrivalTime": "14:05",
      "price": 843,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "66",
      "name": "Ajanta Travels",
      "from": "Erode",
      "to": "Madurai",
      "departureTime": "15:57",
      "arrivalTime": "01:57",
      "price": 946,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "67",
      "name": "RCI Travels",
      "from": "Erode",
      "to": "Chennai",
      "departureTime": "12:44",
      "arrivalTime": "19:44",
      "price": 660,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "68",
      "name": "VRT Travels",
      "from": "Erode",
      "to": "Kanchipuram",
      "departureTime": "21:24",
      "arrivalTime": "05:24",
      "price": 1445,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "69",
      "name": "Karthi Travels",
      "from": "Erode",
      "to": "Kumbakonam",
      "departureTime": "22:30",
      "arrivalTime": "08:30",
      "price": 1343,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "70",
      "name": "Varshini Travels",
      "from": "Erode",
      "to": "Thoothukudi",
      "departureTime": "08:21",
      "arrivalTime": "13:21",
      "price": 811,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "71",
      "name": "VBS Travels",
      "from": "Coimbatore",
      "to": "Chennai",
      "departureTime": "08:55",
      "arrivalTime": "15:55",
      "price": 619,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "72",
      "name": "Padmesh Travels",
      "from": "Coimbatore",
      "to": "Madurai",
      "departureTime": "08:38",
      "arrivalTime": "18:38",
      "price": 949,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "73",
      "name": "Asian Express Travels",
      "from": "Coimbatore",
      "to": "Thanjavur",
      "departureTime": "11:57",
      "arrivalTime": "16:57",
      "price": 1066,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "74",
      "name": "Mohan Travels",
      "from": "Coimbatore",
      "to": "Nagercoil",
      "departureTime": "13:02",
      "arrivalTime": "19:02",
      "price": 1403,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "75",
      "name": "JP Tours and Travels",
      "from": "Coimbatore",
      "to": "Hosur",
      "departureTime": "08:55",
      "arrivalTime": "18:55",
      "price": 1100,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "76",
      "name": "Akbar Travels",
      "from": "Salem",
      "to": "Sivakasi",
      "departureTime": "19:21",
      "arrivalTime": "03:21",
      "price": 1102,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "77",
      "name": "STS Travels",
      "from": "Salem",
      "to": "Chennai",
      "departureTime": "22:07",
      "arrivalTime": "10:07",
      "price": 1279,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "78",
      "name": "Essaar Travels",
      "from": "Salem",
      "to": "Dindigul",
      "departureTime": "17:52",
      "arrivalTime": "01:52",
      "price": 928,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "79",
      "name": "Bharathi Travels",
      "from": "Salem",
      "to": "Madurai",
      "departureTime": "14:00",
      "arrivalTime": "23:00",
      "price": 1348,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "80",
      "name": "Prince Travels",
      "from": "Salem",
      "to": "Tirunelveli",
      "departureTime": "18:55",
      "arrivalTime": "03:55",
      "price": 1141,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "81",
      "name": "SHN Travels",
      "from": "Hosur",
      "to": "Coimbatore",
      "departureTime": "21:24",
      "arrivalTime": "03:24",
      "price": 829,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "82",
      "name": "SST Travels",
      "from": "Hosur",
      "to": "Chennai",
      "departureTime": "16:52",
      "arrivalTime": "01:52",
      "price": 1180,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "83",
      "name": "SBLT Travels",
      "from": "Hosur",
      "to": "Madurai",
      "departureTime": "10:55",
      "arrivalTime": "17:55",
      "price": 1275,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "84",
      "name": "Mettur Super Services",
      "from": "Hosur",
      "to": "Tiruchirappalli",
      "departureTime": "08:16",
      "arrivalTime": "14:16",
      "price": 576,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "85",
      "name": "CPT Travels",
      "from": "Hosur",
      "to": "Kumbakonam",
      "departureTime": "22:15",
      "arrivalTime": "10:15",
      "price": 1499,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "86",
      "name": "Eternal Travels",
      "from": "Tirunelveli",
      "to": "Coimbatore",
      "departureTime": "21:54",
      "arrivalTime": "03:54",
      "price": 1096,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "87",
      "name": "Neyyar Travels",
      "from": "Tirunelveli",
      "to": "Chennai",
      "departureTime": "16:29",
      "arrivalTime": "23:29",
      "price": 595,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "88",
      "name": "Sai Balamurugan Travels",
      "from": "Tirunelveli",
      "to": "Thanjavur",
      "departureTime": "18:01",
      "arrivalTime": "23:01",
      "price": 712,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "89",
      "name": "A.S.K. Travels",
      "from": "Tirunelveli",
      "to": "Tiruppur",
      "departureTime": "21:38",
      "arrivalTime": "01:38",
      "price": 531,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "90",
      "name": "Mahasagar Travels",
      "from": "Tirunelveli",
      "to": "Madurai",
      "departureTime": "06:06",
      "arrivalTime": "12:06",
      "price": 1397,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "91",
      "name": "Surya Connect Travels",
      "from": "Tiruppur",
      "to": "Chennai",
      "departureTime": "16:04",
      "arrivalTime": "21:04",
      "price": 1273,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "92",
      "name": "JMS Travels",
      "from": "Tiruppur",
      "to": "Madurai",
      "departureTime": "07:55",
      "arrivalTime": "15:55",
      "price": 1363,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "93",
      "name": "Thunaivan Travels",
      "from": "Tiruppur",
      "to": "Thoothukudi",
      "departureTime": "05:50",
      "arrivalTime": "10:50",
      "price": 1490,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "94",
      "name": "SEABIRD Tourists",
      "from": "Tiruppur",
      "to": "Nagercoil",
      "departureTime": "19:09",
      "arrivalTime": "23:09",
      "price": 1467,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "95",
      "name": "SRS Travels",
      "from": "Tiruppur",
      "to": "Kumbakonam",
      "departureTime": "05:49",
      "arrivalTime": "14:49",
      "price": 1249,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "96",
      "name": "Sugama Tourists",
      "from": "Ooty",
      "to": "Chennai",
      "departureTime": "16:49",
      "arrivalTime": "02:49",
      "price": 736,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "97",
      "name": "Praveen Travels",
      "from": "Ooty",
      "to": "Madurai",
      "departureTime": "13:37",
      "arrivalTime": "00:37",
      "price": 1472,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "98",
      "name": "Udaya Travels",
      "from": "Ooty",
      "to": "Tiruchirappalli",
      "departureTime": "17:54",
      "arrivalTime": "01:54",
      "price": 971,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "99",
      "name": "Balakrishna Travels",
      "from": "Ooty",
      "to": "Hosur",
      "departureTime": "22:17",
      "arrivalTime": "08:17",
      "price": 1344,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "100",
      "name": "Srinivasa Travels",
      "from": "Ooty",
      "to": "Dindigul",
      "departureTime": "16:31",
      "arrivalTime": "21:31",
      "price": 1297,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "101",
      "name": "Parvati Travels",
      "from": "Chennai",
      "to": "Coimbatore",
      "departureTime": "18:53",
      "arrivalTime": "22:53",
      "price": 724,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "102",
      "name": "Mahaveer Travels",
      "from": "Chennai",
      "to": "Madurai",
      "departureTime": "19:50",
      "arrivalTime": "03:50",
      "price": 875,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "103",
      "name": "PTS Travels",
      "from": "Chennai",
      "to": "Erode",
      "departureTime": "13:00",
      "arrivalTime": "21:00",
      "price": 633,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "104",
      "name": "Dev Travels",
      "from": "Chennai",
      "to": "Salem",
      "departureTime": "21:17",
      "arrivalTime": "09:17",
      "price": 632,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "105",
      "name": "Dolphin Travel",
      "from": "Chennai",
      "to": "Tiruchirappalli",
      "departureTime": "15:10",
      "arrivalTime": "21:10",
      "price": 866,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "106",
      "name": "Shrinath Travel Agency",
      "from": "Chennai",
      "to": "Tirunelveli",
      "departureTime": "09:36",
      "arrivalTime": "15:36",
      "price": 1272,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "107",
      "name": "Geeta Travels",
      "from": "Chennai",
      "to": "Hosur",
      "departureTime": "09:11",
      "arrivalTime": "18:11",
      "price": 584,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "108",
      "name": "Hans Travels",
      "from": "Chennai",
      "to": "Kumbakonam",
      "departureTime": "05:07",
      "arrivalTime": "12:07",
      "price": 859,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "109",
      "name": "Sharma Travels",
      "from": "Chennai",
      "to": "Thoothukudi",
      "departureTime": "15:10",
      "arrivalTime": "02:10",
      "price": 1001,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "110",
      "name": "Manish Travels",
      "from": "Chennai",
      "to": "Ooty",
      "departureTime": "17:51",
      "arrivalTime": "22:51",
      "price": 708,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "111",
      "name": "Raj Ratan Travels",
      "from": "Madurai",
      "to": "Coimbatore",
      "departureTime": "19:38",
      "arrivalTime": "01:38",
      "price": 857,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "112",
      "name": "Suhail Khan Travels",
      "from": "Madurai",
      "to": "Chennai",
      "departureTime": "09:52",
      "arrivalTime": "19:52",
      "price": 1475,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "113",
      "name": "Deepak Travels",
      "from": "Madurai",
      "to": "Nagercoil",
      "departureTime": "22:19",
      "arrivalTime": "02:19",
      "price": 689,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "114",
      "name": "Global Travels",
      "from": "Madurai",
      "to": "Salem",
      "departureTime": "09:00",
      "arrivalTime": "20:00",
      "price": 1092,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "115",
      "name": "Ashwini Travels",
      "from": "Madurai",
      "to": "Ooty",
      "departureTime": "11:08",
      "arrivalTime": "18:08",
      "price": 1254,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "116",
      "name": "Guna Travels",
      "from": "Erode",
      "to": "Madurai",
      "departureTime": "15:55",
      "arrivalTime": "22:55",
      "price": 874,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "117",
      "name": "Mahalaxmi Travels",
      "from": "Erode",
      "to": "Chennai",
      "departureTime": "15:08",
      "arrivalTime": "20:08",
      "price": 580,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "118",
      "name": "Supreme Travels",
      "from": "Erode",
      "to": "Kanchipuram",
      "departureTime": "09:49",
      "arrivalTime": "13:49",
      "price": 1476,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "119",
      "name": "Sharma Transports",
      "from": "Erode",
      "to": "Kumbakonam",
      "departureTime": "09:03",
      "arrivalTime": "21:03",
      "price": 1191,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "120",
      "name": "Rohit Travels",
      "from": "Erode",
      "to": "Thoothukudi",
      "departureTime": "08:00",
      "arrivalTime": "18:00",
      "price": 1442,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "121",
      "name": "National Travels",
      "from": "Coimbatore",
      "to": "Chennai",
      "departureTime": "12:45",
      "arrivalTime": "23:45",
      "price": 1087,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "122",
      "name": "Patel Travels",
      "from": "Coimbatore",
      "to": "Madurai",
      "departureTime": "20:45",
      "arrivalTime": "00:45",
      "price": 1294,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "123",
      "name": "Jayam Travels",
      "from": "Coimbatore",
      "to": "Thanjavur",
      "departureTime": "15:23",
      "arrivalTime": "20:23",
      "price": 967,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "124",
      "name": "Jayalakshmi Travels",
      "from": "Coimbatore",
      "to": "Nagercoil",
      "departureTime": "22:36",
      "arrivalTime": "06:36",
      "price": 1226,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "125",
      "name": "Thangam Travels",
      "from": "Coimbatore",
      "to": "Hosur",
      "departureTime": "13:39",
      "arrivalTime": "01:39",
      "price": 973,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "126",
      "name": "Air India Express",
      "from": "Salem",
      "to": "Sivakasi",
      "departureTime": "21:03",
      "arrivalTime": "07:03",
      "price": 823,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "127",
      "name": "Vaagai Travels",
      "from": "Salem",
      "to": "Chennai",
      "departureTime": "07:13",
      "arrivalTime": "17:13",
      "price": 882,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "128",
      "name": "ANR Travels",
      "from": "Salem",
      "to": "Dindigul",
      "departureTime": "21:37",
      "arrivalTime": "04:37",
      "price": 1229,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "129",
      "name": "Akash Travels",
      "from": "Salem",
      "to": "Madurai",
      "departureTime": "18:52",
      "arrivalTime": "05:52",
      "price": 1284,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "130",
      "name": "Sunline Travels",
      "from": "Salem",
      "to": "Tirunelveli",
      "departureTime": "21:07",
      "arrivalTime": "01:07",
      "price": 1483,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "131",
      "name": "YBM Travels",
      "from": "Hosur",
      "to": "Coimbatore",
      "departureTime": "13:47",
      "arrivalTime": "21:47",
      "price": 1227,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "132",
      "name": "Universal Travels",
      "from": "Hosur",
      "to": "Chennai",
      "departureTime": "20:43",
      "arrivalTime": "06:43",
      "price": 1211,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "133",
      "name": "SEB Transports",
      "from": "Hosur",
      "to": "Madurai",
      "departureTime": "13:35",
      "arrivalTime": "23:35",
      "price": 964,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "134",
      "name": "Manish Travels",
      "from": "Hosur",
      "to": "Tiruchirappalli",
      "departureTime": "14:33",
      "arrivalTime": "01:33",
      "price": 892,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "135",
      "name": "Fathima Travels",
      "from": "Hosur",
      "to": "Kumbakonam",
      "departureTime": "14:40",
      "arrivalTime": "02:40",
      "price": 1323,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "136",
      "name": "Madurai Travels",
      "from": "Tirunelveli",
      "to": "Coimbatore",
      "departureTime": "06:16",
      "arrivalTime": "18:16",
      "price": 787,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "137",
      "name": "Sri Amarnath Travels",
      "from": "Tirunelveli",
      "to": "Chennai",
      "departureTime": "08:46",
      "arrivalTime": "19:46",
      "price": 900,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "138",
      "name": "Ramana Travels",
      "from": "Tirunelveli",
      "to": "Thanjavur",
      "departureTime": "05:35",
      "arrivalTime": "14:35",
      "price": 1028,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "139",
      "name": "Vetri Travels",
      "from": "Tirunelveli",
      "to": "Tiruppur",
      "departureTime": "14:14",
      "arrivalTime": "21:14",
      "price": 1460,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "140",
      "name": "Star Travels",
      "from": "Tirunelveli",
      "to": "Madurai",
      "departureTime": "12:13",
      "arrivalTime": "20:13",
      "price": 1326,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "141",
      "name": "Sri Ganapathy Travels",
      "from": "Tiruppur",
      "to": "Chennai",
      "departureTime": "10:45",
      "arrivalTime": "14:45",
      "price": 912,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "142",
      "name": "Meena Travels",
      "from": "Tiruppur",
      "to": "Madurai",
      "departureTime": "20:13",
      "arrivalTime": "08:13",
      "price": 1259,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "143",
      "name": "Viji Yathraa Travels",
      "from": "Tiruppur",
      "to": "Thoothukudi",
      "departureTime": "15:02",
      "arrivalTime": "02:02",
      "price": 1220,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "144",
      "name": "Surya Travels",
      "from": "Tiruppur",
      "to": "Nagercoil",
      "departureTime": "22:21",
      "arrivalTime": "04:21",
      "price": 556,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "145",
      "name": "Benzy Tours and Travels",
      "from": "Tiruppur",
      "to": "Kumbakonam",
      "departureTime": "11:16",
      "arrivalTime": "20:16",
      "price": 1451,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "146",
      "name": "Kumari Travels",
      "from": "Ooty",
      "to": "Chennai",
      "departureTime": "15:08",
      "arrivalTime": "19:08",
      "price": 515,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "147",
      "name": "Ajith Travels",
      "from": "Ooty",
      "to": "Madurai",
      "departureTime": "13:31",
      "arrivalTime": "23:31",
      "price": 1040,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "148",
      "name": "Good Will Travels",
      "from": "Ooty",
      "to": "Tiruchirappalli",
      "departureTime": "17:38",
      "arrivalTime": "03:38",
      "price": 1204,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "149",
      "name": "Dhanam Travels",
      "from": "Ooty",
      "to": "Hosur",
      "departureTime": "14:05",
      "arrivalTime": "18:05",
      "price": 1118,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "150",
      "name": "Thirumal Travels",
      "from": "Ooty",
      "to": "Dindigul",
      "departureTime": "20:18",
      "arrivalTime": "05:18",
      "price": 1353,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "151",
      "name": "Atlas Travels",
      "from": "Chennai",
      "to": "Coimbatore",
      "departureTime": "16:37",
      "arrivalTime": "23:37",
      "price": 1158,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "152",
      "name": "Ajanta Travels",
      "from": "Chennai",
      "to": "Madurai",
      "departureTime": "14:19",
      "arrivalTime": "19:19",
      "price": 1359,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "153",
      "name": "RCI Travels",
      "from": "Chennai",
      "to": "Erode",
      "departureTime": "07:13",
      "arrivalTime": "12:13",
      "price": 1149,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "154",
      "name": "VRT Travels",
      "from": "Chennai",
      "to": "Salem",
      "departureTime": "13:37",
      "arrivalTime": "20:37",
      "price": 746,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "155",
      "name": "Karthi Travels",
      "from": "Chennai",
      "to": "Tiruchirappalli",
      "departureTime": "06:46",
      "arrivalTime": "12:46",
      "price": 601,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "156",
      "name": "Varshini Travels",
      "from": "Chennai",
      "to": "Tirunelveli",
      "departureTime": "09:55",
      "arrivalTime": "19:55",
      "price": 1462,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "157",
      "name": "VBS Travels",
      "from": "Chennai",
      "to": "Hosur",
      "departureTime": "06:16",
      "arrivalTime": "13:16",
      "price": 1199,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "158",
      "name": "Padmesh Travels",
      "from": "Chennai",
      "to": "Kumbakonam",
      "departureTime": "14:00",
      "arrivalTime": "20:00",
      "price": 1389,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "159",
      "name": "Asian Express Travels",
      "from": "Chennai",
      "to": "Thoothukudi",
      "departureTime": "08:51",
      "arrivalTime": "18:51",
      "price": 1108,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "160",
      "name": "Mohan Travels",
      "from": "Chennai",
      "to": "Ooty",
      "departureTime": "22:52",
      "arrivalTime": "08:52",
      "price": 1095,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "161",
      "name": "JP Tours and Travels",
      "from": "Madurai",
      "to": "Coimbatore",
      "departureTime": "19:01",
      "arrivalTime": "04:01",
      "price": 680,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "162",
      "name": "Akbar Travels",
      "from": "Madurai",
      "to": "Chennai",
      "departureTime": "22:44",
      "arrivalTime": "04:44",
      "price": 1343,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "163",
      "name": "STS Travels",
      "from": "Madurai",
      "to": "Nagercoil",
      "departureTime": "20:53",
      "arrivalTime": "07:53",
      "price": 868,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "164",
      "name": "Essaar Travels",
      "from": "Madurai",
      "to": "Salem",
      "departureTime": "16:58",
      "arrivalTime": "02:58",
      "price": 1151,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "165",
      "name": "Bharathi Travels",
      "from": "Madurai",
      "to": "Ooty",
      "departureTime": "08:06",
      "arrivalTime": "17:06",
      "price": 615,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "166",
      "name": "Prince Travels",
      "from": "Erode",
      "to": "Madurai",
      "departureTime": "22:35",
      "arrivalTime": "08:35",
      "price": 905,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "167",
      "name": "SHN Travels",
      "from": "Erode",
      "to": "Chennai",
      "departureTime": "21:27",
      "arrivalTime": "08:27",
      "price": 1344,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "168",
      "name": "SST Travels",
      "from": "Erode",
      "to": "Kanchipuram",
      "departureTime": "18:16",
      "arrivalTime": "02:16",
      "price": 1206,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "169",
      "name": "SBLT Travels",
      "from": "Erode",
      "to": "Kumbakonam",
      "departureTime": "10:01",
      "arrivalTime": "21:01",
      "price": 1033,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "170",
      "name": "Mettur Super Services",
      "from": "Erode",
      "to": "Thoothukudi",
      "departureTime": "15:17",
      "arrivalTime": "20:17",
      "price": 1446,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "171",
      "name": "CPT Travels",
      "from": "Coimbatore",
      "to": "Chennai",
      "departureTime": "09:31",
      "arrivalTime": "18:31",
      "price": 1327,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "172",
      "name": "Eternal Travels",
      "from": "Coimbatore",
      "to": "Madurai",
      "departureTime": "18:44",
      "arrivalTime": "01:44",
      "price": 1113,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "173",
      "name": "Neyyar Travels",
      "from": "Coimbatore",
      "to": "Thanjavur",
      "departureTime": "22:31",
      "arrivalTime": "03:31",
      "price": 1191,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "174",
      "name": "Sai Balamurugan Travels",
      "from": "Coimbatore",
      "to": "Nagercoil",
      "departureTime": "12:08",
      "arrivalTime": "22:08",
      "price": 825,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "175",
      "name": "A.S.K. Travels",
      "from": "Coimbatore",
      "to": "Hosur",
      "departureTime": "16:08",
      "arrivalTime": "02:08",
      "price": 1070,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "176",
      "name": "Mahasagar Travels",
      "from": "Salem",
      "to": "Sivakasi",
      "departureTime": "12:22",
      "arrivalTime": "16:22",
      "price": 1363,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "177",
      "name": "Surya Connect Travels",
      "from": "Salem",
      "to": "Chennai",
      "departureTime": "16:28",
      "arrivalTime": "02:28",
      "price": 1378,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "178",
      "name": "JMS Travels",
      "from": "Salem",
      "to": "Dindigul",
      "departureTime": "06:11",
      "arrivalTime": "17:11",
      "price": 785,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "179",
      "name": "Thunaivan Travels",
      "from": "Salem",
      "to": "Madurai",
      "departureTime": "10:00",
      "arrivalTime": "21:00",
      "price": 941,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "180",
      "name": "SEABIRD Tourists",
      "from": "Salem",
      "to": "Tirunelveli",
      "departureTime": "18:23",
      "arrivalTime": "01:23",
      "price": 678,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "181",
      "name": "SRS Travels",
      "from": "Hosur",
      "to": "Coimbatore",
      "departureTime": "22:43",
      "arrivalTime": "09:43",
      "price": 901,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "182",
      "name": "Sugama Tourists",
      "from": "Hosur",
      "to": "Chennai",
      "departureTime": "16:56",
      "arrivalTime": "20:56",
      "price": 780,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "183",
      "name": "Praveen Travels",
      "from": "Hosur",
      "to": "Madurai",
      "departureTime": "09:38",
      "arrivalTime": "17:38",
      "price": 666,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "184",
      "name": "Udaya Travels",
      "from": "Hosur",
      "to": "Tiruchirappalli",
      "departureTime": "11:38",
      "arrivalTime": "22:38",
      "price": 1349,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "185",
      "name": "Balakrishna Travels",
      "from": "Hosur",
      "to": "Kumbakonam",
      "departureTime": "15:45",
      "arrivalTime": "03:45",
      "price": 930,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "186",
      "name": "Srinivasa Travels",
      "from": "Tirunelveli",
      "to": "Coimbatore",
      "departureTime": "20:07",
      "arrivalTime": "06:07",
      "price": 1170,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "187",
      "name": "Parvati Travels",
      "from": "Tirunelveli",
      "to": "Chennai",
      "departureTime": "09:35",
      "arrivalTime": "17:35",
      "price": 1438,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "188",
      "name": "Mahaveer Travels",
      "from": "Tirunelveli",
      "to": "Thanjavur",
      "departureTime": "17:28",
      "arrivalTime": "21:28",
      "price": 545,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "189",
      "name": "PTS Travels",
      "from": "Tirunelveli",
      "to": "Tiruppur",
      "departureTime": "12:17",
      "arrivalTime": "20:17",
      "price": 1172,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "190",
      "name": "Dev Travels",
      "from": "Tirunelveli",
      "to": "Madurai",
      "departureTime": "21:53",
      "arrivalTime": "01:53",
      "price": 895,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "191",
      "name": "Dolphin Travel",
      "from": "Tiruppur",
      "to": "Chennai",
      "departureTime": "20:46",
      "arrivalTime": "08:46",
      "price": 1405,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "192",
      "name": "Shrinath Travel Agency",
      "from": "Tiruppur",
      "to": "Madurai",
      "departureTime": "22:29",
      "arrivalTime": "10:29",
      "price": 736,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "193",
      "name": "Geeta Travels",
      "from": "Tiruppur",
      "to": "Thoothukudi",
      "departureTime": "06:33",
      "arrivalTime": "14:33",
      "price": 939,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "194",
      "name": "Hans Travels",
      "from": "Tiruppur",
      "to": "Nagercoil",
      "departureTime": "12:24",
      "arrivalTime": "19:24",
      "price": 1490,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "195",
      "name": "Sharma Travels",
      "from": "Tiruppur",
      "to": "Kumbakonam",
      "departureTime": "06:12",
      "arrivalTime": "12:12",
      "price": 751,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "196",
      "name": "Manish Travels",
      "from": "Ooty",
      "to": "Chennai",
      "departureTime": "15:20",
      "arrivalTime": "19:20",
      "price": 822,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "197",
      "name": "Raj Ratan Travels",
      "from": "Ooty",
      "to": "Madurai",
      "departureTime": "07:27",
      "arrivalTime": "13:27",
      "price": 1237,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "198",
      "name": "Suhail Khan Travels",
      "from": "Ooty",
      "to": "Tiruchirappalli",
      "departureTime": "18:01",
      "arrivalTime": "04:01",
      "price": 622,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "199",
      "name": "Deepak Travels",
      "from": "Ooty",
      "to": "Hosur",
      "departureTime": "12:46",
      "arrivalTime": "23:46",
      "price": 1030,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  },
  {
      "id": "200",
      "name": "Global Travels",
      "from": "Ooty",
      "to": "Dindigul",
      "departureTime": "06:22",
      "arrivalTime": "17:22",
      "price": 1100,
      "totalSeats": 45,
      "availableSeats": {
          "ladies": 10,
          "seniorCitizen": 5,
          "general": 20
      }
  }
];


export const useBusStore = create<BusSearchState>((set) => ({
  searchResults: [],
  isLoading: false,
  error: null,
  searchBuses: async (from: TamilNaduCity, to: TamilNaduCity, date: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Filter mock buses based on search criteria
      const results = mockBuses.filter(
        (bus) => bus.from === from && bus.to === to
      );
      
      if (results.length === 0) {
        set({ 
          error: 'No buses found for the selected route. Please try different cities or dates.',
          isLoading: false,
          searchResults: []
        });
        return;
      }
      
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to search buses. Please try again later.',
        isLoading: false,
        searchResults: []
      });
    }
  },
}));