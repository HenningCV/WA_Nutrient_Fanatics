const usda_key = ' Xxb4xFDH9WKXigQ6yxhYdknrwHKW2U1kcSlNhAWJ'

function get_usda_fdc_search(key, query) {
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${query}`)
        .then((response) => {
            return response.json();
        })

}

function get_first_element_in_object(data) {
    return data[0]
}