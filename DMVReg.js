//https://public.txdpsscheduler.com/

// SiteExtractor.initExtractParams({
//     DataSetIndex: 0,
//     DataSet: [{
//         FirstName: 'Daniel',
//         LastName: 'Silion',
//         DateofBirth: ''
//     }]
// });

// window.onload = function() {
// setTimeout(SiteExtractor.extract.bind(SiteExtractor), 1000);
// }

// $(document).ready(function() {
//     $(':input').live('focus', function() {
//         $(this).attr('autocomplete', 'off');
//     });
// });

// $(document).ready(function() {
//     $('input').each(function() {
//         $(this).attr('autocomplete', 'on');
//     });
// });

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