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
            "Paths": { address: "div.listing-detail", price: "h2", link: { closest: "a", attr: "href" }, price: { find: "h2" } },
            "ExcludePrevious": true
        },

        //https://portal.onehome.com/en-US/properties/list?token=eyJPU04iOiJOVFJFSVMiLCJjb250YWN0aWQiOiI0MzQ1MTU0IiwiZW1haWwiOiJzaWxpb25kQGdtYWlsLmNvbSIsImFnZW50aWQiOiIzMTYxOSJ9&searchId=58b9455d-96ba-4ccc-97de-4624ae8af101
        "portal.onehome.com": { "Path": "div.address-content", "ExcludePrevious": true },

        "www.google.com": { "Path": "td[dir='auto']", "ExcludePrevious": false }
    },

    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(function() {
            this.pageLog('Async: Copying to clipboard was successful!', 'green');
        }, function(err) {
            this.pageLog('Async: Could not copy text: ' + err);
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

    jPathDrill: function(elem, extract) {
        let value;

        if (extract.attr)
            value = elem.attr(extract.attr);

        if (!value) {
            let relativeElem;

            if (extract.closest)
                relativeElem = $(this).closest(extract.closest);
            if (extract.find)
                relativeElem = $(this).find(extract.find).attr(extract.attr);

            if (relativeElem) {
                if (extract.attr)
                    value = relativeElem.attr(extract.attr);
                else
                    value = relativeElem.text();
            }
        }

        return value;
    },

    getAddresses: function() {
        let jPaths = this.siteSettings[window.location.hostname].Paths;
        let excludePrevious = this.siteSettings[window.location.hostname].ExcludePrevious;

        let siteExtractor = this;

        jQuery(function($) {
            var addresses = [];

            $(jPaths.address).each(function() {
                let address = $(this).text().split(" • ")[0];

                address = address.replace(/ Bed$/i, "");
                address = address.replace(/\s{2,}/i, " ");

                //Strip extras "4428 Elmhurst DrivePlano, TX 75093-3257 4 bd 3 ba 3,067 sqft MLS #14597644"
                address = address.replace(/(TX [0-9\-]{5,10}).*/i, "$1");

                //Fix missing space before city: "790 Manchester AvenueProsper, TX 75078-1447"
                address = address.replace(/([A-Z]{1}[a-z]+)([A-Z]{1}[A-Za-z]+)(, TX)/, "$1, $2$3");

                address = address.trim();

                if (address.match(/^ *$/) == null &&
                    address.match(/.*, TX.*/) != null &&
                    !addresses.map(e => e[0]).includes(address) &&
                    //Address "12685 Burnt Prairie Lane, Frisco, TX 75035-5168" vs "12685 Burnt Prairie Ln Frisco, TX 750354"
                    (!excludePrevious || !previousAddresses.find(a => a.indexOf(address.split(' ').slice(0, 2).join(' ')) >= 0))) {
                    let status = "New",
                        price = siteExtractor.jPathDrill($(this), jPaths.price);

                    let link = siteExtractor.jPathDrill($(this), jPaths.link);

                    if (link)
                        link = siteExtractor.getAbsolutePath(window.location.href, link);

                    addresses.push([address, status, price, link]);
                }
            });

            if (addresses.length > 0) {
                const currentDate = new Date();

                let csvContents = '"Address","Status","Price","Link"\n"' +
                    addresses.map(e => e.join('"\t"')).join('"\n"') +
                    '"';

                let addressesText =
                    `//${window.location.hostname + "_" + currentDate.toISOString().split('T')[0]}
"${addresses.map(e => e[0]).join('", "')}",

${csvContents}`;

                siteExtractor.copyToClipboard(addressesText);
            } else {
                siteExtractor.pageLog("No New addressed found.");
            }
        });

        //TODO save as csv file
        //then load in Google My Maps via instructions https://support.google.com/mymaps/answer/3024836?co=GENIE.Platform%3DDesktop&hl=en#zippy=%2Cstep-prepare-your-info%2Cstep-import-info-into-the-map
    }
};