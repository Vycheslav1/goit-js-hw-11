const fetchObjects = async () => {
    const response = await fetch(URL);
    const results = await response.json();
    return results;
  };

  export{fetchObjects}