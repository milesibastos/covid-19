import axios from "axios";

export default (req, res) => {
  // axios.get("google.com?q=milesibastos").then((resp) => console.log(resp.data));
  res.json({ ping: "ping" });
};
