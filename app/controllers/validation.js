function forbiddenSymbols(string) {
    const symbols = /[^\sa-zA-Zа-яА-ЯіІїЇґҐєЄ,-]/g;
  
    return symbols.test(string);
  }
  
  function removeSpaces(string) {
  
    return string.trim().replace(/\s{2,}/g, '');
  }
  
  
  function validateTitle(title) {
    if (typeof title !== 'string') {
      throw new Error('Title must be a type string.')
    } else {
        return title
    }
  }
  
  function validateYear(year) {
    const start= 1850;
    const end = 2022;
  
    if (
      typeof year !== 'number' ||
      year < start ||
      year > end
    ) {
      throw new Error('Not valid date.')
    } else {
        return year
    }
  }
  
  function validateFormat(format) {
    const enumFormat = {
      'VHS': true,
      'DVD': true,
      'Blu-Ray': true
    };
  
    if (typeof format !== 'string' && !formatsEnum[format]) {
      throw new Error('Not valid format. Format must be VHS, DVD or Blu-Ray only')
    } else {
        return format
    }
  }
  
  function validateActors(actors) {
  
    if (!Array.isArray(actors)) {
      throw new Error('List of actors must be in array.');
    } else {
        actors.forEach((actor) => {
            if (typeof actor !== 'string' || forbiddenSymbols(actor)) {
              throw new Error('Actors not valid.');
            } else {
              removeSpaces(actor)
            }
          });
          return actors
    }
  
  }
  
  function validateCreateMovie({ title, year, format, actors }) {
    if (!title || !year || !format || !actors) {
        throw new Error('All field are not empty');
    } else {
        return {title: validateTitle(title), year: validateYear(year), format: validateFormat(format), actors: validateActors(actors)};
    }
  }
  
  function validateUpdateMovie({ title, year, format, actors }) {
    if (!title && !year && !format && !actors) {
      throw new Error('All field are not empty');
    }
  
    if (title) {
      validateTitle(title);
    }
  
    if (year) {
      validateYear(year);
    }
  
    if (format) {
      validateFormat(format);
    }
  
    if (actors) {
      validateActors(actors);
    }
    return {title: validateTitle(title), year: validateYear(year), format: validateFormat(format), actors: validateActors(actors)};
  }
  

  function validateUser({ email, name, password, confirmPassword }) {
    if (!email || !name || !password || !confirmPassword) {
        throw new Error('All fields are required.');
    } else if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string' || typeof confirmPassword !== 'string') {
        throw new Error('Field must be a typeOf String.');
    } else {
        return {email: email.trim(), name: name.trim(), password: password.trim(), confirmPassword: confirmPassword.trim()};
    }
  }

  function validateUserSession ({ email, password }) {
    if (!email || !password) {
        throw new Error('All fields are required.');
    } else if (typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Field must be a typeOf String.');
    } else {
        return {email: email.trim(), password: password.trim()};
    }
  }

  export {
    removeSpaces,
    validateCreateMovie,
    validateUpdateMovie,
    validateUser,
    validateActors,
    validateUserSession
  }