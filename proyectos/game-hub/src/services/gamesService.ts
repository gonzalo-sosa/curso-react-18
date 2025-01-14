import { create } from "./httpService";
import config from "@/config";

export default create(
  "https://api.rawg.io/api/games" + `?key=${config.api_key}`,
);
