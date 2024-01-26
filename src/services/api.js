
//movie/550?api_key=65a85df54d92afbbcf6d43aae92ea78f

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;