const db = require('../src/db')

class SellController {

  async createSell(req, res) {
    const { buyer, seller, car_id } = req.body
    await db.query('BEGIN')
    await db.query(
      'INSERT INTO cars_sales (buyer, seller, car_id) values ($1, $2, $3)',
      [buyer, seller, car_id]
    );
    await db.query(
      'UPDATE cars SET fk_person_id = $1 WHERE car_id = $2',
      [buyer, car_id]
    );
    await db.query('COMMIT')

    res.json({ message: 'ok'})
  }
}

module.exports = new SellController()

