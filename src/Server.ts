import { Server } from 'http';
import app from './App'

const port = 5022;
let server: Server;



const main = () => {
    server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

main();
