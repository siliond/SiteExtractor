//https://public.txdpsscheduler.com/
const site = 'public.txdpsscheduler.com';

SiteExtractor.getField = function(labelText) {
    return { Path: 'label.v-label:contains("' + labelText + '")', Siblings: 'input', Action: 'val', ActionParam: SiteExtractor.getDataSetValue(SiteExtractor.makeProperty(labelText)) };
}

SiteExtractor.makeProperty = function(string) {
    string = string.replace(/\s/g, '');

    return string;
}

SiteExtractor.siteSettings[site] = {
    "Paths": [
        //Intro
        //Language
        { Path: 'span.v-btn__content:contains("English")', Action: 'click' },

        //Log On
        'SiteExtractor.getField("First Name")',

        'SiteExtractor.getField("Last Name")',

        'SiteExtractor.getField("Date of Birth")'
        //{ Path: 'label.v-label:contains("First Name")', Siblings: 'input', Action: 'val', ActionParam: "Daniel" }
    ]
};