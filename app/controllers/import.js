import { Movies } from "../models/movies.js";
import { setManyFromFile } from "./services.js"

const fileImport = async (req, res) => {
  const [imported, totalLength, errors] = await setManyFromFile(req.files);

  res.send({
    status: 1,
    data: imported,
    errors: errors,
    meta: { total: totalLength, imported: imported.length }
  });
}

export { fileImport }