const db = require('../src/db')

class PersonController {


  async createPerson(req, res) {
    try {
      const { first_name, last_name, passport } = req.body
      await db.query('BEGIN')
      const newPerson = await db.query('INSERT INTO persons(first_name, last_name) values ($1, $2) RETURNING *', [first_name, last_name])
      const newPassport = await db.query('INSERT INTO passports(serial_number, fk_person_id) VALUES ($1, $2) RETURNING *', [passport, newPerson.rows[0].person_id])
      await db.query('COMMIT')
      res.json({...newPerson.rows[0], passport: newPassport.rows[0].serial_number})
    } catch (e) {
      console.log(e)
      await db.query('ROLLBACK')
      res.status(400).json({ message: 'Ошибка базы данных' })
    }
  }


  async getPersons(req, res) {
    try {
      const persons_db = await db.query('SELECT person_id as id, first_name, last_name, serial_number as passport FROM persons p LEFT JOIN passports ON p.person_id = passports.fk_person_id')
      const cars_db = await db.query('SELECT * FROM cars')
      const persons = persons_db.rows.map(person => {
        const cars = []
        cars_db.rows.map(car => {
          if (person.id === car.fk_person_id) {
            cars.push(car)
          }
        })
        return { ...person, cars }
      })
      res.json(persons)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка базы данных', error: e })
    }
  }


  async getOnePerson(req, res) {
    try {
      const person_id = req.params.id
      const persons = await db.query('SELECT * FROM persons WHERE person_id = $1', [person_id])
      res.json(persons.rows[0])
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка базы данных' })
    }
  }
}

module.exports = new PersonController()
