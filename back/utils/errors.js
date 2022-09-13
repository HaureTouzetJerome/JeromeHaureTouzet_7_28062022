module.exports.uploadErrors = (error) => {
  let errors = { format: '', maxSize: ""}

  if (error.message.includes('invalid file'))
    errors.format = "Format incorrect (uniquement jpg ou png)"

  if (error.message.includes('max size'))
    errors.maxSize = "Le fichier est trop volumineux"

  return errors
}