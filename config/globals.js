// make a very large amount of ado in order to store the database connection in a globally accessible place
module.exports = {
    'db': 'mongodb+srv://Josh:aUFSVzvZAJZ8GQLE@cluster0-b4pbi.mongodb.net/assignments',
    'ids': {
        'google': {
            clientID: '147358985971-8tt4c34g01liq5j64jno421no1v2398l.apps.googleusercontent.com',
            clientSecret: 'k2T1iwU5lnE59ZlurqmmwOas ',
            callbackURL: 'http://localhost:3000/google/callback'
        }
    }
}