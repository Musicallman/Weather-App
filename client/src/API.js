const callApi = async (city = 'kiev') => {
    const response = await fetch('/api', {
        method: 'post',
        body: city
    })
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
};

export default callApi;