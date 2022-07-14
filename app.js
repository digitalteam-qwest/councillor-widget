class councillorWidget {
    constructor(town) {
        this.town = town
    }

    getCouncillor () {
        if (this.town === '') {
            $('#councillor-content').empty()
            return
        }
        
        $('#councillor-content').empty().append('<p>Retrieving information...</p>')

        const payload = {
            "town": {
                "name": "town",
                "value": this.town
            }
        }

        runLookup('62b03c3057187', payload).then((response) => {
            if (response.success) {
                this.councillor = response.data[0].councillor
                this.party = response.data[0].party
                this.displayResults()
            } else {
                this.displayError()
            }
        })
    }

    displayResults () {
        let content = ''
        content += '<div id="councillor-content-picture">'
        content += '<img src="https://apps-cheshire-west.s3.amazonaws.com/staging/testFiles/potrait.png" alt="Councillor potrait">'
        content += '</div>'
        content += '<div id="councillor-content-details">'
        content += '<p>' + this.councillor + '</p>'
        content += '<p>' + this.party + '</p>'
        content += '</div>'

        $('#councillor-content').empty().append(content)
    }

    //Display the error message if data isn't returned properly
    displayError = () => {
        logIntRun()

        $('#councillor-content').empty().append('<p>Your local councillor information is not available at the moment. Please try again later.</p>')
    }
}