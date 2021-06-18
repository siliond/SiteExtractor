var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
jq.onload = function() {
    getAddresses();
}

document.getElementsByTagName('head')[0].appendChild(jq);

function getAddresses() {
    const jPaths = {
        "www.realtor.com": "div.srp-page-address",
        "cannonteamhomes.com": "div.listing-detail",
        "portal.onehome.com": "div.address-content"
    };

    const previousAddresses = [
        //portal.onehome.com_2021-06-18
        "790 Manchester Avenue, Prosper, TX 75078-1447", "612 Mary Ruth Place, Celina, TX 75009-1779",

        //Realtor.com 20210615
        "348 Parkside Ct, Murphy, TX 75094", "2516 Little Creek Dr, Richardson, TX 75080", "7440 Daffodil Way, Frisco, TX 75033", "6619 Flanary Ln, Dallas, TX 75252", "8500 Arbor Creek Ln, McKinney, TX 75072", "9517 Edgeway Cir, Rowlett, TX 75089", "648 Burning Oak Dr, Frisco, TX 75036", "1516 Brimwood Dr, McKinney, TX 75072", "9602 Fairway Vista Dr, Rowlett, TX 75089", "2600 Cedarbrook Ln, Prosper, TX 75078", "1702 Splinter Dr, Wylie, TX 75098", "1120 Circle J Trl, Prosper, TX 75078", "804 Overton Ave, Celina, TX 75009", "4625 Oak Shores Dr, Plano, TX 75024", "7207 Hunters Ridge Dr, Dallas, TX 75248", "917 Cross Plains Dr, Allen, TX 75013", "1601 Bryce Canyon Ln, Allen, TX 75002", "13720 Posada Dr, Frisco, TX 75035", "3300 Canoncita Ln, Plano, TX 75023", "9715 Edgeway Cir, Rowlett, TX 75089", "7712 Turnberry Ln, Dallas, TX 75248", "3213 Greenleaf Ct, Garland, TX 75044", "6811 Bradford Estates Dr, Sachse, TX 75048", "2107 Springcress Dr, McKinney, TX 75072", "11401 Beckton St, McKinney, TX 75071", "4527 Parkridge Cir, Sachse, TX 75048", "720 Sterling Dr, Murphy, TX 75094", "328 Banbury Dr, Murphy, TX 75094", "2823 N Surrey Dr, Carrollton, TX 75006", "702 Lone Star Ct, Wylie, TX 75098", "6217 Dewitt St, Sachse, TX 75048", "511 Sun Meadow Dr, Wylie, TX 75098",
        //portal.onehome.com_20210617
        "4428 Elmhurst Drive, Plano, TX 75093-3257", "916 Parkwood Court, McKinney, TX 75072-5391", "4305 Oak Knoll Drive, Plano, TX 75093-3250", "1921 Antwerp Avenue, Plano, TX 75025-3320", "8512 Beech Lane, McKinney, TX 75072-6722", "201 Green Valley Drive, McKinney, TX 75071-5849", "3912 Maverick Trail, McKinney, TX 75072-4101", "8424 Brooksby Drive, Plano, TX 75024-3758"
    ];

    let jPath = jPaths[window.location.hostname];

    jQuery(function($) {
        var addresses = [];

        $(jPath).each(function() {
            let address = $(this).text().split(" • ")[0];
            address = address.replace(/ Bed$/i, "");
            address = address.replace(/\s{2,}/i, " ");

            //Strip extras "4428 Elmhurst DrivePlano, TX 75093-3257 4 bd 3 ba 3,067 sqft MLS #14597644"
            address = address.replace(/(TX [0-9\-]{5,10}).*/i, "$1");

            //Fix missing space before city: "790 Manchester AvenueProsper, TX 75078-1447"
            address = address.replace(/([A-Z]{1}[a-z]+)([A-Z]{1}[A-Za-z]+)(, TX)/, "$1, $2$3");

            address = address.trim();

            if (address.match(/^ *$/) == null)
                addresses.push(address);
        });
        let newAddresses = addresses.map(i => previousAddresses.includes(i) ? 0 : i);

        const currentDate = new Date();
        console.log(window.location.hostname + "_" + currentDate.toISOString().split('T')[0])

        console.log(newAddresses);
        let csvContents =
            '"Addresses"\n"' +
            newAddresses.join('"\n"') +
            '"';

        console.log(csvContents);
    });

    //TODO save as csv file
    //then load in Google My Maps via instructions https://support.google.com/mymaps/answer/3024836?co=GENIE.Platform%3DDesktop&hl=en#zippy=%2Cstep-prepare-your-info%2Cstep-import-info-into-the-map
}