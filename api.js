import axios from "axios";

const baseURL = "https://web-scraper-api-gvkj.onrender.com/?postcode=";

export const search = async (postcode) => {
  console.log("Inside search");
  return await axios
    .get(baseURL, { params: { postcode: postcode } })
    .then((results) => {
      const data = results.data;
      if (data.error != undefined) {
        return data;
      }
      return { name: data[0], address: data[1] };
    })
    .catch((err) => {
      return { error: err };
    });
};
