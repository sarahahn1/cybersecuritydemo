const bycrpt = require('bcrypt')

module.exports = {
  signup: (req, res) => {
    const {email, password} = req.body
    const saltRounds = 10

    bycrpt.hash(password,saltRounds, (error, hashPass) => {
      let newDatabaseEntry = {}
    newDatabaseEntry.email = email
    newDatabaseEntry.password = hashPass
    newDatabaseEntry.destiny = destinies[Math.floor(Math.random() * destinies.length)]
    console.log('\nNew database entry: ')
    console.log(newDatabaseEntry)
    database.push(newDatabaseEntry)
    res.status(200).send({success: true})
    console.log(database)
    })
   },
  login: (req, res) => {
    const {email, password} = req.body
    let userData

//look for a user with the username passed in 
for(let i = 0; i < database.length; i++) {
  if (database[i].email === email) {
    userData = database[i]
  } 
}

if (userData === undefined) {
  res.status(200).send({success: false, message: 'bad username'})
} else {
  bycrpt.compare(password, userData.password, (error, success) => {
    if (!error) {
      if (success) {
        const destinyIntro = "your final destiny is to"
        res.status(200).send({success: true, destiny: userData.destiny, intro: destinyIntro})
      } else {
        res.status(200).send({success: false, message: 'bad password'})
      }
    } else {
      console.log('bycrpt has an error comparing passwords:')
      console.log(error)
      res.status(500).send({success: false, message: "backend error"})
    }
  })
}
}
}

    // for (let i=0; i<database.length; i++) {
    //   if (email === database[i].email && password === database[i].password) {
    //     userData = database[i]
    //   }
    // }

    // if (!userData) {
    //   res.status(200).send({success: false, message: 'bad password or username'})
    // } else {
    //   const destinyIntro = "Your final destiny is to "
    //   res.status(200).send({success: true, destiny: userData.destiny, intro: destinyIntro})
    // }
//   }
// }


const database = [
  {
    email:'john@gmail.com',
    password:'1234asdf',
    destiny:'becoming the new Santa'
  },
  {
    email:'sallybonnet@yahoo.com',
    passwordHash:'funpassword',
    destiny:'becoming best friends with Martha Stewart'
  },
]


const destinies = [
  'become a well-respected bartender',
  'cure cancer',
  'become a bear whisperer',
  'become a hoarder',
  'become the lead in a high-budget film, filling in for Henry Cavill when he unexpectedly goes MIA',
  'summit Everest',
  'become the next Bruce Willis',
]