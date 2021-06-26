var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
jq.onload = function() {
    getAddresses();
}

document.getElementsByTagName('head')[0].appendChild(jq);

function getAddresses() {
    jQuery(function($) {
        var addresses = [];

        $('td[dir="auto"]').each(function() {
            let address = $(this).text();

            if (address.indexOf(", TX") >= 0)
                addresses.push(address);
        });

        let contents =
            addresses.join('\n');

        console.log(contents);
    });
}