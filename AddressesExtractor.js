// var jq = document.createElement('script');
// jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
// jq.onload = function() {
//     getAddresses();
// }

// document.getElementsByTagName('head')[0].appendChild(jq);

const SiteExtractor = {
    startRowIndex: 2,
    currentRowIndex: 2,
    beVerbose: true,
    mainProp: "Address",
    valueSeparators: ['•', '·', ':'],
    siteSettings: {
        "Global": {
            "Paths": {
                //addresses
                MapDuration: { Value: '=GetMapDuration(${AddressCellCoordinates},General!$B$1)' },
                Image: { Value: '=IMAGE(GetMapImageURL(${AddressCellCoordinates}))' },
                MapLink: { Value: '=hyperlink(CONCATENATE(""https://www.google.com/maps/search/?api=1&query="", ${AddressCellCoordinates}))' },

                ListingType: {},

                //address
                MiddleSchool: {},
                HighSchool: {},
                ISDSchool: {},

                Summary: { Value: '=CONCATENATE(A$1, "": "", A${AddressCellRow}, CHAR(10), B$1, "": "", B${AddressCellRow}, CHAR(10), C$1, "": "", C${AddressCellRow}, CHAR(10), F$1, "": "", Round(F${AddressCellRow}, 0), CHAR(10), H$1, "": "", H${AddressCellRow}, CHAR(10), I$1, "": "", I${AddressCellRow}, CHAR(10), J$1, "": "", J${AddressCellRow}, CHAR(10), K$1, "": "", K${AddressCellRow}, CHAR(10), L$1, "": "", L${AddressCellRow}, CHAR(10), M$1, "": "", M${AddressCellRow}, CHAR(10), N$1, "": "", N${AddressCellRow}, CHAR(10), O$1, "": "", O${AddressCellRow})' }
            }
        },

        //https://www.dfwrealestate.com/search?sortOption=created%20desc&mapChanged=0&defaultPhoto=Default&_keywordsAll=cnty_collin%2Ccnty_denton&class=Residential&ListPriceMin=450%2C000&ListPriceMax=650%2C000&BedsTotalMin=3&LivingAreaMin=3100&LotSizeAreaMin=.26&ListDateRelDategte=0&MLSStatusIn=Active
        "www.dfwrealestate.com": {
            "Paths": {
                //addresses
                Address: { Path: "p.Listingcard__address" },
                Status: { Value: "New" },
                Price: { Closest: "div.Listingcard__detail", Find: "h3.Listingcard__price" },
                Link: { Closest: "div.Listingcard__detail", Find: "a", Attr: "href" },

                //address
                Year: { Path: 'strong.title:contains("Year Built")', Siblings: 'span.value' },
                Bedrooms: { Path: 'span[id="bedsTotal"]' },
                Bathrooms: { Path: 'strong.title:contains("Baths"):contains("Total")', Siblings: 'span.value' },
                SqFeet: { Path: 'strong.title:contains("Living Area")', Siblings: 'span.value' },
                Lot: { Path: 'strong.title:contains("Acreage")', Siblings: 'span.value' }
            },
            "ExcludePrevious": true
        },


        //https://www.redfin.com/city/30868/TX/Plano/filter/property-type=house,max-price=650k,min-beds=3,min-baths=2,min-year-built=1990,min-lot-size=0.25-acre,include=forsale+mlsfsbo+construction+fsbo+foreclosed,viewport=33.47482:32.6288:-95.97419:-97.62625
        "www.redfin.com": {
            "ExcludePrevious": true,
            "Paths": {
                //addresses
                Address: { Path: "div.link-and-anchor" },
                Status: { Value: "New" },
                Price: { Closest: "div.bottomV2", Find: "span.homecardV2Price" },
                Link: { Closest: "a", Attr: "href" },

                ListingType: {},

                //address
                Year: { Path: 'span.header:contains("Year Built")', Siblings: 'span.content' },
                Bedrooms: { Path: 'div.beds-section > div.statsValue' },
                Bathrooms: { Path: 'div.baths-section > div.statsValue' },
                SqFeet: { Path: 'div.sqft-section > span.statsValue' },
                Lot: { Path: 'span.header:contains("Lot Size")', Siblings: 'span.content' },

                MiddleSchool: { Path: 'span.entryItemContent:contains("Middle School")', Find: 'span' },
                HighSchool: { Path: 'span.entryItemContent:contains("High School")', Find: 'span' },
                ISDSchool: { Path: 'span.entryItemContent:contains("School District Name")', Find: 'span' }
            }
        },

        //https://www.trulia.com/for_sale/32.8198,33.30782,-96.91955,-96.54632_xy/3p_beds/2p_baths/0-650000_price/2500p_sqft/price;a_sort/0.25p_ls/2000p_built/accepting_offers,coming_soon,foreclosure,fsbo,new_homes,resale_lt/
        "www.trulia.com": {
            "ExcludePrevious": true,
            "Paths": {
                //addresses
                Address: { Path: "a[data-testid='property-card-link']" },
                Status: { Value: "New" },
                Price: { Closest: "div[data-testid='home-card-sale']", Find: "div[data-testid='property-price']" },
                Link: { Attr: "href" },

                ListingType: {},

                //address
                Year: { Path: 'div[data-testid="features-container"]', Find: 'div:contains("Year Built"):not(:has(:contains("Year Built")))', Siblings: 'div' },
                Bedrooms: { Path: 'li[data-testid="bed"]', Find: 'div:contains(" Beds")' },
                Bathrooms: { Path: 'li[data-testid="bath"]', Find: 'div:contains(" Baths")' },
                SqFeet: { Path: 'li[data-testid="floor"]', Find: 'div:contains(" sqft")' },
                Lot: { Path: 'span:contains("Lot Area: ")' }
            }
        },

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
                ListingType: {},

                //address
                Year: { Path: 'span.header:contains("Year Built")', Siblings: 'span.content' },
                Bedrooms: { Path: 'small:contains("Bed")', Siblings: 'h4.no-margin' },
                Bathrooms: { Path: 'small:contains("Bath")', Siblings: 'h4.no-margin' },
                SqFeet: { Path: 'small:contains("SqFt")', Siblings: 'h4.no-margin' },
                Lot: { Path: 'span.header:contains("Lot/Acreage")', Siblings: 'span.content' },

                MiddleSchool: { Path: 'span.header:contains("Middle School")', Siblings: 'span.content' },
                HighSchool: { Path: 'span.header:contains("High School")', Siblings: 'span.content' },
                ISDSchool: { Path: 'span.header:contains("School District")', Siblings: 'span.content' }
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
                Link: { Closest: "div.property-container", Find: "a", Attr: "href", ValueBefore: '=hyperlink(""', ValueAfter: '"")' },
                ListingType: { Closest: "div.property-container", Find: "div.callout-container", NotExpected: "Under Contract" },

                //address
                Year: { Path: 'dt.label:contains("Year Built")', Siblings: 'dd.detail' },
                Bedrooms: { Path: 'span[data-qa="beds"]' },
                Bathrooms: { Path: 'span[data-qa="baths"]' },
                SqFeet: { Path: 'span[data-qa="sqft"]' },
                Lot: { Path: 'dt.label:contains("Lot Size Area:")', Siblings: 'dd.detail' },

                MiddleSchool: { Path: 'dt.label:contains("Middle School")', Next: 'dd.detail' },
                HighSchool: { Path: 'dt.label:contains("High School")', Next: 'dd.detail' },
                ISDSchool: { Path: 'dt.label:contains("Unified School District")', Next: 'dd.detail' }
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
        let headerMessage = $('body').prepend(`<h3 style="color:${color};">${text}</h3>`);

        if (headerMessage && headerMessage.scrollIntoView)
            headerMessage.scrollIntoView();
    },

    getAbsolutePath: function(base, relative, useHostOnly = true) {
        const separator = "/";

        var stack = base.split(separator),
            parts = relative.split(separator);
        if (useHostOnly)
            stack = stack.slice(0, 3);
        else
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

    getPropExtract: function(siteSetting, prop) {
        let jPaths = siteSetting.Paths;

        let extract;
        if (jPaths[prop])
            extract = jPaths[prop];
        else
            extract = SiteExtractor.siteSettings.Global.Paths[prop];

        return extract;
    },

    getAddressCellRow: function() {
        return SiteExtractor.currentRowIndex.toString();
    },

    getAddressCellCoordinates: function() {
        return "A" + SiteExtractor.getAddressCellRow();
    },

    jPathDrill: function(siteSetting, addresses, element, elem, prop) {
        let extract = SiteExtractor.getPropExtract(siteSetting, prop),
            value;
        let relativeElem = elem;

        if (extract.Value) {
            value = extract.Value;

            if (value) {
                if (element && element[SiteExtractor.mainProp])
                    value = value.replace('${' + SiteExtractor.mainProp + '}', element[SiteExtractor.mainProp]);

                value = value.replace('${AddressCellCoordinates}', SiteExtractor.getAddressCellCoordinates());

                value = value.replace(new RegExp('\\$\\{AddressCellRow\\}', 'g'), SiteExtractor.getAddressCellRow());
            }
        }

        if (extract.Attr)
            value = elem.attr(extract.Attr);

        if (!value) {
            if (extract.Path && prop != SiteExtractor.mainProp)
                relativeElem = $(extract.Path);

            //The .closest selector traverses up the DOM to find the parent that matches the conditions.
            if (extract.Closest)
                relativeElem = relativeElem.closest(extract.Closest);

            //The .find selector traverses down the DOM where the event occurred, that matches the conditions.
            if (extract.Find) {
                relativeElem = relativeElem.find(extract.Find);

                if (Array.isArray(relativeElem))
                    relativeElem = relativeElem[0];
            }
            if (extract.Siblings)
                relativeElem = relativeElem.siblings(extract.Siblings);
            if (extract.Next)
                relativeElem = relativeElem.next(extract.Next);

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
            value = propFunction(siteSetting, addresses, value, relativeElem);

        if (value) {
            if (extract.ValueBefore)
                value = extract.ValueBefore + value;

            if (extract.ValueAfter)
                value = value + extract.ValueAfter;
        }

        return value;
    },

    onJPathLink: function(siteSetting, addresses, value, jElement) {
        if (value)
            value = SiteExtractor.getAbsolutePath(window.location.href, value);

        return value;
    },

    onJPathPrice: function(siteSetting, addresses, value, jElement) {
        return value.trim();
    },

    onJPathYear: function(siteSetting, addresses, value, jElement) {
        return SiteExtractor.toNumber(value);
    },

    onJPathBedrooms: function(siteSetting, addresses, value, jElement) {
        return SiteExtractor.toNumber(SiteExtractor.splitValue(value, 1));
    },

    onJPathBathrooms: function(siteSetting, addresses, value, jElement) {
        return SiteExtractor.toNumber(SiteExtractor.splitValue(value, 1));
    },

    onJPathSqFeet: function(siteSetting, addresses, value, jElement) {
        return SiteExtractor.toNumber(value);
    },

    onJPathLot: function(siteSetting, addresses, value, jElement) {
        let lot = SiteExtractor.toNumber(SiteExtractor.splitValue(value, 1));

        if (lot > 10)
            lot /= 43560;

        return lot;
    },

    toNumber: function(value) {
        if (value)
            value = parseFloat(value.replace(/,/g, ''));

        return value;
    },

    splitValue: function(value, index = 0) {
        for (let i = 0; i < SiteExtractor.valueSeparators.length; i++) {
            const valueSeparator = SiteExtractor.valueSeparators[i];

            if (Array.isArray(value) && value.length == 1)
                value = value[0];

            value = value.split(valueSeparator);



            if (value.length > 1)
                break;
        }

        if (value.length <= index)
            index = 0;

        value = value[index].trim();

        return value;
    },

    checkListingType: function(siteSetting, addresses, jElement) {
        let goodListingType = true;
        let prop = "ListingType";


        let value = SiteExtractor.jPathDrill(siteSetting, addresses, null, jElement, prop);

        if (value) {
            let extract = SiteExtractor.getPropExtract(siteSetting, prop);

            if (extract.Expected)
                goodListingType = (value == extract.Expected);

            if (extract.NotExpected)
                goodListingType = (value.indexOf(extract.NotExpected) < 0);
        }

        return goodListingType;
    },

    onJPathAddress: function(siteSetting, addresses, value, jElement) {
        let excludePrevious = siteSetting.ExcludePrevious;

        value = SiteExtractor.splitValue(value, 0);

        value = value.replace(/ Bed$/i, "");
        value = value.replace(/\n/gi, " ");
        value = value.replace(/\s{2,}/gi, " ");

        //Strip extras "4428 Elmhurst DrivePlano, TX 75093-3257 4 bd 3 ba 3,067 sqft MLS #14597644"
        value = value.replace(/(TX [0-9\-]{5,10}).*/i, "$1");

        //Fix missing space before city: "790 Manchester AvenueProsper, TX 75078-1447"
        value = value.replace(/([A-Z]{1}[a-z]+)([A-Z]{1}[A-Za-z]+)(, TX)/, "$1, $2$3");

        value = value.trim();

        if (!SiteExtractor.checkListingType(siteSetting, addresses, jElement)) {
            if (SiteExtractor.beVerbose)
                console.log("Address Check Failure - Wrong Listing Type: " + value);

            value = null;
        } else if (value.match(/^ *$/) != null) {
            if (SiteExtractor.beVerbose)
                console.log("Address Check Failure - Empty: " + value);

            value = null;
        } else if (value.match(/.*, TX.*/) == null) {
            if (SiteExtractor.beVerbose)
                console.log("Address Check Failure - Not in TX: " + value);

            value = null;
        } else if (addresses.map(e => e.Address).includes(value)) {
            if (SiteExtractor.beVerbose)
                console.log("Address Check Failure - Address already in the list:" + value);

            value = null;

        } else if (excludePrevious && previousAddresses.find(a => a.indexOf(value.split(' ').slice(0, 2).join(' ')) >= 0)) {
            //Address "12685 Burnt Prairie Lane, Frisco, TX 75035-5168" vs "12685 Burnt Prairie Ln Frisco, TX 750354"
            if (SiteExtractor.beVerbose)
                console.log("Address Check Failure - Address already in the previous list:" + value);

            value = null;
        }

        return value;
    },

    getAddress: function() {
        let addressProps = ["Year", "Bedrooms", "Bathrooms", "SqFeet", "Lot", "MiddleSchool", "HighSchool", "ISDSchool", "Summary"];

        return this.getElements(addressProps, true);
    },

    getAddresses: function() {
        SiteExtractor.resetCurrentRowIndex();

        let addressProps = ["Address", "Status", "Price", "Link", "Image", "MapDuration", "MapLink"];

        return this.getElements(addressProps);
    },

    resetCurrentRowIndex: function() {
        SiteExtractor.currentRowIndex = SiteExtractor.startRowIndex;
    },

    getElementDetails(siteSetting, elementProps, elements, jElement) {
        let element = {};

        for (let i = 0; i < elementProps.length; i++) {
            const prop = elementProps[i];

            element[prop] = SiteExtractor.jPathDrill(siteSetting, elements, element, jElement, prop);

            if (i == 0 && !element[prop]) {
                element = null;
                break;
            }
        }

        return element;
    },

    getElements: function(elementProps, noPrefix = false) {
        let siteSetting = this.siteSettings[window.location.hostname];
        let jPaths = this.siteSettings[window.location.hostname].Paths;

        jQuery(function($) {
            var elements = [];

            //addresses
            if (elementProps.includes('Address')) {
                $(jPaths.Address.Path).each(function() {
                    let element = SiteExtractor.getElementDetails(siteSetting, elementProps, elements, $(this));

                    if (element) {
                        elements.push(element);

                        SiteExtractor.currentRowIndex++;
                    }
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
                let elementsText;

                if (noPrefix)
                    elementsText = csvContents;
                else
                    elementsText =
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