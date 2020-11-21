import axios from 'axios'

const Recipe = axios.create({
        baseUrl: 'http://192.168.0.2:3333'
      });

export default Recipe