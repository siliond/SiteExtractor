// var jq = document.createElement('script');
// jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
// jq.onload = function() {
//     getAddresses();
// }

// document.getElementsByTagName('head')[0].appendChild(jq);

const SiteExtractor = {
    siteSettings: {
        //https://www.redfin.com/city/30868/TX/Plano/filter/property-type=house,max-price=650k,min-beds=3,min-baths=2,min-year-built=1990,min-lot-size=0.25-acre,include=forsale+mlsfsbo+construction+fsbo+foreclosed,viewport=33.47482:32.6288:-95.97419:-97.62625
        "www.redfin.com": { "Path": "div.link-and-anchor", "ExcludePrevious": true },

        //https://www.trulia.com/for_sale/32.8198,33.30782,-96.91955,-96.54632_xy/3p_beds/2p_baths/0-650000_price/2500p_sqft/price;a_sort/0.25p_ls/2000p_built/accepting_offers,coming_soon,foreclosure,fsbo,new_homes,resale_lt/
        "www.trulia.com": { "Path": "a[data-testid='property-card-link']", "ExcludePrevious": true },

        //https://www.realtor.com/realestateandhomes-search/Plano_TX/beds-3/baths-2/type-single-family-home/price-na-650000/sqft-2500/lot-sqft-10890/age-25/pnd-hide?view=map&pos=33.549135,-97.395747,32.570845,-96.077388,10&points=xlelQa_vjEfaK%3FfaKpjBfsDkMhvIo_AdwB%3FpuEzmAnr%40hx%40flAr%60EflA%60uAflAnnCbP%3FztAxqBxtA%7C%7CC%7CwF~vGbPpeH%60bD~%7BJvXtcB%7CwF~b%40ngJ%60rBzwFrTflA%7CfA%7Ci%40%7CfA%3Fx_Am%7DAvoEsqGniGeeIx_AcwBfnAkhCx%5B%7BpCt%7CAgaKfj%40e~Ez_A%7DaOtx%40u_Nz%5BquE~b%40aiGfFy%7BDoq%40ewB%7DgCmdEaxGwXgrB%3F_gJia%40k%7DC%3FavC%60%7B%40ucB%3FciGor%40wnC%3FscBja%40_nA%3Fox%40or%40yuCrjDemJja%40yqB%7BtAoyQvXyb%40l%7DAiMePbF
        "www.realtor.com": { "Path": "div.srp-page-address", "ExcludePrevious": true },

        //https://cannonteamhomes.com/search?view=gallery_view#?q_limit=36&mlsId=17&price=350000:650000&bedrooms=3:&sqFeet=2500:&acreage=0.25:&year=1990:&propertyType=Residential&status=1&polygon=(33.22,-96.504),(33.285,-96.943),(33.273,-97.001),(33.211,-97.042),(33.22,-97.182),(33.158,-97.196),(32.986,-97.067),(32.914,-96.866),(32.905,-96.726),(33.045,-96.482),(33.14,-96.484),(33.234,-96.526)&q_sort=createdAt-&q_offset=0
        "cannonteamhomes.com": {
            "Paths": {
                //addresses
                Address: { Path: "div.listing-detail" },
                Status: { Value: "New" },
                Price: { Siblings: "h2" },
                Link: { Closest: "a", Attr: "href" },

                //address
                Year: { Path: 'span.header:contains("Year Built")', Siblings: 'span.content' },
                Bedrooms: { Path: 'small:contains("Bed")', Siblings: 'h4.no-margin' },
                Bathrooms: { Path: 'small:contains("Bath")', Siblings: 'h4.no-margin' },
                SqFeet: { Path: 'small:contains("SqFt")' },
                Lot: { Path: 'span.header:contains("Lot/Acreage")', Siblings: 'span.content' }
            },
            "ExcludePrevious": true
        },

        //https://portal.onehome.com/en-US/properties/list?token=eyJPU04iOiJOVFJFSVMiLCJjb250YWN0aWQiOiI0MzQ1MTU0IiwiZW1haWwiOiJzaWxpb25kQGdtYWlsLmNvbSIsImFnZW50aWQiOiIzMTYxOSJ9&searchId=58b9455d-96ba-4ccc-97de-4624ae8af101
        "portal.onehome.com": {
            "Paths": {
                //addresses
                Address: { Path: "div.address-content" },
                Status: { Value: "New" },
                Price: { Siblings: "p.price" },
                Link: { Closest: "div.property-container", Find: "a", Attr: "href" },

                //address
                Year: { Path: 'dt.label:contains("Year Built")', Siblings: 'dd.detail' },
                Bedrooms: { Path: 'span[data-qa="beds"]' },
                Bathrooms: { Path: 'span[data-qa="baths"]' },
                SqFeet: { Path: 'span[data-qa="sqft"]' },
                Lot: { Path: 'dt.label:contains("Lot Size Area:")', Siblings: 'dd.detail' }
            },
            "ExcludePrevious": true
        },

        "www.google.com": { "Path": "td[dir='auto']", "ExcludePrevious": false }
    },

    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(function() {
            SiteExtractor.pageLog('Async: Copying to clipboard was successful!', 'green');
        }, function(err) {
            SiteExtractor.pageLog('Async: Could not copy text: ' + err);
        });
    },

    pageLog: function(text, color = "red") {
        $('body').prepend(`<h3 style="color:${color};">${text}</h3>`).scrollIntoView();
    },

    getAbsolutePath: function(base, relative) {
        const separator = "/";

        var stack = base.split(separator),
            parts = relative.split(separator);
        stack.pop(); // remove current file name (or empty string)
        // (omit if "base" is the current folder without trailing slash)
        for (var i = 0; i < parts.length; i++) {
            if (!parts[i] || parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    },

    jPathDrill: function(siteSetting, addresses, elem, prop) {
        let jPaths = siteSetting.Paths;

        let extract = jPaths[prop],
            value;

        if (extract.Value)
            value = extract.Value;

        if (extract.Attr)
            value = elem.attr(extract.Attr);

        if (!value) {
            let relativeElem = elem;

            if (extract.Path)
                relativeElem = $(extract.Path);
            if (extract.Closest)
                relativeElem = relativeElem.closest(extract.Closest);
            if (extract.Find)
                relativeElem = relativeElem.find(extract.Find);
            if (extract.Siblings)
                relativeElem = relativeElem.siblings(extract.Siblings);

            if (relativeElem) {
                if (Array.isArray(relativeElem))
                    relativeElem = relativeElem[0];

                if (extract.Attr)
                    value = relativeElem.attr(extract.Attr);
                else
                    value = relativeElem.text();
            }
        }

        let propFunction = SiteExtractor[`onJPath${prop}`];
        if (propFunction)
            value = propFunction(siteSetting, addresses, value);

        return value;
    },

    onJPathLink: function(siteSetting, addresses, value) {
        if (value)
            value = SiteExtractor.getAbsolutePath(window.location.href, value);

        return value;
    },

    onJPathYear: function(siteSetting, addresses, value) {
        return SiteExtractor.toNumber(value);
    },

    onJPathBedrooms: function(siteSetting, addresses, value) {
        return SiteExtractor.toNumber(SiteExtractor.splitDot(value)[1]);
    },

    onJPathBathrooms: function(siteSetting, addresses, value) {
        return SiteExtractor.toNumber(SiteExtractor.splitDot(value)[1]);
    },

    onJPathSqFeet: function(siteSetting, addresses, value) {
        return SiteExtractor.toNumber(value);
    },

    onJPathLot: function(siteSetting, addresses, value) {
        return SiteExtractor.toNumber(value);
    },

    toNumber: function(value) {
        value = parseFloat(value.replace(/,/g, ''));

        return value;
    },

    splitDot: function(value) {
        value = value.split(" • ");

        return value;
    },

    onJPathAddress: function(siteSetting, addresses, value) {
        let excludePrevious = siteSetting.ExcludePrevious;

        value = SiteExtractor.splitDot(value)[0];

        value = value.replace(/ Bed$/i, "");
        value = value.replace(/\s{2,}/i, " ");

        //Strip extras "4428 Elmhurst DrivePlano, TX 75093-3257 4 bd 3 ba 3,067 sqft MLS #14597644"
        value = value.replace(/(TX [0-9\-]{5,10}).*/i, "$1");

        //Fix missing space before city: "790 Manchester AvenueProsper, TX 75078-1447"
        value = value.replace(/([A-Z]{1}[a-z]+)([A-Z]{1}[A-Za-z]+)(, TX)/, "$1, $2$3");

        value = value.trim();

        if (value.match(/^ *$/) == null &&
            value.match(/.*, TX.*/) != null &&
            !addresses.map(e => e.Address).includes(value) &&
            //Address "12685 Burnt Prairie Lane, Frisco, TX 75035-5168" vs "12685 Burnt Prairie Ln Frisco, TX 750354"
            (!excludePrevious || !previousAddresses.find(a => a.indexOf(value.split(' ').slice(0, 2).join(' ')) >= 0)))
            return value;
        else
            return null;
    },

    getAddress: function() {
        let addressProps = ["Year", "Bedrooms", "Bathrooms", "SqFeet", "Lot"];

        return this.getElements(addressProps);
    },

    getAddresses: function() {
        let addressProps = ["Address", "Status", "Price", "Link"];

        return this.getElements(addressProps);
    },

    getElementDetails(siteSetting, elementProps, elements, jElement) {
        let element = {};

        for (let i = 0; i < elementProps.length; i++) {
            const prop = elementProps[i];

            element[prop] = SiteExtractor.jPathDrill(siteSetting, elements, jElement, prop);

            if (i == 0 && !element[prop]) {
                element = null;
                break;
            }
        }

        return element;
    },

    getElements: function(elementProps) {
        let siteSetting = this.siteSettings[window.location.hostname];
        let jPaths = this.siteSettings[window.location.hostname].Paths;

        jQuery(function($) {
            var elements = [];

            //addresses
            if (elementProps.includes('Address')) {
                $(jPaths.Address.Path).each(function() {
                    let element = SiteExtractor.getElementDetails(siteSetting, elementProps, elements, $(this));

                    if (element)
                        elements.push(element);
                });
            } else {
                //address
                let element = SiteExtractor.getElementDetails(siteSetting, elementProps, elements, null);

                if (element)
                    elements.push(element);
            }

            if (elements.length > 0) {
                const currentDate = new Date();

                let csvContents = '"' +
                    elements.map(e => Object.values(e).join('"\t"')).join('"\n"') +
                    '"';

                let elementsText =
                    `//${window.location.hostname + "_" + currentDate.toISOString().split('T')[0]}
"${elements.map(e => e[elementProps[0]]).join('", "')}",

${csvContents}`;

                SiteExtractor.copyToClipboard(elementsText);
            } else {
                SiteExtractor.pageLog("No New addressed found.");
            }
        });

        //TODO save as csv file
        //then load in Google My Maps via instructions https://support.google.com/mymaps/answer/3024836?co=GENIE.Platform%3DDesktop&hl=en#zippy=%2Cstep-prepare-your-info%2Cstep-import-info-into-the-map
    }
};