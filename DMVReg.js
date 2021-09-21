//https://public.txdpsscheduler.com/
SiteExtractor.siteSettings['public.txdpsscheduler.com'] = {
    "Paths": [
        //Intro
        //Language
        { Path: 'span.v-btn__content:contains("English")', Action: 'click' },

        //Log On
        //First Name
        { Path: 'label.v-label:contains("First Name")', Siblings: 'input', Action: 'val', Value: "Daniel" }
    ]
}