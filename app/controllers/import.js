import { setManyFromFile } from "./services.js"

const fileImport = async (req, res) => {
      if (!req.files || !req.files.movies) {
        return res.status(400).json({
          message: "File Not Found"
        })
      } else if (req.files.movies.mimetype !== 'text/plain') {
          return res.status(400).json({
            message: "The file format must be .txt"
          })
      } else if (!((req.files.movies.data.toString('utf8')).includes('Title:' && 'Release Year:' && 'Format:' && 'Stars:'))){
          return res.status(400).json({
            message: "Movie import fields not found"
          })
      } else {
          const [imported, totalLength, errors] = await setManyFromFile(req.files);

          res.send({
            status: 1,
            data: imported,
            errors: errors,
            meta: { total: totalLength, imported: imported.length }
          });
    }

}
  

export { fileImport }