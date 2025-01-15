import config from "@/config";
import { create } from "./http-service";

export default create(
  "https://api.rawg.io/api/genres" + `?key=${config.api_key}`,
);
