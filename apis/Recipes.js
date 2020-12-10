import axios from 'axios'

const Recipe = axios.create({
        baseUrl: 'http://192.168.0.5:3333'
      });

export default Recipe