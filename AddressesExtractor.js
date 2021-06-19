var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
jq.onload = function() {
    getAddresses();
}

document.getElementsByTagName('head')[0].appendChild(jq);

function getAddresses() {
    const siteSettings = {
        "www.realtor.com": { "Path": "div.srp-page-address", "ExcludePrevious": true },

        //https://cannonteamhomes.com/search?view=gallery_view#?q_limit=36&mlsId=17&price=350000:650000&bedrooms=3:&sqFeet=2500:&acreage=0.25:&year=1990:&propertyType=Residential&status=1&polygon=(33.22,-96.504),(33.285,-96.943),(33.273,-97.001),(33.211,-97.042),(33.22,-97.182),(33.158,-97.196),(32.986,-97.067),(32.914,-96.866),(32.905,-96.726),(33.045,-96.482),(33.14,-96.484),(33.234,-96.526)&q_sort=createdAt-&q_offset=0
        "cannonteamhomes.com": { "Path": "div.listing-detail", "ExcludePrevious": true },

        //https://portal.onehome.com/en-US/properties/list?token=eyJPU04iOiJOVFJFSVMiLCJjb250YWN0aWQiOiI0MzQ1MTU0IiwiZW1haWwiOiJzaWxpb25kQGdtYWlsLmNvbSIsImFnZW50aWQiOiIzMTYxOSJ9&searchId=58b9455d-96ba-4ccc-97de-4624ae8af101
        "portal.onehome.com": { "Path": "div.address-content", "ExcludePrevious": true },

        "www.google.com": { "Path": "td[dir='auto']", "ExcludePrevious": false }
    };

    const previousAddresses = [
        //cannonteamhomes.com_2021-06-19
        "4325 Auburn Dr Flower Mound, TX 750284", "7209 Red Cedar Ct Denton, TX 762084", "1108 Shell Beach Dr Little Elm, TX 750684", "1734 Boxwood Ln Wylie, TX 750984", "2105 Friar Ct Flower Mound, TX 750284", "2213 Lakeway Terrace Flower Mound, TX 750285", "1201 Cherry Brook Way Flower Mound, TX 750284", "3121 Ashwood Ct Richardson, TX 750824", "3401 Olivia Dr Wylie, TX 750984", "842 Sherry Ln S Krugerville, TX 762274",

        // portal.onehome.com_2021-06-19
        "1210 Caliche Trail, Allen, TX 75013-5894", "2201 All Saints Lane, Plano, TX 75025-5535", "3404 Edwards Drive, Plano, TX 75025-4544", "1210 Caliche Trail, Allen, TX 75013-5894", "2201 All Saints Lane, Plano, TX 75025-5535", "3404 Edwards Drive, Plano, TX 75025-4544", "1210 Caliche Trail, Allen, TX 75013-5894", "2900 Mountain Creek Drive, McKinney, TX 75072-7185", "1818 Commander Court, Allen, TX 75002-5807", "13561 Crestmoor DriveFarmers Branch, TX 75234-5122", "9804 Sota Grande Drive, Plano, TX 75025-6500", "303 Prince Albert Court, Richardson, TX 75081-5059", "3925 Kite Meadow Drive, Plano, TX 75074-7757", "1113 Holy Grail Drive, Lewisville, TX 75056-5745", "7617 Rolling Acres Drive, Dallas, TX 75248-5612", "1107 Winnsboro Court, Allen, TX 75013-6306", "1816 Sundown Lane, Allen, TX 75002-1554", "2103 Fairway Vista Drive, McKinney, TX 75072-4056", "3611 Amber Hills Drive, Dallas, TX 75287-6270", "7706 Ridgebluff Lane, Sachse, TX 75048-6556", "1203 Whitestone Drive, Murphy, TX 75094-4116", "1102 Babbling Brook Drive, Lewisville, TX 75067-5502", "3105 Springbranch Drive, Richardson, TX 75082-2462", "4408 Shadowridge DriveThe Colony, TX 75056-4104", "804 Overton Avenue, Celina, TX 75009-6438", "2500 Stone Creek Drive, Plano, TX 75075-3002", "12685 Burnt Prairie Lane, Frisco, TX 75035-5168", "5213 Sawgrass Drive, Garland, TX 75044-5040", "3213 Greenleaf Court, Garland, TX 75044", "13720 Posada Drive, Frisco, TX 75035-5214", "7007 Longmeadow Drive, Sachse, TX 75048-2112", "1311 Chaleur Bay Drive, Lewisville, TX 75056-4184", "4324 Peggy Lane, Plano, TX 75074-3566", "9934 Amberwoods Lane, Frisco, TX 75035-0297", "917 Cross Plains Drive, Allen, TX 75013-5475", "708 Wentworth Drive, McKinney, TX 75072-4919", "8500 Arbor Creek Lane, McKinney, TX 75072-6765", "8000 Canterbury Terrace, McKinney, TX 75072-6939", "4625 Oak Shores Drive, Plano, TX 75024-6826", "7440 Daffodil Way, Frisco, TX 75033-3829", "1601 Bryce Canyon Lane, Allen, TX 75002-2696", "1516 Brimwood Drive, McKinney, TX 75072-7121", "716 Westbrook Drive, Plano, TX 75075-8729", "8500 Spectrum Drive, McKinney, TX 75072-5863", "4573 Saint James Drive, Plano, TX 75024-4727", "2717 Regal Road, Plano, TX 75075", "808 Parkwood Court, McKinney, TX 75072-5389", "701 Willowview Drive, Prosper, TX 75078-8356", "5119 Yarbrough Street, Sachse, TX 75048-4755", "10038 Western Hills Drive, Frisco, TX 75033-8399", "8400 Clearview Court, Plano, TX 75025-4776", "245 Herod Street, Lewisville, TX 75057-3879", "2400 Cayenne Drive, McKinney, TX 75070-4729", "2104 Vintage Court, McKinney, TX 75072-4063", "2600 Cedarbrook Lane, Prosper, TX 75078-8993", "648 Burning Oak Drive, Frisco, TX 75036-8839", "433 Beacon Hill Drive, Coppell, TX 75019-3717", "328 Banbury Drive, Murphy, TX 75094-4296", "12114 Jackson Creek Drive, Dallas, TX 75243-5001", "2107 Springcress Drive, McKinney, TX 75072-5284", "7227 Sugar Maple Drive, Irving, TX 75063-5519", "2221 Lewis Canyon Drive, Prosper, TX 75078-0315", "10018 Hickory Crossing, Dallas, TX 75243-4616", "18711 Rembrandt Terrace, Dallas, TX 75287-3411", "3300 Canoncita Lane, Plano, TX 75023-8106", "2516 Little Creek Drive, Richardson, TX 75080-1815", "6619 Flanary Lane, Dallas, TX 75252-2529", "3654 Heritage Park Drive, Sachse, TX 75048-4739", "1308 Joshua Place, Allen, TX 75002-3685",

        //portal.onehome.com_2021-06-18
        "790 Manchester Avenue, Prosper, TX 75078-1447", "612 Mary Ruth Place, Celina, TX 75009-1779",

        //Realtor.com 20210615
        "348 Parkside Ct, Murphy, TX 75094", "2516 Little Creek Dr, Richardson, TX 75080", "7440 Daffodil Way, Frisco, TX 75033", "6619 Flanary Ln, Dallas, TX 75252", "8500 Arbor Creek Ln, McKinney, TX 75072", "9517 Edgeway Cir, Rowlett, TX 75089", "648 Burning Oak Dr, Frisco, TX 75036", "1516 Brimwood Dr, McKinney, TX 75072", "9602 Fairway Vista Dr, Rowlett, TX 75089", "2600 Cedarbrook Ln, Prosper, TX 75078", "1702 Splinter Dr, Wylie, TX 75098", "1120 Circle J Trl, Prosper, TX 75078", "804 Overton Ave, Celina, TX 75009", "4625 Oak Shores Dr, Plano, TX 75024", "7207 Hunters Ridge Dr, Dallas, TX 75248", "917 Cross Plains Dr, Allen, TX 75013", "1601 Bryce Canyon Ln, Allen, TX 75002", "13720 Posada Dr, Frisco, TX 75035", "3300 Canoncita Ln, Plano, TX 75023", "9715 Edgeway Cir, Rowlett, TX 75089", "7712 Turnberry Ln, Dallas, TX 75248", "3213 Greenleaf Ct, Garland, TX 75044", "6811 Bradford Estates Dr, Sachse, TX 75048", "2107 Springcress Dr, McKinney, TX 75072", "11401 Beckton St, McKinney, TX 75071", "4527 Parkridge Cir, Sachse, TX 75048", "720 Sterling Dr, Murphy, TX 75094", "328 Banbury Dr, Murphy, TX 75094", "2823 N Surrey Dr, Carrollton, TX 75006", "702 Lone Star Ct, Wylie, TX 75098", "6217 Dewitt St, Sachse, TX 75048", "511 Sun Meadow Dr, Wylie, TX 75098",
        //portal.onehome.com_20210617
        "4428 Elmhurst Drive, Plano, TX 75093-3257", "916 Parkwood Court, McKinney, TX 75072-5391", "4305 Oak Knoll Drive, Plano, TX 75093-3250", "1921 Antwerp Avenue, Plano, TX 75025-3320", "8512 Beech Lane, McKinney, TX 75072-6722", "201 Green Valley Drive, McKinney, TX 75071-5849", "3912 Maverick Trail, McKinney, TX 75072-4101", "8424 Brooksby Drive, Plano, TX 75024-3758"
    ];

    let jPath = siteSettings[window.location.hostname].Path;
    let excludePrevious = siteSettings[window.location.hostname].ExcludePrevious;

    jQuery(function($) {
        var addresses = [];

        $(jPath).each(function() {
            let address = $(this).text().split(" • ")[0];
            console.log(address);
            address = address.replace(/ Bed$/i, "");
            address = address.replace(/\s{2,}/i, " ");

            //Strip extras "4428 Elmhurst DrivePlano, TX 75093-3257 4 bd 3 ba 3,067 sqft MLS #14597644"
            address = address.replace(/(TX [0-9\-]{5,10}).*/i, "$1");

            //Fix missing space before city: "790 Manchester AvenueProsper, TX 75078-1447"
            address = address.replace(/([A-Z]{1}[a-z]+)([A-Z]{1}[A-Za-z]+)(, TX)/, "$1, $2$3");

            address = address.trim();

            if (address.match(/^ *$/) == null &&
                address.match(/.*, TX.*/) != null &&
                !addresses.includes(address) &&
                //Address "12685 Burnt Prairie Lane, Frisco, TX 75035-5168" vs "12685 Burnt Prairie Ln Frisco, TX 750354"
                (!excludePrevious || !previousAddresses.find(a => a.indexOf(address.split(' ').slice(0, 2).join(' ')) >= 0)))
                addresses.push(address);
        });
        const currentDate = new Date();
        console.log(window.location.hostname + "_" + currentDate.toISOString().split('T')[0])

        console.log(addresses);
        let csvContents =
            '"Addresses"\n"' +
            addresses.join('"\n"') +
            '"';

        console.log(csvContents);
    });

    //TODO save as csv file
    //then load in Google My Maps via instructions https://support.google.com/mymaps/answer/3024836?co=GENIE.Platform%3DDesktop&hl=en#zippy=%2Cstep-prepare-your-info%2Cstep-import-info-into-the-map
}