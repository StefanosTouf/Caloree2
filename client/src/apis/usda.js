import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.nal.usda.gov/fdc/v1',
    params: {
        api_key: 'kK3qN4gZtTNBtKuEuwDyDH2vvLiNk5UaV2FTEeaz'
    }
})