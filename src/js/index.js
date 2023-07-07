import axios from 'axios';

const fetchObjects = async () => {
    const response = await axios.get(URL);
    const results = await response;
    return results;
  };

  export{fetchObjects}