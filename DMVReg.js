//https://public.txdpsscheduler.com/
const site = 'public.txdpsscheduler.com';

function getField(labelText) {
    return { Path: 'label.v-label:contains("' + labelText + '")', Siblings: 'input', Action: 'val', ActionParam: SiteExtractor.getDataSetValue(makeProperty(labelText)) };
}

function makeProperty(string) {
    string = string.replace(/\s/g, '');

    return string;
}

SiteExtractor.siteSettings[site] = {
    DataSetIndex: 0,
    DataSet: [{
        FirstName: 'Daniel',
        LastName: 'Silion',
        DateofBirth: '02/14/1978'
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