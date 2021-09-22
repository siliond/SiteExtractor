//https://public.txdpsscheduler.com/
const site = 'public.txdpsscheduler.com';

function getField(labelText) {
    return { Path: 'label.v-label:contains("' + labelText + '")', Siblings: 'input', Action: 'val', ActionParam: SiteExtractor.getDataSetValue(capitalizeFirstLetters(labelText)) };
}

function capitalizeFirstLetters(string) {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    string = string.replace(/\s([a-zA-Z])/g, '\\u$1');

    return string;
}

SiteExtractor.siteSettings[site] = {
    DataSetIndex: 0,
    DataSet: [{
        FirstName: 'Daniel',
        LastName: 'Silion',
        DateOfBirth: '02/14/1978'
    }]
};

SiteExtractor.siteSettings[site] = {
    "Paths": [
        //Intro
        //Language
        { Path: 'span.v-btn__content:contains("English")', Action: 'click' },

        //Log On
        getField('First Name'),

        getField('Last Name'),

        getField('Date of Birth')
        //{ Path: 'label.v-label:contains("First Name")', Siblings: 'input', Action: 'val', ActionParam: "Daniel" }
    ]
};