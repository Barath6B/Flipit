function flipACoin() {

    const values = ["heads" , "tails"];
    const index = Math.floor(Math.random()* values.length);
    return values[index];
}

export default flipACoin;