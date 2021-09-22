const SiteExtractor = {
    extractIndex: 0,
    stopExtractLoop: false,

    siteSettings: {
        "Global": {
            "Paths": {}
        }
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

    jPathDrill: function(index, extract) {
        let value;
        let relativeElem;

        if (extract.Path)
            relativeElem = $(extract.Path);

        if (relativeElem.length)
            relativeElem = relativeElem.first();

        if (extract.Value) {
            value = extract.Value;
        }

        if (extract.Attr)
            value = relativeElem.attr(extract.Attr);

        if (!value) {
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

        let propFunction = SiteExtractor[`onJPath${index}`];
        if (propFunction)
            value = propFunction(extract, relativeElem);

        if (value) {
            if (extract.ValueBefore)
                value = extract.ValueBefore + value;

            if (extract.ValueAfter)
                value = value + extract.ValueAfter;
        }

        if (extract.Action)
            if (extract.ActionParam)
                value = relativeElem[extract.Action](extract.ActionParam);
            else {
                if (extract.Action == 'click') {
                    SiteExtractor.stopExtractLoop = true;

                    setTimeout(SiteExtractor.getElementDetails.bind(SiteExtractor), 1000);
                }

                value = relativeElem[extract.Action]();
            }

        return value;
    },

    extract: function() {
        SiteExtractor.resetExtractIndex();

        return this.getElements();
    },

    resetExtractIndex: function() {
        SiteExtractor.extractIndex = 0;
    },

    getElementDetails() {
        let jPaths = this.siteSettings[window.location.hostname].Paths;
        let element = [];

        SiteExtractor.stopExtractLoop = false;

        for (let i = SiteExtractor.extractIndex; !SiteExtractor.stopExtractLoop && i < jPaths.length; i++) {
            let extract = jPaths[i];

            element.push(SiteExtractor.jPathDrill(i, extract));

            SiteExtractor.extractIndex = i + 1;
        }

        return element;
    },

    getElements: function(elementProps, noPrefix = false) {
        jQuery(function($) {
            var elements = [];

            let element = SiteExtractor.getElementDetails();

            elements.push(element);

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
"${elements.join('", "')}",

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