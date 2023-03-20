const db = require('../src/db')

class CarController {

  async createCar(req, res) {
    const { brand, model, release_year } = req.body
    const newCar = await db.query(
      'INSERT INTO cars(brand, model, release_year) values ($1, $2, $3) RETURNING *',
      [brand, model, release_year]
    )
    res.json(newCar.rows[0])
  }


  async getCars(req, res) {
    const cars = await db.query('SELECT * FROM cars LEFT JOIN persons p ON p.person_id = cars.fk_person_id')
    res.json(cars.rows)
  }


  async getOneCar(req, res) {
    const id = req.params.id
    const query = {
      text: 'SELECT ' +
        'cars.car_id, ' +
        'cars.brand, ' +
        'cars.model, ' +
        'cars.release_year, ' +
        'p_buyer.last_name as buyer, ' +
        'p_seller.last_name as seller, ' +
        'cs.date_buy ' +
        'FROM cars ' +
        'LEFT JOIN cars_sales cs on cars.car_id = cs.car_id ' +
        'LEFT JOIN persons p_buyer on cs.buyer = p_buyer.person_id ' +
        'LEFT JOIN persons p_seller on cs.seller = p_seller.person_id ' +
        'WHERE cars.car_id = $1 AND cs.buyer = cars.fk_person_id',
      values: [id],
    }
    const car = await db.query(query)
    res.json(car.rows[0])
  }

}

module.exports = new CarController()
