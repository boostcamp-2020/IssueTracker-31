const relationMaker = (model, connection, first, firstId) => {
  return async (table, second, array) => {
    if (array.length > 0) {
      const relations = array.map(secondId => [firstId, secondId])
      await model(connection, table, first, second, relations)
    }
  }
}

export default relationMaker
