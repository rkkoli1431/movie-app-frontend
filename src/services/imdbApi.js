// const API_URL = "https://imdb236.p.rapidapi.com/api/imdb/top250-movies";

// export const fetchTop250Movies = async () => {
//   try {
//     const response = await fetch(API_URL, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
//         "x-rapidapi-host": "imdb236.p.rapidapi.com",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("API request failed");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Error:", error);
//   }
// };
