var texts = [];

$("div.cd-timeline-content").each(function() {
    let text = $(this).text();
    text = text.replace(/\s{2,}/gi, " ");

    texts.push(text);
});

let output =
    texts.join('\n');

console.log(output);